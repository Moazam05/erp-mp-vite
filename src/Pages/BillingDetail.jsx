import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

function BillingDetail() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid
          container
          my={3}
          sx={{ display: "flex", gap: "50px", justifyContent: "center" }}
        >
          <Grid
            item
            md={6}
            sx={{
              border: " 1px solid #DDDDDD",
              borderRadius: "10px",
              height: "auto",
              padding: "20px",
            }}
          >
            <CardHeading>Billing details</CardHeading>
            <DataBox>
              <DataText>Jimmy Smith</DataText>
            </DataBox>
            <CardHeading>Ship to </CardHeading>
            <DataBox>
              <DataText>
                HubSpot, 25 First Street, Cambridge MA 02141, United States
              </DataText>
            </DataBox>
            <CardHeading>Shiping Method</CardHeading>
            <DataBox>
              <DataText>Jimmy Smith</DataText>
            </DataBox>
          </Grid>

          <Grid
            item
            md={4}
            my={3}
            sx={{
              border: " 1px solid #DDDDDD",
              borderRadius: "10px",
              height: "auto",
            }}
          >
            <Typography
              sx={{
                color: "#191C1F",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "15px 10px",
              }}
            >
              Order Summary
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"column"}
              padding={"0px 10px 20px"}
            ></Box>
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
                  width: "80%",
                }}
                color="secondary"
                variant="contained"
                endIcon={<ArrowForward />}
              ></Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

const Container = styled(Box)({
  margin: "40px ",
});

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px ",
}));
const DataBox = styled(Box)(() => ({
  padding: "10px 15px",
  backgroundColor: "#F9F9F9",
  width: "90%",
  borderRadius: "10px",
}));
const DataText = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
}));

export default BillingDetail;
