// React Imports
import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, Typography } from "@mui/material";
import CustomModal from "../../components/CustomModal";
import { thousandSeparator } from "../../utils";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const InActiveCartModal = ({ modalOpen, handleResetTimer }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  let user = window.localStorage.getItem("username");

  useEffect(() => {
    const cartProducts = localStorage.getItem("cartProducts");
    if (cartProducts) {
      setProducts(JSON.parse(cartProducts));
    }
  }, []);

  return (
    <>
      <CustomModal
        open={modalOpen}
        sx={{
          width: "600px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <h3>Respected {user ? user : "User"}</h3>

          <Box
            sx={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
              }}
            >
              You have products in your cart. Please check out or continue
              shopping.
            </Typography>

            <Typography
              sx={{
                fontSize: "13px",
              }}
            >
              {`cDon't miss out on completing your purchase!`}
            </Typography>
          </Box>

          {/* Table Head */}
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "#4dbb6c",
              padding: "10px",
              color: "#fff",
              borderRadius: "4px",
              "@media (max-width: 576px)": {
                overflowX: "auto",
              },
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              Image
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                width: "175px",
                "@media (max-width: 576px)": {
                  minWidth: "175px",
                },
              }}
            >
              Product Name
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                width: "60px",
                "@media (max-width: 576px)": {
                  minWidth: "60px",
                },
              }}
            >
              Price
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                width: "60px",
                "@media (max-width: 576px)": {
                  minWidth: "60px",
                },
              }}
            >
              Quantity
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                width: "60px",
                marginRight: "20px",
                "@media (max-width: 576px)": {
                  minWidth: "60px",
                },
              }}
            >
              Total
            </Typography>
          </Box>

          {/* Table Body */}
          {products.map((product) => {
            return (
              <Box
                key={product?.id}
                sx={{
                  margin: "10px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  borderBottom: "1px solid #e0e0e0",
                  padding: "0 0 10px 0",
                  "@media (max-width: 576px)": {
                    overflowX: "auto",
                  },
                }}
              >
                <Box>
                  <img
                    src={product?.images[0]?.image}
                    alt="Inactive Cart"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    width: "180px",
                    display: "flex",
                    flexWrap: "wrap",
                    "@media (max-width: 576px)": {
                      minWidth: "180px",
                    },
                  }}
                >
                  {product?.commons?.en?.productName}
                </Typography>
                <Typography
                  sx={{
                    width: "60px",
                    "@media (max-width: 576px)": {
                      minWidth: "60px",
                    },
                  }}
                >
                  {thousandSeparator(Number(product.discounted_price))}
                </Typography>
                <Typography
                  sx={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    "@media (max-width: 576px)": {
                      minWidth: "60px",
                    },
                  }}
                >
                  {product.quantity}
                </Typography>
                <Typography
                  sx={{
                    width: "60px",
                    marginRight: "20px",
                    "@media (max-width: 576px)": {
                      minWidth: "60px",
                    },
                  }}
                >
                  {thousandSeparator(
                    Number(product.discounted_price * product.quantity)
                  )}
                </Typography>
              </Box>
            );
          })}

          <Box
            sx={{
              margin: "40px 0 10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                height: "40px",
              }}
              onClick={() => {
                handleResetTimer();
                navigate("/");
              }}
            >
              CONTINUE SHOPPING
            </Button>
            <Button
              onClick={() => {
                handleResetTimer();
                if (user) {
                  navigate("/checkout");
                } else {
                  navigate("/cart");
                }
              }}
              variant="contained"
              sx={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box>
                <DoneIcon
                  style={{
                    fontSize: "20px",
                    marginTop: "6px",
                  }}
                />
              </Box>
              PROCEED TO CHECKOUT
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default InActiveCartModal;
