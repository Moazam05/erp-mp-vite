import { styled } from "@mui/system";

// MUI Components Import
import { Box, Typography } from "@mui/material";

const BottomBar = ({ images, partnersData, poweredBy }) => {
  return (
    <Container>
      <IconsDiv>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.image}
            alt="logo"
            style={{ height: "40px", width: "auto" }}
          />
        ))}
      </IconsDiv>

      {poweredBy ? (
        <Typography sx={{ fontSize: "14px" }}>
          Powered by{" "}
          <span style={{ fontWeight: "bolder", cursor: "pointer" }}>
            {poweredBy}.
          </span>{" "}
        </Typography>
      ) : null}

      <ImagesDiv>
        {partnersData?.map((partner, index) => (
          <img
            key={index}
            onClick={() => window.open(partner.link, "_blank")}
            src={partner.icon}
            alt="logo"
            style={{ height: "30px", width: "auto", cursor: "pointer" }}
          />
        ))}
      </ImagesDiv>
    </Container>
  );
};

// Styled Components

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: ".8px solid rgba(255,255,255,0.6)",
  padding: "0 50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "8px",
  },
}));

const IconsDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  gap: "5px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
  },
}));

const ImagesDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  alignItems: "center",
  flex: 1,
  gap: "12px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
    width: "100%",
  },
}));

export default BottomBar;
