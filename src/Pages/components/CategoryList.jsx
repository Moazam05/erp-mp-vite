import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../contexts/LanguageContext";
import axios from "axios";

import { styled, Box, Container, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../constants/api";

// Loader Import
import { MoonLoader } from "react-spinners";

function CategoryList() {
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();

  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState();

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/categories`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      <CatTopbar dir={getDirection()}>
        <Typography
          sx={{ fontSize: "1.4rem", fontWeight: "800", color: "#0a0a33" }}
        >
          {translate("category.budget")}
        </Typography>
      </CatTopbar>

      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
        >
          <MoonLoader color="#000" size={20} />
        </Box>
      ) : (
        <CategoryWrapper>
          {category.map((cat, index) => (
            <CatWrapper
              item
              key={index}
              xs={12}
              sm={4}
              md={2}
              lg={2}
              onClick={() => navigate(`/category/${cat.catId}`)}
            >
              <img
                src={cat.image}
                style={{
                  height: "150px",
                  width: "150px",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
                alt={cat.title}
              />
              <CatTitle>{language === "ar" ? cat.arb_name : cat.name}</CatTitle>
            </CatWrapper>
          ))}
        </CategoryWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Container)(() => ({
  margin: "40px auto",
}));

const CatTopbar = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid #00000029",
}));

const CategoryWrapper = styled(Container)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "20px",
  padding: "30px 0",
  overflowX: "auto",
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const CatWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "cover",
  gap: "8px",
  cursor: "pointer",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  borderRadius: "10px",
  transition: "all 0.1s ease",
  "&:hover": {
    boxShadow: "none",
    outline: "1px solid #2c2c",
  },
}));

const CatTitle = styled(Typography)(() => ({
  fontSize: "1.0rem",
  fontWeight: "bold",
  color: "#000000",
  cursor: "pointer",
  marginBottom: "8px",
}));

export default CategoryList;
