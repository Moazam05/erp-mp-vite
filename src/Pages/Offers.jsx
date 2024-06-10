import { useState } from "react";

// MUI Components Import
import { Box, Button, Grid, Typography } from "@mui/material";

// Components Import
import AppBar from "./components/Navbar";
import Popup from "./components/Popup";
import Footer from "./components/Footer/Footer";

// Icons Import
import PdfIcon from "@mui/icons-material/PictureAsPdf";

// Assets Import
import Check from "../assets/check.webp";

const Offers = ({ image }) => {
  console.log(image);
  const [modal, setModal] = useState(false);

  const downloadPDF = async () => {
    window.open(
      "https://3ndey-3rp.s3.amazonaws.com/RFQ+Template+Temporary.pdf",
      "_blank"
    );
  };

  return (
    <>
      <Popup
        img={Check}
        open={modal}
        setOpen={setModal}
        title={"Thank you for accepting the quotation!"}
        desc={
          "We value your interest in our needs and look forward to reviewing your proposals. Thank you for being a part of our procurement process."
        }
      />
      <AppBar />
      <Box width={"auto"} display={"flex"} flexDirection={"column"}>
        <Typography
          sx={{
            display: "flex",
            fontWeight: "bold",
            fontSize: 30,
            color: "black",
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          AI3RP Best Offers
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "2px",
          }}
        >
          <Box
            sx={{
              width: "25%",
              height: "auto",
              paddingBottom: "20px",
              marginLeft: 10,
              boxShadow: "0px 0px 8px 3px rgba(85, 105, 135, 0.25)",
              borderRadius: "15px",
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                width: "80%",
                marginTop: 3,
                borderRadius: "5px",
                height: "10%",
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                color: "#92278F",
                fontSize: "22px",
              }}
            >
              Best Offer 1
            </Typography>
            <Grid container p={3}>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  9,500
                </Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Delivery Cost</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>19,500</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Sales Tax</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>8,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Vat (15%)</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>10,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost Including Vat
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  35,000
                </Typography>
              </Grid>
            </Grid>

            <Box
              mt={2}
              gap={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                startIcon={<PdfIcon />}
                onClick={() => downloadPDF()}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                onClick={() => setModal(true)}
              >
                Accept
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: "25%",
              height: "auto",
              paddingBottom: "20px",
              boxShadow: "0px 0px 8px 3px rgba(85, 105, 135, 0.25)",
              borderRadius: "15px",
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                width: "80%",
                marginTop: 3,
                borderRadius: "5px",
                height: "10%",
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                color: "#92278F",
                fontSize: "22px",
              }}
            >
              Best Offer 2
            </Typography>

            <Grid container p={3}>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  9,500
                </Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Delivery Cost</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>19,500</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Sales Tax</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>8,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Vat (15%)</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>10,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost Including Vat
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  35,000
                </Typography>
              </Grid>
            </Grid>

            <Box
              mt={2}
              gap={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                startIcon={<PdfIcon />}
                onClick={() => downloadPDF()}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                onClick={() => setModal(true)}
              >
                Accept
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: "25%",
              height: "auto",
              paddingBottom: "20px",
              marginRight: 10,
              boxShadow: "0px 0px 8px 3px rgba(85, 105, 135, 0.25)",
              borderRadius: "15px",
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                width: "80%",
                marginTop: 3,
                borderRadius: "5px",
                height: "10%",
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                color: "#92278F",
                fontSize: "22px",
              }}
            >
              Best Offer-3
            </Typography>
            <Grid container p={3}>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  9,500
                </Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Delivery Cost</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>19,500</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Sales Tax</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>8,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography>Vat (15%)</Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography>10,000</Typography>
              </Grid>
              <Grid item md={6} py={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Total Cost Including Vat
                </Typography>
              </Grid>
              <Grid item md={6} py={1} sx={{ textAlign: "end" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  35,000
                </Typography>
              </Grid>
            </Grid>
            <Box
              mt={2}
              gap={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                startIcon={<PdfIcon />}
                onClick={() => downloadPDF()}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="secondary"
                bgcolor={"green"}
                sx={{ borderRadius: "20px" }}
                onClick={() => setModal(true)}
              >
                Accept
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Offers;
