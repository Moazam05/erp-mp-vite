import { useTranslation } from "../contexts/LanguageContext";
import { Box, Container, Typography, styled } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";

function ReturnPolicy() {
  const { getDirection } = useTranslation();
  const { translate } = useTranslation();
  return (
    <>
      <Navbar />
      <Wrapper dir={getDirection()}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Heading>{translate("return.title")}</Heading>
        </Box>
        <DataWrapper>
          <SubHeading>{translate("return.subhead")}</SubHeading>
          <ol>
            <li>
              <DataText>{translate("return.return1")}</DataText>
            </li>
            <li>
              <DataText>{translate("return.return2")}</DataText>
            </li>
            <li>
              <DataText>{translate("return.return3")}</DataText>
            </li>
            <li>
              <DataText>{translate("return.return4")}</DataText>
            </li>
            <li>
              <DataText>{translate("return.return5")}</DataText>
            </li>
          </ol>
        </DataWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

// Styled Components

const Wrapper = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  // alignItems: 'start',
  gap: "30px",
  padding: "50px 20px",
  margin: "30px auto",
}));

const DataWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  gap: "15px",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "800",
  color: "#0a0a33",
});
const DataText = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  color: "#000",
  textAlign: "start",
});
const SubHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "700",
  color: "#000",
});

export default ReturnPolicy;
