import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CircularProgress from "@mui/material/CircularProgress";

// Import the images
// import CardsImgs from "../assets/cards.webp";
// import applepay from "../assets/applePay.webp";
// import stc from "../assets/stc.webp";
// import tabby from "../assets/tabby.webp";
// import cod from "../assets/cod.webp";

// Components Import
import { Box, Grid, Typography, styled, Button } from "@mui/material";
import { useTranslation } from "../../../contexts/LanguageContext";

// import icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaymentIcon from "@mui/icons-material/Payment";

import { baseUrl } from "../../../constants/api";
import { toast } from "react-toastify";

function PayfortGateway() {
  const { translate, getDirection } = useTranslation();
  const token = window.localStorage.getItem("mp-user-token");
  const { id } = useParams();
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleOrderDetail = () => {
    setExpanded(!expanded);
  };

  // Payment Methods Related Variables
  const [cashOnDeliveryLoading, setCashOnDeliveryLoading] = useState(false);

  const payUsingCard = () => {
    window.open(`${baseUrl}/api/payfort/payment/${id}`, "_blank");
  };

  const getOrderDetails = () => {
    setOrderLoading(true);
    axios
      .get(`${baseUrl}/api/orders/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setOrderDetails(response.data);
        setOrderLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setOrderLoading(false);
        navigate("/profile/order-history");
      });
  };

  const cashOnDelivery = () => {
    setCashOnDeliveryLoading(true);
    axios
      .get(`${baseUrl}/api/cash-on-delivery/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCashOnDeliveryLoading(false);
        toast.success("Order placed successfully");
        navigate(`/profile/orderdetail/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setCashOnDeliveryLoading(false);
        toast.error("Failed to place order");
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <Wrapper dir={getDirection()}>
        <Grid
          container
          my={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Grid item md={7} sx={{ height: "auto", padding: "20px" }}>
            <Box
              sx={{
                border: " 1px solid #DDDDDD",
                marginBottom: "10px",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <CardHeading>{translate("checkout.option")}</CardHeading>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardBox>
                  <PaymentMethod>
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>Debit/Credit Card</PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <PayButton
                          size="small"
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            payUsingCard();
                          }}
                          sx={{ width: "100%" }}
                        >
                          <PaymentIcon /> <ButtonText>Pay Now</ButtonText>
                        </PayButton>
                      </Box>
                    </PaymentContainer>
                  </PaymentMethod>
                </CardBox>
                <CardBox>
                  <PaymentMethod disabled>
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>STC</PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </PaymentContainer>
                  </PaymentMethod>
                </CardBox>
                <CardBox>
                  <PaymentMethod disabled>
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>Tabby</PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </PaymentContainer>
                  </PaymentMethod>
                </CardBox>
              </Box>
            </Box>
            <Typography>
              Click on the button below to proceed with Cash on Delivery
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <PayButton
                size="small"
                color="primary"
                variant="contained"
                disableElevation
                onClick={() => {
                  cashOnDelivery();
                }}
              >
                {cashOnDeliveryLoading ? (
                  <CircularProgress sx={{ color: "#fff" }} size={20} />
                ) : (
                  <>
                    <PaymentIcon /> <ButtonText>Proceed</ButtonText>
                  </>
                )}
              </PayButton>
            </Box>
          </Grid>
          <Grid item md={5} sx={{ height: "auto", padding: "20px" }}>
            <Box
              sx={{
                border: "1px solid #DDDDDD",
                marginBottom: "10px",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Accordion expanded={expanded} onChange={handleOrderDetail}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="order-details-content"
                  id="order-details-header"
                >
                  <CardHeading>Order Details</CardHeading>
                </AccordionSummary>
                <AccordionDetails>
                  {orderLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "50px",
                      }}
                    >
                      <CircularProgress size={20} />
                    </div>
                  ) : (
                    <>
                      {orderDetails?.products?.map((product, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            marginBottom: "15px",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 4px;",
                            padding: "10px 30px",
                            gap: "20px",
                          }}
                        >
                          <img
                            src={product?.product?.images[0]?.image}
                            alt=""
                            style={{
                              height: "80px",
                              width: "80px",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "start",
                              flexDirection: "column",
                              justifyContent: "start",
                            }}
                          >
                            <Typography>
                              {product?.product?.commons?.en?.productName}
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              Quantity: {product?.quantity}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "40px ",
  [theme.breakpoints.down("sm")]: {
    margin: "10px",
  },
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "bold",
  padding: "0px 2px ",
  marginBottom: "10px",
}));

const CardBox = styled(Box)(() => ({
  // padding: "10px",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  border: " 1px solid #DDDDDD",
  marginBottom: "10px",
  borderRadius: "0px",
  padding: "0px",
}));

const ButtonText = styled(Typography)(() => ({
  marginRight: "5px",
  fontWeight: "bold",
  fontSize: "14px",
}));

const PayButton = styled(Button)(() => ({
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  marginTop: "2rem",
  padding: "4px 24px",
  width: "200px",
  height: "40px",
  borderRadius: "20px",
}));

const PaymentMethod = styled(Accordion)(() => ({
  width: "100%",
  boxShadow: "none",
}));

const PaymentType = styled(AccordionSummary)(() => ({
  fontSize: "14px",
  fontWeight: "600",
}));

const PaymentContainer = styled(AccordionDetails)(() => ({}));

const PaymentMethodTitle = styled(Typography)(() => ({
  fontWeight: "bold",
}));

export default PayfortGateway;
