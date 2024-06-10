import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

// Components Import
import Navbar from "./components/Navbar";
import MyFatoorahGateway from "./PaymentProviders/MyFatoorah/MyFatoorah";
import PayfortGateway from "./PaymentProviders/PayFort/PayFort";

import { baseUrl } from "../constants/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// payment-gateway

function Payment() {
  const token = window.localStorage.getItem("mp-user-token");

  const [paymentGateway, setPaymentGateway] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const getPaymentGateway = async () => {
    axios
      .get(`${baseUrl}/api/payment-gateway`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPaymentGateway(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPaymentStatus = async () => {
    axios
      .get(`${baseUrl}/api/payment-status/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (!response?.data?.status) {
          getPaymentGateway();
        }
        setPaymentStatus(response?.data?.status);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {paymentStatus ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginTop: "1rem",
                padding: "20px",
              }}
            >
              <Typography>You have already paid for this order.</Typography>
              <Button
                sx={{ marginRight: "10px" }}
                onClick={() => {
                  navigate(`/profile/orderdetail/${id}`);
                }}
              >
                Go back to Order Detail
              </Button>
            </Box>
          ) : (
            <>
              {paymentGateway?.payment_provider === 2 ? (
                <MyFatoorahGateway />
              ) : paymentGateway?.payment_provider === 1 ? (
                <PayfortGateway />
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Payment;
