import { useEffect, useState } from "react";
import axios from "axios";

// MUI Components Import
import { Container, styled } from "@mui/material";

// Assets Import
import { baseUrl } from "../../../constants/api";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";

const Banner = {
  width: "100%",
  height: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "12px",
  background: "none",
  cursor: "pointer",
  objectFit: "cover",
};

function BannersCarousel() {
  const [banners, setBanners] = useState([]);

  const fetchBanners = () => {
    axios
      .get(`${baseUrl}/api/banners`)
      .then((response) => {
        setBanners(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <Wrapper>
      <Swiper
        className="mySwiper"
        autoHeight="true"
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        speed={1000}
        effect="fade"
      >
        {banners?.map((img, index) => (
          <SwiperSlide key={index} style={Banner}>
            <img
              src={img.image}
              alt="Banner"
              style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

// Styled Components

const Wrapper = styled(Container)({
  margin: "40px auto",
});

export default BannersCarousel;
