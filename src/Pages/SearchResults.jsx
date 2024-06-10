import { useEffect, useState } from "react";
import axios from "axios";

// MUI Components Import
import { Box, Grid, Typography, styled } from "@mui/material";

// Components Import
import Navbar from "./components/Navbar";
import ProductCard from "./components/Cards/ProductCard";

// Loader Import
import { MoonLoader } from "react-spinners";
import { useParams } from "react-router";

import { baseUrl } from "../constants/api";

function SearchResults() {
  const { query } = useParams();

  const [loading, setLoading] = useState();
  //   const [resultsLoaded, setResultsLoaded] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const searchProducts = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/api/products/search`, {
        search_term: query,
      })
      .then((response) => {
        setSearchResult(response.data);
        // setResultsLoaded(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    searchProducts();
  }, [query]);

  return (
    <>
      <Navbar />
      <Wrapper container my={5}>
        <ProductsWrapper item md={12}>
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MoonLoader color="#000" size={40} />
            </Box>
          ) : searchResult.length === 0 ? (
            <Typography> No products found for this query!</Typography>
          ) : (
            searchResult?.map((product, index) => (
              <ProductCard key={index} product={product} id={product.prodId} />
            ))
          )}
        </ProductsWrapper>
      </Wrapper>
    </>
  );
}

// Styled Componets

const Wrapper = styled(Grid)(() => ({
  margin: "20px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  padding: "0 40px",
}));

const ProductsWrapper = styled(Grid)(() => ({
  width: "100%",
  height: "auto",
  display: "flex",
  marginTop: "20px",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  padding: "0 20px",
}));

export default SearchResults;
