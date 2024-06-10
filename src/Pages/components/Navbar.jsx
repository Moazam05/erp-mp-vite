import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";

// MUI Components Import
import {
  Badge,
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  Menu,
  Autocomplete,
} from "@mui/material";

// Assets/Icons Import
import arabicIcon from "../../assets/ksa.webp";
import englishIcon from "../../assets/uk.webp";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import UserIcon from "@mui/icons-material/Person";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { baseUrl } from "../../constants/api";
import InActiveCartModal from "./InActiveCartModal";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectedCartTime, setCartTime } from "../../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const token = window.localStorage.getItem("mp-user-token");
  const fullname = window.localStorage.getItem("username");
  const cartTime = useTypedSelector(selectedCartTime);
  const dispatch = useDispatch();

  const { language, translate, changeLanguage, getLanguage, getDirection } =
    useTranslation();
  const { cartProducts, calculateTotalPrice } = useCart();
  const totalPrice = calculateTotalPrice();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState();
  const [suggestions, setSuggestions] = useState([]);
  // const [resultsLoaded, setResultsLoaded] = useState(false);
  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [showInactivity, setShowInactivity] = useState(false);

  useEffect(() => {
    if (cartTime !== null) {
      // Parse the saved cartTime
      const cartDate = new Date(cartTime);
      let interval;

      const startTimer = () => {
        const oneMinuteInMilliseconds =
          Number(import.meta.env.VITE_REACT_APP_INACTIVE_TIME) * 60 * 1000;

        interval = setInterval(() => {
          const currentTime = new Date();
          const timeDifference = currentTime - cartDate;

          if (timeDifference >= oneMinuteInMilliseconds) {
            setShowInactivity(true);
            setModalOpen(true);
            clearInterval(interval);
          }
        }, 1000); // Check every second
      };

      startTimer();

      return () => {
        clearInterval(interval);
      };
    }
  }, [cartTime]);

  let interval;
  const handleResetTimer = () => {
    setShowInactivity(false);
    setModalOpen(false);
    clearInterval(interval);

    // todo: Get the current time and store it in localStorage
    const now = new Date();
    localStorage.setItem("cartTime", JSON.stringify(now));
    dispatch(setCartTime(now));
  };

  const languageOptions = [
    {
      value: "en",
      label: (
        <>
          <img
            src={englishIcon}
            alt="language icon"
            style={{ width: "18px", height: "18px" }}
          />{" "}
          {translate("en")}
        </>
      ),
    },
    {
      value: "ar",
      label: (
        <>
          <img
            src={arabicIcon}
            alt="language icon"
            style={{ width: "18px", height: "18px" }}
          />{" "}
          {translate("ar")}
        </>
      ),
    },
  ];

  const navLinks = [
    {
      link: "home",
      route: "/",
    },
    {
      link: "contact",
      route: "/contact-us",
    },
    {
      link: "privacy",
      route: "/privacy-policy",
    },
    {
      link: "shipping",
      route: "/return-policy",
    },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const suggestSearch = (value) => {
    setSearchTerm(value);
    axios
      .post(`${baseUrl}/api/products/suggestions`, {
        search_term: value,
      })
      .then((response) => {
        setSuggestions(response.data);
        // setResultsLoaded(true);
      })
      .catch(() => {});
  };

  const searchProducts = (searchTerm) => {
    if (window.location.pathname.includes("/search/")) {
      // If the current page is the search results page, update the search term in the URL
      const urlParts = window.location.pathname.split("/");
      urlParts[urlParts.length - 1] = searchTerm;
      const newUrl = urlParts.join("/");
      window.history.replaceState(null, "", newUrl);
    } else {
      // If not, navigate to the search results page
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProducts(searchTerm);
    }
  };
  const [logoData, setLogoData] = useState([]);

  const fetchLogo = () => {
    axios
      .get(`${baseUrl}/api/auth/open/settings`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setLogoData(response.data.logo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLogo();
    const isSearch = window.location.pathname.includes("search");
    if (isSearch) {
      const encodedQuery = window.location.pathname.split("/")[2];
      const decodedQuery = decodeURIComponent(encodedQuery);
      setSearchTerm(decodedQuery);
    }
  }, []);

  return (
    <NavWrapper>
      <NavTopbar>
        <LogoWrapper>
          <img
            src={logoData}
            alt="Logo"
            height={70}
            width={105}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </LogoWrapper>
        <SearchWrapper
          dir={getDirection()}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            bgcolor: "white",
            borderRadius: "30px",
          }}
        >
          <Autocomplete
            id="suggestions"
            noOptionsText={"No suggestions to show"}
            options={suggestions}
            getOptionLabel={(option) => option.commons.en.productName}
            style={{ width: 400 }}
            onChange={(option) => {
              if (option) {
                setSearchTerm(option.target.innerHTML);
              }
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <SearchBar
                  {...params.inputProps}
                  sx={{ padding: "10px", flex: 1 }}
                  placeholder={translate("productlisting.here")}
                  value={searchTerm}
                  onChange={(e) => suggestSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            )}
          />
          <IconButton
            type="button"
            sx={{
              padding: "10px",
              bgcolor: "#168F48",
              "&:hover": {
                color: "#168F48",
                border: "1px solid #168F48",
              },
            }}
            aria-label="search"
            onClick={() => searchProducts(searchTerm)}
          >
            <SearchIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: "#168F48",
                },
              }}
            />
          </IconButton>
        </SearchWrapper>
        <AccountVitals dir={getDirection()}>
          {token ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => navigate("/profile")}
              >
                <UserIcon sx={{ color: "#fff", fontSize: "22px" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "0px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "300",
                      cursor: "pointer",
                    }}
                  >
                    {translate("navbar.signin")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {fullname}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            <LoginBtn onClick={() => navigate("/login")}> Login </LoginBtn>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0px",
              cursor: "pointer",
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px 10px",
            }}
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={cartProducts.length} color="error">
              <CartIcon
                sx={{ color: "#168F48", fontSize: "22px", cursor: "pointer" }}
              />
            </Badge>
            <Typography
              sx={{ color: "#168F48", fontSize: "14px", fontWeight: "600" }}
            >
              {parseFloat(totalPrice || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              SAR
            </Typography>
          </Box>
        </AccountVitals>
      </NavTopbar>
      <NavBottombar>
        <LanguageSelector>
          <FormControl variant="standard" fullWidth sx={{ minWidth: 100 }}>
            <LanguageDropdown
              disableUnderline={true}
              defaultValue={getLanguage()}
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              sx={{
                ".MuiSelect-icon": { color: "white" },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                },
              }}
            >
              {languageOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </LanguageDropdown>
          </FormControl>
        </LanguageSelector>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          {navLinks.map((link, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleMenuClose();
                navigate(link.route);
              }}
            >
              {translate(`navbar.navlinks.${link.link}`)}
            </MenuItem>
          ))}
        </Menu>
        <LinksWrapper
          dir={getDirection()}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {navLinks.map((link, index) => (
            <Button
              key={index}
              style={{ textTransform: "none", color: "#fff" }}
              onClick={() => navigate(link.route)}
            >
              {translate(`navbar.navlinks.${link.link}`)}
            </Button>
          ))}
        </LinksWrapper>
      </NavBottombar>

      {showInactivity && (
        <InActiveCartModal
          modalOpen={modalOpen}
          handleResetTimer={handleResetTimer}
        />
      )}
    </NavWrapper>
  );
}

// Styled Components

const NavWrapper = styled(Box)(() => ({
  width: "100%",
  backgroundColor: "#168F48",
}));

const NavTopbar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 50px",
  borderBottom: "1px solid #45ad70",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    flexDirection: "column",
    gap: "10px",
  },
}));

const LogoWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

const AccountVitals = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

const LoginBtn = styled(Button)({
  textTransform: "none",
  color: "#fff",
  background: "168F48",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bolder",
  fontSize: "15px",
  gap: "20px",
});

const NavBottombar = styled(Box)({
  backgroundColor: "#168F48",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 50px",
  borderBottom: "1px solid #45ad70",
});

const LanguageSelector = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

const LanguageDropdown = styled(Select)({
  width: "100%",
  height: "auto",
  outline: "none",
  color: "#fff",
});

const LinksWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1px",
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  backgroundColor: "white",
  [theme.breakpoints.down("sm")]: {
    padding: "2px 5px",
    width: "80%",
  },
}));

const SearchBar = styled(InputBase)(() => ({
  height: "40px",
  width: "230px",
  borderRadius: "20px",
  backgroundColor: "#fff",
  padding: "10px",
  flex: 1,
}));

export default Navbar;
