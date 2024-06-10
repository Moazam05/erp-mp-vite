import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Contexts Import
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "../contexts/LanguageContext";
// MUI Components Import
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
// Components Import
import Footer from "./components/Footer/Footer";
import LoginNotifModal from "./components/Modals/LoginNotifModal";
import AppBar from "./components/Navbar";
// Icons import
import EmptyCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartProducts,
    incrementById,
    decrementById,
    calculateTotalPrice,
    emptyCart,
    isOrderLimitExceeded,
  } = useCart();
  const totalPrice = calculateTotalPrice();
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleIncrement = (id) => {
    const product = cartProducts.find((p) => p.id === id);
    if (isOrderLimitExceeded(id)) {
      toast.warning(
        `Order limit (${parseFloat(product.orderLimit).toFixed(
          0
        )}) can not be exceeded!`
      );
      return;
    }
    incrementById(id);
  };

  const handleDecrement = (id) => {
    decrementById(id);
  };

  const isAnyProductBelowMinQty = cartProducts.some(
    (product) => product.quantity < product.minQty
  );

  const checkToken = () => {
    const token = window.localStorage.getItem("mp-user-token");

    if (token === null) {
      setLoginModalOpen(true);
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <AppBar />
      <Wrapper>
        <LoginNotifModal open={loginModalOpen} setOpen={setLoginModalOpen} />
        <Grid container my={5} gap={"40px"} dir={getDirection()}>
          <Grid item md={7.5}>
            <ProductBox>
              {cartProducts?.length === 0 ? (
                <Typography sx={{ textAlign: "center", padding: "15px" }}>
                  {translate("cart.no")}
                </Typography>
              ) : (
                <>
                  <EmptyCartBtn
                    endIcon={<EmptyCartIcon sx={{ marginRight: "8px" }} />}
                    variant="outlined"
                    color="success"
                    onClick={() => emptyCart()}
                  >
                    empty cart
                  </EmptyCartBtn>
                  {cartProducts.map((product, index) => {
                    const variant = product?.variants?.find(
                      (v) => v.id === product?.id
                    );
                    return (
                      <CartWrapper key={index} item md={12}>
                        <ImageWrapper>
                          <ImageBox
                            component="img"
                            image={
                              variant?.variantImage || product?.images[0]?.image
                            }
                            alt="image"
                          />
                        </ImageWrapper>
                        <Detailbox>
                          <Heading>
                            {language === "ar"
                              ? product?.commons?.ar?.productName
                              : product?.commons?.en?.productName}
                          </Heading>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <CategoryBox>
                              {product?.productCategory}
                            </CategoryBox>
                            <CategoryBox
                              sx={{
                                backgroundColor: "#6c5ad5",
                                color: "#fff",
                              }}
                            >
                              {product?.product_type_display}
                            </CategoryBox>
                          </Box>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              alignItems={"start"}
                              gap={"5px"}
                            >
                              <Heading sx={{ color: "#E92E67" }}>
                                {product.discounted_price === null
                                  ? product.vat_onlinePrice
                                  : product.discounted_price}{" "}
                                SAR
                              </Heading>
                              {/* salman */}
                              {product?.product_type_display === "Service" ? (
                                <QuantityButtons
                                  size="small"
                                  sx={{ marginTop: "5px" }}
                                  aria-label="small outlined button group"
                                >
                                  <Button
                                    onClick={() => handleDecrement(product.id)}
                                    sx={{
                                      width: "130px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Remove Service
                                  </Button>
                                </QuantityButtons>
                              ) : (
                                <QuantityButtons
                                  size="small"
                                  sx={{ marginTop: "5px", width: "130px" }}
                                  aria-label="small outlined button group"
                                >
                                  <Button
                                    onClick={() => handleDecrement(product.id)}
                                  >
                                    -
                                  </Button>
                                  <Button sx={{ fontWeight: "bold" }}>
                                    {product.quantity}
                                  </Button>
                                  <Button
                                    onClick={() => handleIncrement(product.id)}
                                  >
                                    +
                                  </Button>
                                </QuantityButtons>
                              )}
                            </Box>
                          </Box>
                          {product.quantity < product.minQty && (
                            // Display message if quantity is less than minQty
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "12px",
                                color: "red",
                                marginTop: "5px",
                                fontWeight: "700",
                              }}
                            >
                              Selected Quantity is below the minimum order
                              limit: {parseFloat(product.orderLimit).toFixed(0)}
                            </Typography>
                          )}

                          {variant?.variantCombination && (
                            <Box>
                              <Typography
                                sx={{ fontSize: "14px", color: "#5F6C72" }}
                              >
                                Variant
                              </Typography>
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
                          )}
                        </Detailbox>
                      </CartWrapper>
                    );
                  })}
                </>
              )}
            </ProductBox>
          </Grid>
          <Grid
            item
            md={4}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <CartTotal item md={10}>
              <Typography
                sx={{
                  color: "#191C1F",
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "15px 10px",
                }}
              >
                {translate("cart.total")}
              </Typography>

              <Box
                display={"flex"}
                flexDirection={"column"}
                padding={"0px 10px 20px"}
              >
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography sx={{ fontSize: "14px", color: "#5F6C72" }}>
                    {translate("cart.sub")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    {parseFloat(totalPrice || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    SAR
                  </Typography>
                </Box>
                <Box
                  mt={"8px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ fontSize: "14px", color: "#5F6C72" }}>
                    {translate("cart.dis")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    0
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
                    {translate("cart.tot")}
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
                mb={4}
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
                  onClick={() => checkToken()}
                  disabled={isAnyProductBelowMinQty}
                >
                  {translate("cart.proceed")}
                </Button>
              </Box>
            </CartTotal>
          </Grid>
        </Grid>
      </Wrapper>
      <Footer />
    </>
  );
};

// Styled Components
const Wrapper = styled(Box)(({ theme }) => ({
  margin: "40px",
  [theme.breakpoints.down("sm")]: {
    margin: "5px",
    padding: "10px",
  },
}));

const QuantityButtons = styled(ButtonGroup)(({ theme }) => ({
  border: "1px solid #009444",
  borderRadius: "5px",
  width: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiButton-root": {
    border: "none",
  },
  "& .MuiButton-root:first-child": {
    border: "none",
  },
  "& .MuiButton-root:last-child": {},
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25px",
    gap: "2px",
    "& .MuiButtonBase-root": {
      padding: "8px",
      minWidth: "unset",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
    },
  },
}));

const EmptyCartBtn = styled(Button)(() => ({
  width: "auto",
  alignSelf: "flex-end",
  textTransform: "capitalize",
}));

const CartWrapper = styled(Grid)(({ theme }) => ({
  padding: "20px",
  borderRadius: "10px",
  boxShadow: ".2px .2px 2px 0px rgba(255,255,255,.4)",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  border: " 1px solid #DDDDDD",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const CartTotal = styled(Grid)(({ theme }) => ({
  padding: "10px",
  borderRadius: "10px",
  boxShadow: ".2px .2px 2px 0px rgba(255,255,255,.4)",
  height: "300px",
  border: " 1px solid #DDDDDD",
  [theme.breakpoints.down("sm")]: {
    width: "290px",
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "100px",
  height: "100px",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
  },
}));

const ProductBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    display: "flex",
    gap: "10px",
    width: "100%",
  },
}));

const Detailbox = styled(Box)({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
});

const ImageBox = styled(CardMedia)(({ theme }) => ({
  width: "100px",
  height: "100px",
  objectFit: "contain",
  borderRadius: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    borderRadius: "10px",
    objectFit: "cover",
  },
}));

const CategoryBox = styled(Box)(() => ({
  backgroundColor: "#80c7ff",
  color: " #007ad9 ",
  fontWeight: "bolder",
  fontSize: "14px",
  width: "fit-content",
  padding: "2px 8px",
  borderRadius: "5px",
  margin: "5px 0px",
}));

export default Cart;
