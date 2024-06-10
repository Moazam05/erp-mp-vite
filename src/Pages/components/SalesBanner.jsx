import { Container, styled } from "@mui/material";

import saleBanner from "../../assets/CTA.webp";

function SalesBanner() {
  return (
    <Wrapper>
      <img
        src={saleBanner}
        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
        alt="Sales Banner"
      />
    </Wrapper>
  );
}

const Wrapper = styled(Container)({
  // height: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "30px auto",
});

export default SalesBanner;
