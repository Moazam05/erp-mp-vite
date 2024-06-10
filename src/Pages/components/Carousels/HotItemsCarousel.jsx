// MUI Components Import
import { Box, Typography } from "@mui/material";

// MultiCarousel Library Import
import Carousel from "react-multi-carousel";

// Components Import
import ItemCard from "../Cards/ItemCard";

// Styles File Import
import "../../styles.css";

// Assets Import
import imageOne from "../../../assets/item-image-one.webp";
import imageTwo from "../../../assets/item-image-two.webp";
import imageThree from "../../../assets/item-image-three.webp";
import imageFour from "../../../assets/item-image-four.webp";
import imageFive from "../../../assets/item-image-five.webp";
import imageSix from "../../../assets/item-image-six.webp";
import imageSeven from "../../../assets/item-image-seven.webp";
import imageEight from "../../../assets/item-image-eight.webp";
import imageNine from "../../../assets/item-image-nine.webp";
import imageTen from "../../../assets/item-image-ten.webp";

const cardData = [
  {
    id: 1,
    image: imageOne,
    rating: 4,
    numReviews: 52677,
    title: "Classic Leather Jacket",
    price: 199.99,
    discountedPrice: null,
  },
  {
    id: 2,
    image: imageTwo,
    rating: 4.5,
    numReviews: 74231,
    title: "Smart Home Security Camera",
    price: 89.99,
    discountedPrice: null,
  },
  {
    id: 3,
    image: imageThree,
    rating: 4.2,
    numReviews: 61555,
    title: "Laptop Computer",
    price: 999.99,
    discountedPrice: null,
  },
  {
    id: 4,
    image: imageFour,
    rating: 3.8,
    numReviews: 38942,
    title: "Cordless Drill Kit",
    price: 129.99,
    discountedPrice: null,
  },
  {
    id: 5,
    image: imageFive,
    rating: 4.8,
    numReviews: 95678,
    title: "Designer Sunglasses",
    price: 149.99,
    discountedPrice: null,
  },
  {
    id: 6,
    image: imageSix,
    rating: 4.6,
    numReviews: 82197,
    title: "Bluetooth Speaker",
    price: 79.99,
    discountedPrice: null,
  },
  {
    id: 7,
    image: imageSeven,
    rating: 4.4,
    numReviews: 67432,
    title: "4K Ultra HD Smart TV",
    price: 799.99,
    discountedPrice: null,
  },
  {
    id: 8,
    image: imageEight,
    rating: 4.0,
    numReviews: 49876,
    title: "Power Tools Set",
    price: 299.99,
    discountedPrice: null,
  },
  {
    id: 9,
    image: imageNine,
    rating: 4.7,
    numReviews: 10543,
    title: "Luxury Watch",
    price: 1499.99,
    discountedPrice: null,
  },
  {
    id: 10,
    image: imageTen,
    rating: 4.3,
    numReviews: 63214,
    title: "Wireless Earbuds",
    price: 129.99,
    discountedPrice: null,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 7,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HotItemsCarousel = () => {
  return (
    <Box>
      <Typography mb={2} fontWeight={"600"}>
        Hot Selling Items
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

export default HotItemsCarousel;
