import { styled } from "@mui/system";

// MUI Components Import
import { Box, Grid, Typography, Button } from "@mui/material";

// Components Import
import AppBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
// import Header from "./components/Header";
import TextInput from "./components/TextInput";
// Import the images and Icon
import Info from "@mui/icons-material/InfoOutlined";
import Arrow from "@mui/icons-material/ArrowForward";

// const headerData = {
//     heading: "Track Order",
//     subheading: "To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.",
// }

const TrackOrder = () => {
  return (
    <>
      <Container>
        <AppBar />
        <Wrapper>
          <Grid
            container
            my={4}
            display={"flex"}
            flexDirection={"column"}
            margin={"30px"}
          >
            <Grid item md={5}>
              {/* <Header data={headerData} /> */}
            </Grid>
            <Grid
              item
              md={7}
              display={"flex"}
              flexDirection={"row"}
              gap={"10px"}
            >
              <TextInput label="Order ID" size="6" value="ID..." />
              <TextInput label="Billing Email" size="6" value="Email address" />
            </Grid>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"10px"}
              alignItems={"center"}
            >
              <Info sx={{ color: "#5F6C72" }} />
              <Typography fontSize={"12px"} color={"#5F6C72"}>
                Order ID that we sended to your in your email address.
              </Typography>
            </Box>
            <Button
              size="large"
              style={{ textTransform: "none", padding: "4px 40px" }}
              color="secondary"
              variant="contained"
              sx={{ width: "200px", mt: "60px" }}
              endIcon={<Arrow />}
            >
              Track Order
            </Button>
          </Grid>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

// Styled Components

const Container = styled(Box)({});

const Wrapper = styled(Box)({
  margin: "40px",
});

export default TrackOrder;
