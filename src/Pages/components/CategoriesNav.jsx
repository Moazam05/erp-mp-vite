import { useEffect, useState } from "react";

// MUI Components Import
import { styled, Container, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Loader Import
import { MoonLoader } from "react-spinners";
import { useTranslation } from "../../contexts/LanguageContext";

import { baseUrl } from "../../constants/api";

function CategoriesNav() {
  const { getLanguage } = useTranslation();
  const language = getLanguage();

  const navigate = useNavigate();
  const { catId } = useParams();

  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/categories`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Wrapper maxWidth={false}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MoonLoader color="#000" size={20} />
        </Box>
      ) : (
        categories.map((cat, index) => (
          <CatBox
            key={index}
            onClick={() => navigate(`/category/${cat.catId}`)}
            sx={{
              borderBottom: `3px solid ${
                cat.catId === catId ? "#009444" : "transparent"
              }`,
            }}
          >
            {language === "ar" ? (
              <CatName>{cat.arb_name}</CatName>
            ) : (
              <CatName>{cat.name} Supplies</CatName>
            )}
          </CatBox>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Container)({
  border: "1px solid #DDDDDD",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "20px 0",
});

const CatBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  cursor: "pointer",
  paddingBottom: "5px",
});

const CatName = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontSize: "16px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

export default CategoriesNav;
