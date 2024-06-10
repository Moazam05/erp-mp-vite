// MUI Components Import
import { Container } from "@mui/material";

// Components Import
import Navbar from "./components/Navbar";
import BannersCarousel from "./components/Carousels/BannersCarousel";
import Partners from "./components/Partners";
import SalesBanner from "./components/SalesBanner";
import BestSeller from "./components/BestSeller";
import CategoryList from "./components/CategoryList";
import TestimonialsCarousel from "./components/Carousels/TestimonialsCarousel";
import Services from "./components/Services";
import Footer from "./components/Footer/Footer";
import Recomendation from "./components/Recomendation";
import DoctorService from "./components/DoctorService";
import Cookies from "./components/Dropdowns/Cookies";

const LandingPage = () => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Navbar />
      <Cookies />
      <BannersCarousel />
      <Partners />
      <BestSeller />
      <Recomendation />
      <SalesBanner />
      <CategoryList />
      <DoctorService />
      <TestimonialsCarousel />
      <Services />
      <Footer />
    </Container>
  );
};

export default LandingPage;
