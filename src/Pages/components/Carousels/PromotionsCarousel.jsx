// MUI Components Import
import { Box, Typography } from "@mui/material";

// Multi Carousel Libray Import
import Carousel from "react-multi-carousel";

// Components Import
import ItemCard from "../Cards/ItemCard";

// Styles File Import
import "../../styles.css";

// Assets Import
import imageOne from "../../../assets/item-image-eleven.webp";
import imageTwo from "../../../assets/item-image-twelve.webp";
import imageThree from "../../../assets/item-image-thirteen.webp";
import imageFour from "../../../assets/item-image-fourteen.webp";
import imageFive from "../../../assets/item-image-fifteen.webp";
import imageSix from "../../../assets/item-image-five.webp";

const cardData = [
  {
    id: 1,
    image: imageOne,
    rating: 4.2,
    numReviews: 5314,
    title: "Mens Legacy Black Watch",
    price: 2200.99,
    discountedPrice: 1800,
  },
  {
    id: 2,
    image: imageTwo,
    rating: 4.4,
    numReviews: 120030,
    title: "iPhone 14 Pro Max 256GB",
    price: 5600.0,
    discountedPrice: 5400,
  },
  {
    id: 3,
    image: imageThree,
    rating: 4.4,
    numReviews: 1090,
    title: "Handbag Printed Shopper",
    price: 1800.0,
    discountedPrice: 1500,
  },
  {
    id: 4,
    image: imageFour,
    rating: 4.3,
    numReviews: 880,
    title: "Sports Water Bottle 1.2L ",
    price: 1800.0,
    discountedPrice: 1500,
  },
  {
    id: 5,
    image: imageFive,
    rating: 4.4,
    numReviews: 1029,
    title: "Gucci Bloom EDP 100ml",
    price: 2000.0,
    discountedPrice: 1950,
  },
  {
    id: 6,
    image: imageSix,
    rating: 4,
    numReviews: 1029,
    title: "Designer Sunglasses",
    price: 2400.0,
    discountedPrice: 2100,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 960, min: 464 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const PromotionsCarousel = () => {
  return (
    <Box>
      <Typography mb={2} fontWeight={"600"}>
        Promotions
      </Typography>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="prom-carousel-item"
      >
        {cardData.map((product) => {
          return <ItemCard key={product.id} product={product} />;
        })}
      </Carousel>
    </Box>
  );
};

export default PromotionsCarousel;
