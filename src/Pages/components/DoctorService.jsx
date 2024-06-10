import { styled } from "@mui/material/styles";
// MUI Components Import
import { Box, Container, Typography } from "@mui/material";
import { MoonLoader } from "react-spinners";
import { useTranslation } from "../../contexts/LanguageContext";
import { useGetServicesQuery } from "../../redux/api/serviceCategoryApiSlice";
import ProductCard from "./Cards/ProductCard";

function DoctorService() {
  const { translate } = useTranslation();

  // todo: GET SERVICES API CALL
  const { data: getServices, isLoading } = useGetServicesQuery({});

  return (
    <Wrapper>
      <Heading>{translate("Services")} </Heading>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <MoonLoader color="#000" size={20} />
        </Box>
      ) : (
        <ServiceProductsWrapper>
          {getServices?.results?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              id={product.prodId}
              service={true}
            />
          ))}
        </ServiceProductsWrapper>
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
  padding: "50px 0",
  margin: "30px auto",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "700",
  color: "#0a0a33",
});

const ServiceProductsWrapper = styled(Box)(() => ({
  // display: "flex",
  // flexDirection: "row",
  // justifyContent: "center",
  // gap: "20px",
  // flexWrap: "wrap",
  // width: "100%",
  // height: "auto",
  // overflowX: "hidden",

  // "& > *": {
  //   flex: "0 0 auto",
  //   minWidth: "230px",
  // },
  // "&::-webkit-slider-thumb": {
  //   "-webkit-appearance": "none",
  //   width: "15px",
  //   height: "15px",
  //   border: "1px solid black",
  // },
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

export default DoctorService;
