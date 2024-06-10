import { styled } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Context Import
import { useTranslation } from "../../../../contexts/LanguageContext";

// MUI Components Import
import { Box, Button, Grid, Typography } from "@mui/material";

// Components Import
import { baseUrl } from "../../../../constants/api";
import Loader from "../../Loader";
import Stepperstep from "../../Stepperstep";
import { thousandSeparator } from "../../../../utils";

const OrderDetail = () => {
  const { id } = useParams();
  const { translate, getDirection } = useTranslation();

  const token = window.localStorage.getItem("mp-user-token");

  const [orderDetail, setOrderDetail] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [loading, isLoading] = useState(false);

  const fetchOrderDetails = (id) => {
    isLoading(true);
    axios
      .get(`${baseUrl}/api/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setOrderDetail(response?.data);
        setOrderStatus(response?.data?.order?.status);
        isLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        isLoading(false);
      });
  };

  useEffect(() => {
    fetchOrderDetails(id);
  }, []);

  const formatAddress = (address) => {
    if (!address) return "";

    try {
      const guestAddress = JSON.parse(address);

      const { city, address: street, landmark } = guestAddress;

      let formattedAddress = `${city}, ${street}`;
      if (landmark) {
        formattedAddress += `, ${landmark}`;
      }
      return formattedAddress;
    } catch (error) {
      return "";
    }
  };

  const data = [
    {
      Heading: translate("orderdetail.code"),
      OrderData: `${orderDetail?.order.ordId}`,
    },
    {
      Heading: translate("orderdetail.on"),
      OrderData: `${new Date(orderDetail?.order.created_at).toLocaleString()}`,
    },
    {
      Heading: translate("orderdetail.to"),
      OrderData: `${
        formatAddress(orderDetail?.order.guest_address) ||
        orderDetail?.order.shipping_address
      }`,
    },
    {
      Heading: "Payment status",
      OrderData: `${orderDetail?.order?.transaction.payment_status_display}`,
    },
    {
      Heading: translate("orderdetail.type"),
      OrderData: `${orderDetail?.order?.transaction.payment_method_display}`,
    },
    {
      Heading: translate("orderdetail.id"),
      OrderData: `${orderDetail?.order?.transaction.fort_id}`,
    },
    { Heading: "Total products", OrderData: `${orderDetail?.products.length}` },
    {
      Heading: translate("orderdetail.paid"),
      OrderData: `${parseFloat(
        orderDetail?.order.total_price || 0
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} SAR`,
    },
  ];

  return (
    <>
      <Wrapper dir={getDirection()}>
        {loading ? (
          <Loader />
        ) : orderDetail && orderStatus ? (
          <Grid container>
            <Card item md={12}>
              <CardHeading>{translate("address.detail")}</CardHeading>
              <Grid container spacing={0} sx={{ padding: "25px 0" }}>
                {orderDetail?.products?.map((item, index) => {
                  return (
                    <Grid item key={index} xs={11.7} sm={5.5} md={5.5}>
                      <OrderWrapper>
                        <img
                          src={
                            item?.variant?.variantImage ||
                            item?.product.images[0].image
                          }
                          alt="product_image"
                          style={{
                            width: "70px",
                            height: "80px",
                            borderRadius: "5px",
                            marginRight: "8px",
                          }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontSize: "14px", color: "#2D2D2D" }}
                          >
                            {item?.product.commons.en.productName},{" "}
                            {item?.product.commons.ar.productName}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px", color: "#717171" }}
                          >
                            {item?.product.productCategory} /{" "}
                            {item?.product.productSubcategory}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px", color: "#717171" }}
                          >
                            {item?.product.brand}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px", color: "#717171" }}
                          >
                            {item?.quantity} items
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", color: "#2D2D2D" }}
                            >
                              {/* {parseFloat(
                                (item?.product.discounted_price === null
                                  ? item?.product.vat_onlinePrice
                                  : item?.product.discounted_price) *
                                  item?.quantity || 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })} */}
                              {thousandSeparator(
                                Number(item?.product?.vat_onlinePrice).toFixed(
                                  2
                                ) * item?.quantity
                              )}{" "}
                              SAR
                            </Typography>

                            <Box>
                              {item?.variant?.variantCombination && (
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
                                    {item?.variant?.variantCombination}
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </OrderWrapper>
                    </Grid>
                  );
                })}
              </Grid>

              <Grid item md={12} my={6}>
                <Stepperstep orderStatus={orderStatus} />
              </Grid>

              <Grid container spacing={0} sx={{ padding: "20px 0" }}>
                {data.map((row, index) => (
                  <Grid item container key={index}>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#F9F9F9" : "#FFFFFF",
                      }}
                    >
                      <OrderTile>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#2D2D2D",
                            textAlign: "left",
                          }}
                        >
                          {row.Heading}
                        </Typography>
                      </OrderTile>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#F9F9F9" : "#FFFFFF",
                      }}
                    >
                      <OrderTile>
                        <Typography sx={{ fontSize: "12px", color: "#717171" }}>
                          {row.OrderData}
                        </Typography>
                      </OrderTile>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        ) : null}
      </Wrapper>
    </>
  );
};

// Styled Components

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const Card = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  padding: "20px 20px 0 0",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 0 0 0",
  },
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
}));

const OrderWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const OrderTile = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  padding: "15px 10px",
}));

export default OrderDetail;
