import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";

// MUI Components Import
import { Container, Box, Typography } from "@mui/material";
import ProductCard from "./Cards/ProductCard";
import { useTranslation } from "../../contexts/LanguageContext";

// Loader Import
import { MoonLoader } from "react-spinners";

import { baseUrl } from "../../constants/api";

function Recomendation() {
  const token = window.localStorage.getItem("mp-user-token");

  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState([]);
  const { translate } = useTranslation();

  const fetchRecommendation = () => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/api/recommendations`,
        { token: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setRecommendation(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  return recommendation.length === 0 ? (
    <></>
  ) : (
    <Wrapper maxWidth={false}>
      <Heading>{translate("recommended.title")} </Heading>
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
        >
          <MoonLoader color="#000" size={20} />
        </Box>
      ) : (
        <RecommendedProductsWrapper
          sx={
            recommendation?.length < 4
              ? { justifyContent: "center" }
              : { justifyContent: "flex-start" }
          }
        >
          {recommendation?.map((product, index) => (
            <ProductCard key={index} product={product} id={product.prodId} />
          ))}
        </RecommendedProductsWrapper>
      )}
    </Wrapper>
  );
}

// Styled Components

const Wrapper = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  padding: "40px 0",
  width: "100%",
  margin: "30px auto",
  backgroundColor: "#168F48",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "700",
  color: "#fff",
  textAlign: "center",
});

const RecommendedProductsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  overflowX: "auto", // Ensure horizontal scroll for the container
  overflowY: "hidden", // Hide vertical overflow
  padding: "0px",
  "& > *": {
    flex: "0 0 auto",
    minWidth: "230px",
  },

  "&::-webkit-scrollbar": {
    height: "8px", // Adjust the height of the scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Color of the scrollbar thumb
    borderRadius: "10px", // Rounded corners for the scrollbar thumb
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Color when hovering over the scrollbar thumb
  },

  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    overflowX: "auto",
    "& > *": {
      flex: "0 0 auto",
      minWidth: "230px",
    },
  },
}));

export default Recomendation;
