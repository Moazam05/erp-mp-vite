import { styled } from "@mui/system";

// MUI Components Import
import { Box, Grid, Typography, Button } from "@mui/material";
import StarRatings from "react-star-ratings";
// Components Import
import AppBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
// import Products from "./components/Products";
// Import the images and Icon
import map from "../assets/map.png";
import shirts from "../assets/backgroundshirts.webp";
import LinearProgress from "@mui/material/LinearProgress";

const Starrate = [
  { rating: 5, progressBarValue: 100 },
  { rating: 4, progressBarValue: 80 },
  { rating: 3, progressBarValue: 60 },
  { rating: 2, progressBarValue: 40 },
  { rating: 1, progressBarValue: 20 },
];

const Vendordetail = () => {
  return (
    <Container>
      <AppBar />
      <Grid container display={"flex"} margin={"50px"} gap={"40px"}>
        <Grid>
          <Typography fontWeight={"bold"}>Vendor Details</Typography>
          <Grid item my={2} md={5.7}>
            <Box
              sx={{
                width: "553px",
                height: "467px",
                background: `url(${shirts}) center/cover no-repeat`,
              }}
            >
              <Box
                sx={{
                  color: "white",
                  ml: "30px",
                  position: "absolute",
                  bottom: 0,
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                <Typography fontWeight={"bold"} fontSize={"18px"}>
                  Ammar Garment & Co. pvt ltd
                </Typography>
                <Box
                  mt={"10px"}
                  gap={"20px"}
                  height={"50px"}
                  display={"flex"}
                  flexDirection={"row"}
                  borderRadius={"10px"}
                  border={"1px solid white"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box>
                    <Typography fontSize={"9px"}>Customers</Typography>
                    <Typography fontWeight={"bold"}>10K +</Typography>
                  </Box>
                  <Box>
                    <Typography fontSize={"9px"}>Seller Rating</Typography>
                    <Box display={"flex"} flexDirection={"row"} gap={"5px"}>
                      <Typography fontWeight={"bold"}>4.8</Typography>
                      <StarRatings
                        rating={1}
                        starRatedColor="#FFBD00"
                        changeRating={() => {}}
                        numberOfStars={1}
                        starDimension="14px"
                        starSpacing="0px"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography fontSize={"9px"}>Open Since</Typography>
                    <Typography fontWeight={"bold"}>July, 2022</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            border={"1px solid #E4E7E9"}
            padding={"20px"}
            borderRadius={"15px"}
          >
            <Box display={"flex"} justifyContent={"space-between"} my={3}>
              <Typography fontWeight={"bold"}>
                Seller Rating & Reviews
              </Typography>
              <QuoteBtn>View All</QuoteBtn>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} my={1}>
              <Box
                display={"flex"}
                width={"180px"}
                flexDirection={"row"}
                gap={"15px"}
                alignItems={"center"}
                borderRight={"1px solid #DDD"}
              >
                <Typography fontWeight={"bold"} fontSize={"50px"}>
                  4.8
                </Typography>
                <StarRatings
                  rating={1}
                  starRatedColor="#FFBD00"
                  changeRating={() => {}}
                  numberOfStars={1}
                  starDimension="25px"
                  starSpacing="0px"
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"60%"}
                gap={"5px"}
              >
                {Starrate.map((item, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    <Typography> {item.rating}</Typography>
                    <StarRatings
                      rating={item.rating}
                      starRatedColor="#FFBD00"
                      changeRating={() => {}}
                      numberOfStars={1}
                      starDimension="14px"
                    />
                    <LinearProgress
                      variant="determinate"
                      color="success"
                      value={item.progressBarValue}
                      sx={{
                        width: "270px",
                        height: "10px",
                        borderRadius: "10px",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FFA800",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              my={2}
              padding={"16px"}
              display={"flex"}
              gap={"15px"}
              flexDirection={"row"}
              border={"1px solid #E4E7E9"}
              borderRadius={"10px"}
              alignItems={"center"}
            >
              <Box
                width={"64px"}
                height={"80px"}
                bgcolor={"#018574"}
                borderRadius={"15px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  fontWeight={"bold"}
                  fontSize={"24px"}
                  color={"white"}
                >
                  U
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} width={"220px"}>
                <Typography fontWeight={"bold"} fontSize={"20px"}>
                  Mister Umar
                </Typography>
                <Typography fontSize={"16px"} color={"gray"}>
                  Nice luggage and hand bag
                </Typography>
              </Box>
              <Box ml={"50px"}>
                <StarRatings
                  rating={5}
                  starRatedColor="#FFBD00"
                  changeRating={() => {}}
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing="0px"
                />
              </Box>
            </Box>
            <Box
              my={2}
              padding={"16px"}
              display={"flex"}
              gap={"15px"}
              flexDirection={"row"}
              border={"1px solid #E4E7E9"}
              borderRadius={"10px"}
              alignItems={"center"}
            >
              <Box
                width={"64px"}
                height={"80px"}
                bgcolor={"#018574"}
                borderRadius={"15px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  fontWeight={"bold"}
                  fontSize={"24px"}
                  color={"white"}
                >
                  W
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} width={"220px"}>
                <Typography fontWeight={"bold"} fontSize={"20px"}>
                  Muaz Waseem
                </Typography>
                <Typography fontSize={"16px"} color={"gray"}>
                  It's looking good and it looks the same as in the picture.
                </Typography>
              </Box>
              <Box ml={"50px"}>
                <StarRatings
                  rating={5}
                  starRatedColor="#FFBD00"
                  changeRating={() => {}}
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing="0px"
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            my={2}
            border={"1px solid #E4E7E9"}
            padding={"20px"}
            borderRadius={"15px"}
          >
            <Box
              sx={{
                width: "520px",
                height: "467px",
                background: `url(${map}) center/cover no-repeat`,
                borderRadius: "15px",
              }}
            ></Box>
          </Grid>
        </Grid>
        {/* <Grid item md={5.9} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} >
                    <Products />
                </Grid> */}
      </Grid>
      <Footer />
    </Container>
  );
};

// Styled Components

const Container = styled(Box)({});

const QuoteBtn = styled(Button)({
  borderRadius: 30,
  backgroundColor: "#009444",
  width: "100px",
  height: "30px",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  fontSize: 12,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#006222",
  },
});

export default Vendordetail;
