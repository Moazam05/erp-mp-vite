import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

// MUI Components Import
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  InputBase,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

// Loader Import
import { MoonLoader } from "react-spinners";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components Import
import NavBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

// import icons
import EditIcon from "@mui/icons-material/EditCalendarOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "../contexts/LanguageContext";
import SelectAddressModal from "./components/Modals/SelectAddressModal";
import { baseUrl } from "../constants/api";
import {
  useGetCountryQuery,
  useGetSaudiCityQuery,
} from "../redux/api/utilApiSlice";
import SelectInputSearch from "../components/SelectInputSearch";

const Checkout = () => {
  const token = window.localStorage.getItem("mp-user-token");
  const user = window.localStorage.getItem("username");

  const navigate = useNavigate();

  const { cartProducts, calculateTotalPrice, emptyCart } = useCart();
  const totalPrice = calculateTotalPrice();

  const [selectAddressModalOpen, setSelectAddressModalOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [modalFor, setModalFor] = useState(null);

  const [orderNotes, setOrderNotes] = useState("");
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();
  const [updating, setUpdating] = useState(false);
  const [gift, setGift] = useState(false);
  const [giftAddress, setGiftAddress] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [landMark, setLandMark] = useState("");

  const orderProducts = cartProducts.map((product) => ({
    quantity: product.quantity,
    product: product?.product === true ? product.id : product.productID,
    variant: product?.product === true ? null : product.id,
  }));

  const placeOrder = () => {
    if (!billingAddress) {
      toast.error("Please set an address.");
      return;
    }

    if (gift && !cityValue) {
      toast.error("Please select a city for gift address.");
      return;
    }
    if (gift && !giftAddress) {
      toast.error("Please set a gift address.");
      return;
    }

    const giftAddressData = {
      city: cityValue?.name,
      address: giftAddress,
      landmark: landMark,
    };

    setUpdating(true);
    axios
      .post(
        `${baseUrl}/api/order`,
        {
          status: 1,
          total_price: totalPrice,
          tax: 0,
          shipping: 1,
          order_products: orderProducts,
          order_address: shippingAddress.id,
          other_address: billingAddress.id,
          notes: orderNotes,
          guest_address: gift ? JSON.stringify(giftAddressData) : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        // toast.success("Order has been placed!")
        setTimeout(() => {
          setUpdating(false);
          navigate(`/payment/${response.data.order_id}`);
          emptyCart();
        }, 3000);
      })
      .catch((error) => {
        console.log("Error", error);
        toast.error("There was an error placing your order!");
        setUpdating(false);
      });
  };

  const fetchBillingAddress = () => {
    axios
      .get(`${baseUrl}/api/addresses/type/billing`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setBillingAddress(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchShippingAddress = () => {
    axios
      .get(`${baseUrl}/api/addresses/type/shipping`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setShippingAddress(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenModal = (modalFor) => {
    setSelectAddressModalOpen(true);
    const modalForKeyword = modalFor === "billing" ? "billing" : "shipping";
    setModalFor(modalForKeyword);
  };

  useEffect(() => {
    fetchBillingAddress();
    fetchShippingAddress();
  }, []);

  // todo: GET COUNTRY API CALL
  const { data: getCountryList } = useGetCountryQuery({});

  // todo: GET SAUDI API CALL
  const { data: getSaudiCity } = useGetSaudiCityQuery({});

  useEffect(() => {
    const country = getCountryList?.find((ser) => ser.id === 194);
    setCountryValue(country);
  }, [getCountryList]);

  return (
    <>
      <NavBar />
      <Wrapper dir={getDirection()}>
        <SelectAddressModal
          open={selectAddressModalOpen}
          setOpen={setSelectAddressModalOpen}
          setBillingAddress={setBillingAddress}
          setShippingAddress={setShippingAddress}
          modalFor={modalFor}
        />
        <Grid
          container
          my={3}
          sx={{ display: "flex", gap: "50px", justifyContent: "center" }}
        >
          <Grid item md={6} sx={{ height: "auto", padding: "20px" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardHeading>{translate("checkout.to")}</CardHeading>
              {/* <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#009444', borderRadius: '20px', padding: '8px 10px', cursor: 'pointer' }}>
                                <AddIcon sx={{ color: '#fff', fontSize: '16px' }} />
                                <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{translate("checkout.new")}</Typography>
                            </Box> */}
              <AddButton
                size="medium"
                color="secondary"
                variant="contained"
                onClick={() => navigate("/profile/addresses")}
              >
                <AddIcon sx={{ color: "#fff", fontSize: "16px" }} />
                {translate("checkout.new")}
              </AddButton>
            </Box>

            <DataBox>
              <DataText>{user}</DataText>
            </DataBox>
            {billingAddress ? (
              <DataBox
                sx={{
                  opacity: gift ? "0.5" : "1",
                }}
              >
                <CardHeading>Billing Address</CardHeading>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      flexDirection: "row",
                    }}
                  >
                    <Label>{billingAddress?.address_label_display}</Label>
                    <EditIcon
                      sx={{ color: "#000", size: "16px", cursor: "pointer" }}
                      onClick={() => handleOpenModal("billing")}
                    />
                  </Box>
                  <Typography>{billingAddress?.fullname}</Typography>
                  <Typography>{billingAddress?.phonenumber}</Typography>
                  <Typography>
                    {" "}
                    {billingAddress?.address}, {billingAddress?.city},{" "}
                    {billingAddress?.country}{" "}
                  </Typography>
                </Box>
              </DataBox>
            ) : null}
            {shippingAddress ? (
              <DataBox
                sx={{
                  opacity: gift ? "0.5" : "1",
                }}
              >
                <CardHeading>Shipping Address</CardHeading>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      flexDirection: "row",
                    }}
                  >
                    <Label>{shippingAddress?.address_label_display}</Label>
                    <EditIcon
                      sx={{ color: "#000", size: "16px", cursor: "pointer" }}
                      onClick={() => handleOpenModal("shipping")}
                    />
                  </Box>
                  <Typography>{shippingAddress?.fullname}</Typography>
                  <Typography>{shippingAddress?.phonenumber}</Typography>
                  <Typography>
                    {" "}
                    {shippingAddress?.address}, {shippingAddress?.city},{" "}
                    {shippingAddress?.country}{" "}
                  </Typography>
                </Box>
              </DataBox>
            ) : null}
            <Grid item my={3}>
              {/* Gift card */}
              <Box>
                <FormControlLabel
                  control={<Switch />}
                  label="Send order as a gift"
                  value={gift}
                  onChange={() => setGift(!gift)}
                  sx={{
                    margin: "0",
                  }}
                />

                {gift && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        margin: "20px 0 10px 0",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                        }}
                      >
                        <SelectInputSearch
                          name="country"
                          options={getCountryList}
                          placeholder="Select Country"
                          value={countryValue}
                          onChange={(e, value) => {
                            setCountryValue(value);
                          }}
                          borderRadius="4px"
                          height="40px"
                          disabled={true}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "50%",
                        }}
                      >
                        <SelectInputSearch
                          name="city"
                          options={getSaudiCity}
                          placeholder="Select City"
                          value={cityValue}
                          onChange={(e, value) => {
                            setCityValue(value);
                          }}
                          borderRadius="4px"
                          height="40px"
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        margin: "0px 0 10px 0",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          placeholder="Gift Address"
                          size="small"
                          color="success"
                          type="text"
                          variant="outlined"
                          fullWidth
                          value={giftAddress}
                          onChange={(e) => setGiftAddress(e.target.value)}
                          sx={{
                            margin: "10px 0",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "50%",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          placeholder="Land Mark"
                          size="small"
                          color="success"
                          type="text"
                          variant="outlined"
                          fullWidth
                          value={landMark}
                          onChange={(e) => setLandMark(e.target.value)}
                          sx={{
                            margin: "10px 0",
                          }}
                        />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>

              <CardHeading>{translate("checkout.add")}</CardHeading>
              <Typography sx={{ fontWeight: "500", fontSize: "12px" }}>
                {translate("checkout.order")}
              </Typography>
              <StyledTextarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.currentTarget.value)}
              />
            </Grid>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#178F49",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            >
              {translate("checkout.return")}
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              border: " 1px solid #DDDDDD",
              borderRadius: "10px",
              padding: "20px 4px",
              height: "fit-content",
            }}
          >
            <Typography
              sx={{
                color: "#191C1F",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "15px 10px",
              }}
            >
              {translate("checkout.summary")}
            </Typography>
            {cartProducts.length === 0 ? (
              <Typography sx={{ textAlign: "center", padding: "15px" }}>
                {translate("checkout.no")}
              </Typography>
            ) : (
              cartProducts.map((product, index) => {
                const variant = product?.variants?.find(
                  (v) => v.id === product?.id
                );
                return (
                  <Box key={index}>
                    <Box
                      style={{
                        display: "flex",
                        // alignItems: "center",
                        gap: "8px",
                        padding: "10px 10px",
                        borderBottom: "1px solid #CBCBCB",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            variant?.variantImage || product?.images[0]?.image
                          }
                          alt="pic"
                          style={{
                            width: "55px",
                            height: "55px",
                            borderRadius: "5px",
                            marginRight: "8px",
                          }}
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"5px"}
                        >
                          <Typography
                            fontWeight={"bolder"}
                            fontSize={"13px"}
                            textAlign={"justify"}
                          >
                            {language === "ar"
                              ? product?.commons?.ar?.productName
                              : product?.commons?.en?.productName}
                          </Typography>
                          <Typography fontWeight={"bold"} fontSize={"14px"}>
                            {product.quantity} *{" "}
                            <span style={{ color: "#2DA5F3" }}>
                              {" "}
                              {product.discounted_price === null
                                ? product.vat_onlinePrice
                                : product.discounted_price}{" "}
                              SAR
                            </span>{" "}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {variant?.variantCombination && (
                          <>
                            <Box>
                              <Typography
                                sx={{ fontSize: "14px", color: "#5F6C72" }}
                              >
                                Variant
                              </Typography>
                            </Box>
                            <Box>
                              <Button
                                sx={{
                                  border: "1px solid #00A9BF",
                                  textTransform: "none",
                                  padding: "2px 12px",
                                  backgroundColor: "#00A9BF",
                                  color: "#fff",
                                  margin: "5px 0 10px 0",
                                  cursor: "auto",
                                  "&:hover": {
                                    backgroundColor: "#00A9BF",
                                    color: "#fff",
                                  },
                                }}
                              >
                                {variant?.variantCombination}
                              </Button>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
            <Box display={"flex"} flexDirection={"column"} padding={"10px"}>
              <DiscountWrapper>
                <Discountbar placeholder={translate("checkout.code")} />
                <IconButton
                  type="button"
                  sx={{
                    borderRadius: "18px",
                    width: "25%",
                    border: "1px solid #178F49",
                  }}
                  aria-label="search"
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#178F49",
                      fontWeight: "600",
                    }}
                  >
                    {translate("checkout.apply")}
                  </Typography>
                </IconButton>
              </DiscountWrapper>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: "14px", color: "#5F6C72" }}>
                  {translate("checkout.sub")}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {parseFloat(totalPrice || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  SAR
                </Typography>
              </Box>
              {/* <Box mt={'8px'} display={'flex'} justifyContent={'space-between'}>
                                <Typography sx={{ fontSize: "14px", color: '#5F6C72' }}>Shipping</Typography>
                                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>free</Typography>
                            </Box> */}
              <Box mt={"8px"} display={"flex"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: "14px", color: "#5F6C72" }}>
                  {translate("checkout.dis")}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  0
                </Typography>
              </Box>
              <Box mt={"8px"} display={"flex"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: "14px", color: "#5F6C72" }}>
                  {translate("checkout.tax")}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  15%
                </Typography>
              </Box>
              <Box
                mt={"20px"}
                display={"flex"}
                justifyContent={"space-between"}
                borderTop={"1px solid #DDDDDD"}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "bold",
                    mt: "10px",
                  }}
                >
                  {translate("checkout.grand")}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "bold", mt: "10px" }}
                >
                  {parseFloat(totalPrice || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  SAR
                </Typography>
              </Box>
            </Box>
            <Box
              mt={2}
              mb={2}
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="small"
                style={{
                  textTransform: "none",
                  padding: "4px 24px",
                  width: "95%",
                  height: "40px",
                  borderRadius: "24px",
                  fontWeight: "bold",
                }}
                color="secondary"
                variant="contained"
                onClick={() => placeOrder()}
              >
                {updating ? (
                  <>
                    <MoonLoader color="#fff" size={20} />
                  </>
                ) : (
                  translate("checkout.payment")
                )}
              </Button>
            </Box>

            <Box sx={{ margin: "0px 0 0 0", padding: "4px 24px" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                {translate("checkout.deliveryNote")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
      <Footer />
    </>
  );
};

// Styled Components

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "40px ",
  [theme.breakpoints.down("sm")]: {
    margin: "10px",
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: "auto",
  height: "35px",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "40%",
  },
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px ",
}));
const StyledTextarea = styled("textarea")(() => ({
  background: "#fff",
  borderRadius: "8px",
  fontSize: "16px",
  margin: "8px 0",
  height: "100px",
  width: "100%",
  border: "1px solid #C9CFD2",
}));

const Label = styled(Box)(() => ({
  fontSize: "10px",
  fontWeight: "700",
  background: "#a3a2a2",
  color: "#000",
  padding: "8px",
  borderRadius: "5px",
}));

const DataBox = styled(Box)(() => ({
  padding: "10px 15px",
  backgroundColor: "#F9F9F9",
  width: "auto",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  margin: "15px 0",
  position: "relative",
}));

const DataText = styled(Typography)(() => ({
  fontSize: "13px",
  fontWeight: "400",
}));

const DiscountWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "30px",
}));

const Discountbar = styled(InputBase)(() => ({
  height: "40px",
  width: "70%",
  borderRadius: "20px",
  border: "1px solid #B4B4B4",
  padding: "10px",
}));

export default Checkout;
