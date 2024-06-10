import { useTranslation } from "../contexts/LanguageContext";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar";
import map from "../assets/map.png";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function ContactUs() {
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
          <Heading>{translate("contact.title")}</Heading>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <img
                src={map}
                alt="Contact"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Grid>

            <Grid container item xs={12} sm={6} sx={{ paddingTop: "30px" }}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <DataWrapper>
                  <IconWrapper>
                    <CallIcon sx={{ fontSize: "30px" }} />
                  </IconWrapper>
                  <SubHeading>{translate("contact.callcenter")}</SubHeading>
                  <DataText>920035359</DataText>
                </DataWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <DataWrapper>
                  <IconWrapper>
                    <WhatsAppIcon sx={{ fontSize: "30px" }} />
                  </IconWrapper>
                  <SubHeading>{translate("contact.number")}</SubHeading>
                  <DataText>00966115102725</DataText>
                </DataWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <DataWrapper>
                  <IconWrapper>
                    <EmailOutlinedIcon sx={{ fontSize: "30px" }} />
                  </IconWrapper>
                  <SubHeading>{translate("contact.Email")}</SubHeading>
                  <DataText>info@petoasis.com.sa</DataText>
                </DataWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <DataWrapper>
                  <SubHeading>{translate("contact.title")}</SubHeading>
                  <DataText sx={{ textAlign: "center" }}>
                    {translate("contact.help")}
                  </DataText>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "start",
                      gap: "10px",
                    }}
                  >
                    <WhatsAppIcon sx={{ fontSize: "28px" }} />
                    <EmailOutlinedIcon sx={{ fontSize: "28px" }} />
                    <CallIcon sx={{ fontSize: "28px" }} />
                    <LocationOnIcon sx={{ fontSize: "28px" }} />
                  </Box>
                </DataWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
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
  alignItems: "center",
  gap: "10px",
}));
const IconWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #000",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
}));

const Heading = styled(Typography)({
  fontSize: "2.2rem",
  fontWeight: "800",
  color: "#0a0a33",
});
const DataText = styled(Typography)({
  fontSize: "18px",
  color: "#000",
  textAlign: "start",
});
const SubHeading = styled(Typography)({
  fontSize: "22px",
  fontWeight: "700",
  color: "#000",
  textAlign: "center",
});

export default ContactUs;
