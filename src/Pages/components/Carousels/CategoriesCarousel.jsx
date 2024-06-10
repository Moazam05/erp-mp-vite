import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";

// MUIComponents Import
import { Box, Typography } from "@mui/material";

// React Multi Carousel Library Imports
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Components Import
import CategoryCard from "../Cards/CategoryCard";
import { baseUrl } from "../../../constants/api";

// Custom Stylesheet
import "../../styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CategoriesCarousel = () => {
  const token = window.localStorage.getItem("mp-user-token");

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    axios
      .get(`${baseUrl}/api/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setCategory(response.data);
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
    <Container>
      <Typography mb={4} fontWeight={"600"} fontSize={20} textAlign={"center"}>
        Shop With Categories
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : category.length === 0 ? (
        <Typography>No Categories to show!</Typography>
      ) : (
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          centerMode={true}
          containerClass="carousel-container"
          draggable
          focusOnSelect={false}
          infinite={false}
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          swipeable
        >
          {category.map((cat, index) => (
            <CategoryCard
              key={index}
              image={cat.image}
              title={cat.name}
              id={cat.catId}
            />
          ))}
        </Carousel>
      )}
    </Container>
  );
};

// Styled Components

const Container = styled(Box)({
  margin: "40px 0px",
});

export default CategoriesCarousel;
