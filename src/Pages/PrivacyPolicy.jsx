import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { Box, Container, Typography, styled } from "@mui/material";
import { useTranslation } from "../contexts/LanguageContext";

function PrivacyPolicy() {
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
          <Heading>{translate("privacy.title")}</Heading>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000",
            }}
          >
            {translate("privacy.lastUpdate")}
          </Typography>
        </Box>
        <DataWrapper>
          <DataText>{translate("privacy.privacypolicy")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.collectdata-heading")}</SubHeading>
          <DataText>{translate("privacy.collectdata")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.inforSec-heading")}</SubHeading>
          <DataText>{translate("privacy.inforSec")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.inforStorage-heading")}</SubHeading>
          <DataText>{translate("privacy.inforStorage")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.email-heading")}</SubHeading>
          <DataText>{translate("privacy.email")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.cookies-heading")}</SubHeading>
          <DataText>{translate("privacy.cookies")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.webLink-heading")}</SubHeading>
          <DataText>{translate("privacy.webLink")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.personalData-heading")}</SubHeading>
          <DataText>{translate("privacy.personalData")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.contactList-heading")}</SubHeading>
          <DataText>{translate("privacy.contactList")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.Updates-heading")}</SubHeading>
          <DataText>{translate("privacy.Updates")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.Admission-heading")}</SubHeading>
          <DataText>{translate("privacy.Admission")}</DataText>
        </DataWrapper>
        <DataWrapper>
          <SubHeading>{translate("privacy.StoringData-heading")}</SubHeading>
          <DataText>{translate("privacy.StoringData")}</DataText>
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
  gap: "8px",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "800",
  color: "#0a0a33",
});
const DataText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#000",
  textAlign: "start",
});
const SubHeading = styled(Typography)({
  fontSize: "16px",
  fontWeight: "700",
  color: "#000",
});

export default PrivacyPolicy;
