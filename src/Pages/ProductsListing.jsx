import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// MUI Components Import
import {
  styled,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  InputBase,
  Chip,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

// Components Import
import NavBar from "./components/Navbar";
import ProductCard from "./components/Cards/ProductCard";

// Icons Import
import SearchIcon from "@mui/icons-material/Search";

// Loader Import
import { MoonLoader } from "react-spinners";
import { useTranslation } from "../contexts/LanguageContext";

import { baseUrl } from "../constants/api";

function ProductsListing() {
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();

  const { catId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  const [activeCategory, setActiveCategory] = useState(catId);
  const [searchHistory, setSearchHistory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [catSubcats, setCatSubcats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [minRange, setMinRange] = useState("0");
  const [maxRange, setMaxRange] = useState("0");

  // const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategoryID, setSubcategoryId] = useState(null);
  // const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandID, setSelectedBrandID] = useState(null);
  // const [selectedMinRange, setSelectedMinRange] = useState(null);
  // const [selectedMaxRange, setSelectedMaxRange] = useState(null);
  const [productType, setProductType] = useState("1");
  const [chip, setChip] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/categories`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const fetchCategoryProducts = () => {
    setCategoryProducts([]);
    setLoading(true);
    axios
      .get(`${baseUrl}/api/products/category/${catId}`)
      .then((response) => {
        setCategoryProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const fetchCatSubcategories = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/subcategories/${catId}`)
      .then((response) => {
        setCatSubcats(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const fetchBrands = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/brands`)
      .then((response) => {
        setBrands(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const searchProducts = (subcatId, brandId, productType) => {
    setLoading(true);
    axios
      .post(`${baseUrl}/api/products/search`, {
        search_term: searchTerm,
        price_from: minRange,
        price_to: maxRange,
        subId: subcatId,
        cat_id: catId,
        brandId: brandId,
        product_type_Id: productType,
      })
      .then((response) => {
        setCategoryProducts(response.data);
        console.log(subcatId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // const handleSubcategorySelect = (subcatId, subcatName) => {
  //   setSelectedSubcategory(subcatName);
  //   setSubcategoryId(subcatId);
  //   searchProducts(subcatId, null);
  // };

  const handleSubCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSubcategoryId(selectedValue);
  };

  // const handleBrandSelect = (brandId, brandName) => {
  //   setSelectedBrand(brandName);
  //   setSelectedBrandID(brandId);
  //   // setSubcategoryId(subcatId);
  //   searchProducts(null, brandId);
  // };
  const handleBrandChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBrandID(selectedValue);
  };

  const handleTypeSelection = (event) => {
    const selectedValue = event.target.value;
    setProductType(selectedValue);
  };

  const handleRangeChange = (event) => {
    const selectedValue = event.target.value;
    const [min, max] = selectedValue.split("-");
    setMinRange(min);
    setMaxRange(max);
  };

  const handlePriceRangeSelect = (minRange, maxRange) => {
    // setSelectedMinRange(minRange.toString());
    // setSelectedMaxRange(maxRange.toString());
    searchProducts(
      subcategoryID,
      // selectedSubcategory,
      // selectedBrand,

      selectedBrandID,
      productType,
      minRange.toString(),
      maxRange.toString()
    );
    setMinRange("0");
    setMaxRange("0");
    setChip(true);
  };

  useEffect(() => {
    fetchCategories();
    fetchCategoryProducts();
    fetchCatSubcategories();
    setActiveCategory(catId);
    fetchBrands();
  }, [catId]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const updatedSearchHistory = searchHistory.filter((term) => {
        if (term.startsWith("Price") || term.startsWith("Subcategory")) {
          return term;
        }
      });
      setSearchHistory([...updatedSearchHistory, searchTerm]);
      setSearchTerm("");
      searchProducts();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleRemove = (index) => {
    const updatedSearchHistory = [...searchHistory];
    updatedSearchHistory.splice(index, 1);
    setSearchHistory(updatedSearchHistory);
    if (updatedSearchHistory.length > 0) {
      // If there are other search history items, trigger searchProducts with remaining search history items
      searchProducts(updatedSearchHistory[updatedSearchHistory.length - 1]);
    } else {
      // If there are no other search history items, fetch category products
      fetchCategoryProducts();
    }
  };

  return (
    <>
      <NavBar />
      <CategoriesNav>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ color: "#009444", fontWeight: "bold", fontSize: "14px" }}
              >
                {translate("productlisting.cat")}
              </Typography>
              <FormControl
                size="small"
                sx={{
                  border: "1px solid #EFEFEF",
                  width: "100%",
                  mt: "5px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                }}
              >
                <Select
                  sx={{ borderRadius: "12px", border: "none" }}
                  value={activeCategory}
                  onChange={(e) => {
                    setCategoryProducts([]);
                    const selectedCategoryId = e.target.value;
                    navigate(`/category/${selectedCategoryId}`);
                    // setSelectedSubcategory(null);
                    // setSelectedBrand(null);
                    handleRemove();
                  }}
                >
                  {categories.map((cat, index) => (
                    <MenuItem key={index} value={cat.catId}>
                      {language === "ar"
                        ? cat.arb_name
                        : cat.name + " Supplies"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "5px",
              }}
            >
              {/* {searchHistory.length > 0 && (
                <Chip
                  label={searchHistory[searchHistory.length - 1]}
                  onDelete={() => handleRemove(searchHistory.length - 1)}
                  color="primary"
                  variant="outlined"
                  sx={{
                    paddingLeft: "8px",
                  }}
                />
              )} */}
              {chip && (
                <Chip
                  label={"Reset Filters"}
                  onDelete={() => {
                    setChip(false);
                    fetchCategoryProducts();
                  }}
                  color="primary"
                  variant="outlined"
                  sx={{
                    paddingLeft: "8px",
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <SearchBar
              type="text"
              placeholder="Search within this category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton
              type="button"
              sx={{
                marginRight: "5px",
                padding: "10px",
                bgcolor: "#009444",
                "&:hover": {
                  color: "#009444",
                  border: "1px solid #009444",
                },
              }}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <SearchIcon
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "#009444",
                  },
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </CategoriesNav>

      <Wrapper container my={5} dir={getDirection()}>
        <FiltersWrapper item lg={3} md={4} sm={4} xs={12}>
          <FilterBox my={3} dir={getDirection()}>
            <FilterHeading>{translate("productlisting.sub")}</FilterHeading>

            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleSubCategoryChange}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <MoonLoader color="#000" size={20} />
                  </Box>
                ) : catSubcats.length === 0 ? (
                  <Typography sx={{ color: "#878787", fontSize: "18px" }}>
                    {translate("productlisting.nosubcat")}
                  </Typography>
                ) : (
                  catSubcats.map((subcat, index) => (
                    <FormControlLabel
                      key={index}
                      value={subcat.subId}
                      control={<Radio />}
                      sx={{ width: "100%", margin: 0 }}
                      label={
                        <SubLabel>
                          <Typography
                            sx={{ color: "#878787", fontSize: "18px" }}
                          >
                            {language === "ar" ? subcat.arb_name : subcat.name}
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bolder",
                              borderRadius: "50%",
                              background: "#009444",
                              height: "30px",
                              width: "30px",
                              color: "#fff",
                            }}
                          >
                            {subcat.num_products}
                          </Typography>
                        </SubLabel>
                      }
                    />
                  ))
                )}
              </RadioGroup>
            </FormControl>
          </FilterBox>

          <FilterBox my={3} dir={getDirection()}>
            <FilterHeading>{translate("productlisting.type")}</FilterHeading>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="1"
                name="radio-buttons-group"
                onChange={handleTypeSelection}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.sell")}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.service")}
                />
              </RadioGroup>
            </FormControl>
          </FilterBox>

          <FilterBox my={3} dir={getDirection()}>
            <FilterHeading>{translate("productlisting.brand")}</FilterHeading>
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleBrandChange}
                sx={{ width: "100%" }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <MoonLoader color="#000" size={20} />
                  </Box>
                ) : brands.length === 0 ? (
                  <Typography sx={{ color: "#878787", fontSize: "18px" }}>
                    {translate("productlisting.nobrand")}
                  </Typography>
                ) : (
                  brands.map((brand, index) => (
                    <FormControlLabel
                      key={index}
                      value={brand.brandId}
                      control={<Radio />}
                      sx={{ width: "100%", margin: 0 }}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#878787",
                              fontSize: "18px",
                              flex: 1, // Ensures the name takes up available space
                            }}
                          >
                            {language === "ar" ? brand.arb_name : brand.name}
                          </Typography>
                        </Box>
                      }
                    />
                  ))
                )}
              </RadioGroup>
            </FormControl>
          </FilterBox>

          <FilterBox my={3} dir={getDirection()}>
            <FilterHeading>{translate("productlisting.range")}</FilterHeading>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleRangeChange}
              >
                <FormControlLabel
                  value="0-1000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.one")}
                />
                <FormControlLabel
                  value="1001-2000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.two")}
                />
                <FormControlLabel
                  value="2001-3000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.three")}
                />
                <FormControlLabel
                  value="3001-4000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.four")}
                />
                <FormControlLabel
                  value="4001-5000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.five")}
                />
                <FormControlLabel
                  value="5001-5000"
                  control={<Radio />}
                  sx={{ width: "100%", margin: 0 }}
                  label={translate("productlisting.six")}
                />
              </RadioGroup>
            </FormControl>
            <ApplyBtn
              onClick={() => handlePriceRangeSelect(minRange, maxRange)}
            >
              {translate("productlisting.apply")}
            </ApplyBtn>
          </FilterBox>
        </FiltersWrapper>
        <ProductsWrapper item lg={9} md={8} sm={8} xs={12}>
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader color="#000" size={40} />
            </Box>
          ) : categoryProducts.length === 0 ? (
            <Typography> {translate("productlisting.this")}</Typography>
          ) : (
            categoryProducts?.map((product, index) => (
              <ProductCard key={index} product={product} id={product.prodId} />
            ))
          )}
        </ProductsWrapper>
      </Wrapper>
    </>
  );
}

// Styled Components
const Wrapper = styled(Grid)(() => ({
  margin: "20px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "0 40px",
}));

const CategoriesNav = styled(Grid)(() => ({
  // margin: "20px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
  borderBottom: "1px solid #DEE2E7",
}));

const FiltersWrapper = styled(Grid)(() => ({
  height: "auto",
  flexGrow: 1,
  // margin: "0 50px",
}));

const SubLabel = styled(Box)(({ theme }) => ({
  width: "220px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "155px",
  },
}));

const FilterBox = styled(Box)(({ theme }) => ({
  width: "auto",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  padding: "25px 20px",
  borderRadius: "10px",
  border: "1px solid #EFEFEF",
  gap: "5px",
  [theme.breakpoints.down("xs")]: {
    justifyContent: "center",
  },
}));

const FilterHeading = styled(Typography)(() => ({
  color: "#009444",
  fontWeight: "bold",
  fontSize: "20px",
  paddingBottom: "10px",
}));

const SearchBar = styled(InputBase)(() => ({
  height: "45px",
  width: "80%",
  borderRadius: "20px",
  backgroundColor: "#fff",
  padding: "10px 20px",
  border: "1px solid #EFEFEF",
}));

const ApplyBtn = styled(Button)(() => ({
  height: "40px",
  borderRadius: "20px",
  background: "#178F49",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "12px",
  top: "10px",
  cursor: "pointer",
  "&:hover": {
    color: "#178F49",
    border: "1px solid #178F49",
  },
}));

const ProductsWrapper = styled(Grid)(() => ({
  width: "80%",
  height: "auto",
  display: "flex",
  marginTop: "20px",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  padding: "0 20px",
}));

export default ProductsListing;
