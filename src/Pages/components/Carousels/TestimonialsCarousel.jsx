import { useEffect, useState } from "react";
import axios from "axios";

// MUI Imports
import { Grid, styled } from "@mui/material";

// Components Import
import TestimonialCard from "../Cards/TestimonialCard";

// Loader Import
import { MoonLoader } from "react-spinners";

// Assets Import
import reviews from "../../../assets/reviews.webp";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";

import { baseUrl } from "../../../constants/api";

function TestimonialsCarousel() {
  const [loading, setLoading] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState([]);

  const fetchTestimonials = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/testimonials`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTestimonialsList(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <Wrapper container>
      <Grid item xl={3} lg={4} md={4} sm={12} xs={12}>
        <img
          src={reviews}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          alt="reviews"
        />
      </Grid>
      <TestimonialsWrapper item xl={9} lg={8} md={8} sm={12} xs={12}>
        {/* <Swiper
          className="mySwiper"
          slidesPerView={2.1}
          spaceBetween={22}
          freeMode={true}
          modules={[FreeMode]}
          breakpoints={{
            0: {
              slidesPerView: 0.7,
            },
            375: {
              slidesPerView: 0.9,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1340: {
              slidesPerView: 2.5,
            },
          }}
        >
          {loading ? (
            <MoonLoader color="#fff" loading={loading} size={20} />
          ) : (
            testimonialsList.length > 0 &&
            testimonialsList?.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))
          )}
        </Swiper> */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {loading ? (
            <MoonLoader color="#fff" loading={loading} size={20} />
          ) : (
            testimonialsList.length > 0 &&
            testimonialsList?.map((testimonial, index) => (
              <SwiperSlide style={{ width: "auto" }} key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </TestimonialsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Grid)({
  width: "100%",
  height: "auto",
  background: "linear-gradient(to right, #178F49, #009444)",
  display: "flex",
  flexDirection: "row",
});

const TestimonialsWrapper = styled(Grid)({
  padding: "20px",
});

export default TestimonialsCarousel;
