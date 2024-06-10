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

function BestSeller() {
  const token = window.localStorage.getItem("mp-user-token");

  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const { translate } = useTranslation();

  const fetchBestSellers = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/bestsellers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setBestSellers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  return (
    <Wrapper>
      <Heading>{translate("bestseller.title")} </Heading>
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
        >
          <MoonLoader color="#000" size={20} />
        </Box>
      ) : (
        <BestProductsWrapper
          sx={
            bestSellers?.length < 4
              ? { justifyContent: "center" }
              : { justifyContent: "flex-start" }
          }
        >
          {bestSellers?.map((product, index) => (
            <ProductCard key={index} product={product} id={product.prodId} />
          ))}
        </BestProductsWrapper>
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
  width: "100vw",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "700",
  color: "#0a0a33",
});

const BestProductsWrapper = styled(Box)(() => ({
  display: "flex",
  // height: "400px",
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
}));

export default BestSeller;
