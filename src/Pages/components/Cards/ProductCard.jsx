import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import { Rating } from "@mui/material";
// MUIComponents Import
import {
  styled,
  Card,
  Box,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { MdOutlineMedicalServices } from "react-icons/md";
// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Default Image import
import DefaultImg from "../../../assets/logo.webp";
// Icons Import
import { useTranslation } from "../../../contexts/LanguageContext";
import { truncateString } from "../../../utils";
import { TbBriefcaseOff } from "react-icons/tb";

function ProductCard({ product, service }) {
  const { translate, getLanguage, getDirection } = useTranslation();
  const {
    addToCart,
    incrementById,
    decrementById,
    cartProducts,
    removeFromCart,
    isOrderLimitExceeded,
  } = useCart();

  const navigate = useNavigate();
  const language = getLanguage();

  const [isInCartState, setIsInCartState] = useState(false);

  const getCartItemQuantity = () => {
    const cartItem = cartProducts.find((item) => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      orderLimit: product.orderLimit,
      minQty: product.minQty,
      product: true,
    });
    setIsInCartState(true);
  };

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
    // Check if the item is in the cart before decrementing
    if (isInCartState) {
      decrementById(id);
      const updatedQuantity = cartProducts.find(
        (item) => item.id === id
      ).quantity;

      if (updatedQuantity <= 0) {
        // If quantity becomes zero or negative, remove the item from the cart
        removeFromCart(id);
        setIsInCartState(false);
      }
    }
  };

  useEffect(() => {
    setIsInCartState(cartProducts.some((item) => item.id === product.id));
  }, [cartProducts, product]);

  return (
    <>
      <Wrapper dir={getDirection()}>
        <ImageWrapper
          onClick={() => navigate(`/productdetail/${product?.slug}`)}
        >
          <img
            src={
              product.images.length > 0 ? product.images[0].image : DefaultImg
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="product_img"
          />
          <AvailableBadge>
            {translate("productdetail.stock")}{" "}
            {parseFloat(product?.available_quantity).toFixed(0)}
          </AvailableBadge>
          {product?.discount_type !== 0 ? (
            <DiscountBadge>
              {parseFloat(product?.discount).toFixed(0)}
              {product?.discount_type !== 1 ? "%" : "SAR"} OFF
            </DiscountBadge>
          ) : null}
        </ImageWrapper>
        <div dir={getDirection()} style={{ padding: "20px" }}>
          <Box onClick={() => navigate(`/productdetail/${product?.slug}`)}>
            {language === "ar" ? (
              <ProductName>
                {truncateString(product?.commons?.ar?.productName, 50)}
              </ProductName>
            ) : (
              <ProductName>
                {truncateString(product?.commons?.en?.productName, 50)}
              </ProductName>
            )}
            <Box sx={{ display: "flex", gap: "5px", margin: "5px 0px" }}>
              <Rating
                name="read-only"
                readOnly
                value={product?.avg_rating}
                sx={{ fontSize: "16px" }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChatIcon
                  sx={{ fontSize: "14px", color: "#f1c40f", marginLeft: "5px" }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#f1c40f",
                    marginLeft: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {product?.total_ratings}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <CategoryBox>{product?.productCategory}</CategoryBox>
              <CategoryBox
                sx={{
                  backgroundColor: "#6c5ad5",
                  color: "#fff",
                }}
              >
                {product?.product_type_display}
              </CategoryBox>
            </Box>

            {product?.discount_type !== 0 ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Price
                  sx={{
                    color: "#000",
                    fontSize: "15px",
                    textDecoration: "line-through",
                  }}
                >
                  {parseFloat(product.vat_onlinePrice).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </Price>
                <Price>
                  {parseFloat(product.discounted_price).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}{" "}
                  SAR
                </Price>
              </Box>
            ) : (
              <>
                <Price>
                  {parseFloat(product.vat_onlinePrice).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}{" "}
                  SAR
                </Price>
              </>
            )}
          </Box>
          <ActionsWrapper>
            {isInCartState && service ? (
              <Box sx={{ marginTop: "25px", width: "100%" }}>
                <Button
                  sx={{
                    fontWeight: "bold",
                    width: "100%",
                    borderRadius: "10px",
                    height: "50px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                    border: "1px solid #009444",
                    justifyContent: "center",
                    "& .MuiButton-root": {
                      border: "none",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement(product.id);
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "20px",
                      width: "20px",
                      height: "20px",
                      margin: "0 0 10px 5px",
                    }}
                  >
                    <TbBriefcaseOff />
                  </Box>
                  Remove Service
                </Button>
              </Box>
            ) : isInCartState ? (
              <Box sx={{ marginTop: "25px" }}>
                <QuantityButtons sx={{ width: "220px", height: "48px" }}>
                  <Button
                    sx={{ fontWeight: "bold", width: "100px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement(product.id);
                    }}
                  >
                    -
                  </Button>
                  <Button sx={{ fontWeight: "bold", width: "100px" }}>
                    {getCartItemQuantity()}
                  </Button>
                  <Button
                    sx={{ fontWeight: "bold", width: "100px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement(product.id);
                    }}
                  >
                    +
                  </Button>
                </QuantityButtons>
              </Box>
            ) : (
              <>
                <CartBTN
                  sx={{
                    backgroundColor:
                      product?.available_quantity === "0.00"
                        ? "#ccc"
                        : "#178F49",
                    cursor:
                      product?.available_quantity === "0.00"
                        ? "not-allowed"
                        : "pointer",
                    "&:hover": {
                      backgroundColor:
                        product?.available_quantity === "0.00"
                          ? "#ccc"
                          : "#178F49",
                      opacity: "0.8",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (service) {
                      handleAddToCart(product.prodId);
                    } else if (product?.available_quantity !== "0.00") {
                      handleAddToCart(product.prodId);
                    }
                  }}
                >
                  {product?.available_quantity === "0.00" ? (
                    <Heading>Out of Stock!</Heading>
                  ) : (
                    <>
                      {service ? (
                        <Box
                          sx={{
                            fontSize: "20px",
                            width: "20px",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                        >
                          <MdOutlineMedicalServices />
                        </Box>
                      ) : (
                        <CartIcon
                          sx={{
                            color: "#fff",
                            fontSize: "22px",
                            marginLeft: "5px",
                          }}
                        />
                      )}

                      {service ? (
                        "Book Now"
                      ) : (
                        <> {translate("productdetail.add")}</>
                      )}
                    </>
                  )}
                </CartBTN>
              </>
            )}
          </ActionsWrapper>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Card)(() => ({
  width: "260px",
  height: "auto",
  borderRadius: "10px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  margin: "10px",
}));

const Price = styled(Typography)(() => ({
  color: "#178F49",
  fontSize: "20px",
  fontWeight: "bold",
  height: "30px",
}));

const ImageWrapper = styled(Box)({
  width: "100%",
  height: "250px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const ProductName = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "bold",
  marginTop: "10px",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

const ActionsWrapper = styled(Box)(() => ({
  width: "100%",
  height: "55px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const QuantityButtons = styled(ButtonGroup)(() => ({
  width: "100%",
  borderRadius: "5px",
  marginBottom: "10px",
  border: "1px solid #009444",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  "& .MuiButton-root": {
    border: "none",
  },
}));

const CartBTN = styled(Button)(() => ({
  width: "100%",
  height: "50px",
  borderRadius: "10px",
  background: "#178F49",
  marginTop: "25px",
  marginBottom: "10px",
  fontWeight: "bold",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#178F49",
}));

const AvailableBadge = styled(Box)(() => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#178F49",
  color: "#fff",
  fontWeight: "bold",
  padding: "5px 7px",
  borderRadius: "20px",
  fontSize: "12px",
}));

const DiscountBadge = styled(Box)(() => ({
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "red",
  color: "#fff",
  fontWeight: "bold",
  padding: "5px 7px",
  borderRadius: "20px",
  fontSize: "12px",
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

export default ProductCard;
