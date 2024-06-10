import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Import the images
import CardsImgs from "../../../assets/cards.webp";
import MadaImage from "../../../assets/mada.jpg";
import EWallet from "../../../assets/ewallet.png";
import stc from "../../../assets/stc.webp";
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

// Payment Methods
import { PayCard } from "./PaymentMethods/PayCard";
import { MadaCard } from "./PaymentMethods/MadaCard";
import { AmeCard } from "./PaymentMethods/AmexCard";
import { GooglePay } from "./PaymentMethods/GooglePay";
import { STCPay } from "./PaymentMethods/STCPay";

function MyFatoorahGateway() {
  const { translate, getDirection } = useTranslation();
  const token = window.localStorage.getItem("mp-user-token");
  const { id } = useParams();
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();

  // Payment Methods Related Variables
  const [cardExpanded, setCardExpanded] = useState(false);
  const [eWalletExpanded, setEWalletExpanded] = useState(false);
  const [stcExpanded, setSTCExpanded] = useState(false);
  const [creatingSession, setCreatingSession] = useState(false);
  const [sessionID, setSessionID] = useState(null);
  const [scriptURL, setScriptURL] = useState(null);
  const [payingCard, setPayingCard] = useState(false);
  const [payingSTCPay, setPayingSTCPay] = useState(false);
  const [paymentMetaData, setPaymentMetaData] = useState({});
  const [cashOnDeliveryLoading, setCashOnDeliveryLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOrderDetail = () => {
    setExpanded(!expanded);
  };

  const initSession = (orderID, type) => {
    setCreatingSession(true);
    axios
      .get(`${baseUrl}/api/fatoorah/init-session/${orderID}/${type}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setCreatingSession(false);
        setSessionID(res?.data?.session?.Data?.SessionId);
        setScriptURL(res?.data?.script);
        setPaymentMetaData(res?.data?.metadata);
      })
      .catch((err) => {
        console.log(err);
        setCreatingSession(false);
        toast.error("Failed to create payment session");
      });
  };

  const executePayment = (
    orderId,
    sessionId,
    sessionCallback,
    paymentId,
    loaderCallback
  ) => {
    const paymentURL = `${baseUrl}/api/fatoorah/execute-payment`;
    loaderCallback(true);
    axios
      .post(
        paymentURL,
        {
          sessionId: sessionId,
          orderId: orderId,
          paymentId: paymentId || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=640,height=640,left=100,top=100`;
        let paymentWindow = window.open(
          data?.Data?.PaymentURL,
          "3D Secure Verification",
          params
        );

        let checkWindowClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkWindowClosed);
            paymentWindow.close();
            navigate(`/profile/orderdetail/${id}`);
          }
        }, 1000);
        loaderCallback(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to process payment");
        // sessionCallback(id);
        loaderCallback(false);
      });
  };

  const payUsingCard = () => {
    if (!sessionID) {
      toast.error("Failed to create payment session");
      return;
    }
    setPayingCard(true);
    window.myFatoorah.submit();
    setTimeout(() => {
      executePayment(id, sessionID, initSession, null, setPayingCard);
    }, 2000);
  };

  const payUsingSTCPay = () => {
    if (!sessionID) {
      toast.error("Failed to create payment session");
      return;
    }
    executePayment(id, sessionID, initSession, 14, setPayingSTCPay);
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
        navigate(`/profile/order-history`);
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

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
                  <PaymentMethod
                    expanded={cardExpanded}
                    onChange={(event, isExpanded) => {
                      if (isExpanded) {
                        initSession(id, "card");
                        setEWalletExpanded(false);
                        setSTCExpanded(false);
                      }
                      setCardExpanded(isExpanded);
                    }}
                  >
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Debit/Credit Card
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <img
                            style={{ height: "20px" }}
                            src={CardsImgs}
                            alt=""
                          />
                          <img
                            style={{ height: "20px" }}
                            src={MadaImage}
                            alt=""
                          />
                        </Box>
                      </PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      {creatingSession ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Box sx={{ height: "300px" }}>
                          <TabContext value={value}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <TabList
                                onChange={handleChange}
                                aria-label="Card Payment Types"
                              >
                                <Tab
                                  sx={
                                    value === "1"
                                      ? { fontWeight: "bolder" }
                                      : null
                                  }
                                  label="Visa/Master Card"
                                  value="1"
                                />
                                <Tab
                                  sx={
                                    value === "2"
                                      ? { fontWeight: "bolder" }
                                      : null
                                  }
                                  label="Mada"
                                  value="2"
                                />
                                <Tab
                                  sx={
                                    value === "3"
                                      ? { fontWeight: "bolder" }
                                      : null
                                  }
                                  label="Amex"
                                  value="3"
                                />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <PayCard
                                setCreatingSession={setCreatingSession}
                                sessionId={sessionID}
                                countryCode="KWT"
                                scriptURL={scriptURL}
                              />
                            </TabPanel>
                            <TabPanel value="2">
                              <MadaCard
                                setCreatingSession={setCreatingSession}
                                sessionId={sessionID}
                                countryCode="KWT"
                                scriptURL={scriptURL}
                              />
                            </TabPanel>
                            <TabPanel value="3">
                              <AmeCard
                                setCreatingSession={setCreatingSession}
                                sessionId={sessionID}
                                countryCode="KWT"
                                scriptURL={scriptURL}
                              />
                            </TabPanel>
                          </TabContext>
                        </Box>
                      )}
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
                        >
                          {payingCard ? (
                            <CircularProgress
                              sx={{ color: "#fff" }}
                              size={20}
                            />
                          ) : (
                            <>
                              <PaymentIcon /> <ButtonText>Pay Now</ButtonText>
                            </>
                          )}
                        </PayButton>
                      </Box>
                    </PaymentContainer>
                  </PaymentMethod>
                </CardBox>
                <CardBox>
                  <PaymentMethod
                    expanded={eWalletExpanded}
                    onChange={(event, isExpanded) => {
                      if (isExpanded) {
                        initSession(id, "gpay");
                        setCardExpanded(false);
                        setSTCExpanded(false);
                      }
                      setEWalletExpanded(isExpanded);
                    }}
                  >
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>
                        <Typography sx={{ fontWeight: "bold" }}>
                          E-Wallet
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <img
                            style={{ height: "20px" }}
                            src={EWallet}
                            alt=""
                          />
                        </Box>
                      </PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      {creatingSession ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Box>
                          <TabContext value={value}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <TabList
                                onChange={handleChange}
                                aria-label="E-Wallet Types"
                              >
                                <Tab
                                  sx={
                                    value === "1"
                                      ? { fontWeight: "bolder" }
                                      : null
                                  }
                                  label="Google Pay"
                                  value="1"
                                />
                                <Tab
                                  sx={
                                    value === "2"
                                      ? { fontWeight: "bolder" }
                                      : null
                                  }
                                  label="Apple Pay"
                                  value="2"
                                />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <GooglePay
                                setCreatingSession={setCreatingSession}
                                sessionId={sessionID}
                                amount={"10"}
                                paymentMetaData={paymentMetaData}
                                scriptURL={scriptURL}
                              />
                            </TabPanel>
                            <TabPanel value="2">
                              Apple Pay Button Will be Here
                            </TabPanel>
                          </TabContext>
                        </Box>
                      )}
                    </PaymentContainer>
                  </PaymentMethod>
                </CardBox>
                <CardBox>
                  <PaymentMethod
                    expanded={stcExpanded}
                    onChange={(event, isExpanded) => {
                      if (isExpanded) {
                        initSession(id, "stc");
                        setCardExpanded(false);
                        setEWalletExpanded(false);
                      }
                      setSTCExpanded(isExpanded);
                    }}
                  >
                    <PaymentType
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <PaymentMethodTitle>
                        <Typography sx={{ fontWeight: "bold" }}>
                          STC Pay
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <img style={{ height: "20px" }} src={stc} alt="" />
                        </Box>
                      </PaymentMethodTitle>
                    </PaymentType>
                    <PaymentContainer>
                      {creatingSession ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography>
                          <STCPay />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <PayButton
                              sx={{
                                backgroundColor: "#50008C",
                                "&:hover": {
                                  backgroundColor: "#50008C",
                                  opacity: "0.8",
                                },
                              }}
                              size="small"
                              variant="contained"
                              disableElevation
                              onClick={() => {
                                payUsingSTCPay();
                              }}
                            >
                              {payingSTCPay ? (
                                <CircularProgress
                                  sx={{ color: "#fff" }}
                                  size={20}
                                />
                              ) : (
                                <>
                                  <PaymentIcon />{" "}
                                  <ButtonText>Pay Now</ButtonText>
                                </>
                              )}
                            </PayButton>
                          </Box>
                        </Typography>
                      )}
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
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

export default MyFatoorahGateway;
