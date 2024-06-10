// MUI Imports
import { Box, Card, Typography, styled } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function TestimonialCard({ testimonial }) {
  return (
    <Wrapper>
      <FormatQuoteIcon
        sx={{
          fontSize: "3.0rem",
          color: "#178F49",
          position: "absolute",
          right: "5px",
          top: "5px",
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#454545",
          textAlign: "justify",
          fontStyle: "italic",
        }}
      >
        {testimonial?.testimonial}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          position: "absolute",
          left: "5px",
          bottom: "5px",
        }}
      >
        <img
          src={testimonial?.image}
          style={{ height: "35px", width: "35px", borderRadius: "50%" }}
          alt={testimonial?.name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "16px", color: "#454545" }}>
            {testimonial?.name}
          </Typography>
        </Box>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Card)({
  width: "300px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "20px",
  backgroundColor: "#fff",
  cursor: "pointer",
  marginRight: "15px",
  borderBottom: "3px dashed #178F49",
  position: "relative",
});

export default TestimonialCard;
