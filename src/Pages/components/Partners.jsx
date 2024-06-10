// Import Marquee
import Marquee from "react-fast-marquee";

// MUI Components Import
import { Container, Box, styled } from "@mui/material";

// Assets Import
import biokats from "../../assets/biokats.webp";
import burgess from "../../assets/burgess.webp";
import croci from "../../assets/croci.webp";
import flamingo from "../../assets/flamingo.webp";
import garpi from "../../assets/garpi.webp";
import gimbi from "../../assets/gimbi.webp";
import gimborn from "../../assets/gimborn.webp";
import gimcat from "../../assets/gimcat.webp";
import gimdog from "../../assets/gimdog.webp";
import nutram from "../../assets/nutram.webp";
import Vitakraft from "../../assets/Vitakraft.webp";

function Partners() {
  const partners = [
    { image: biokats },
    { image: burgess },
    { image: croci },
    { image: flamingo },
    { image: garpi },
    { image: gimbi },
    { image: gimborn },
    { image: gimcat },
    { image: gimdog },
    { image: nutram },
    { image: Vitakraft },
  ];
  return (
    <Wrapper>
      <Marquee
        container
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "30px",
        }}
      >
        {partners.length > 0 &&
          partners?.map((partner, index) => (
            <ImgBox key={index}>
              <img
                src={partner.image}
                alt={`Partner ${index}`}
                style={{
                  width: "150px",
                  height: "auto",
                  objectFit: "cover",
                  marginRight: "20px",
                }}
              />
            </ImgBox>
          ))}
      </Marquee>
    </Wrapper>
  );
}

const Wrapper = styled(Container)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  height: "150px",
  backgroundColor: "#fff",
  padding: "0 10px",
});

const ImgBox = styled(Box)({
  flex: "0 0 auto",
  maxWidth: "calc(33.33% - 12px)",
  height: "auto",
  paddingLeft: "15px",
});

export default Partners;
