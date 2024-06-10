import { useEffect, useState } from "react";

// MUI Components Import
import { styled, Box, Grid, Typography } from "@mui/material";

// Icons Import
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import { baseUrl } from "../../../constants/api";

// Assets Import
import axios from "axios";
import { useTranslation } from "../../../contexts/LanguageContext";
import BottomBar from "./BottomBar";
import FooterSections from "./FooterSections";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#168F48",
  //   background: "linear-gradient(130deg, #45ad70, #54bf80)",
  padding: "0px 20px",
  [theme.breakpoints.down("md")]: {
    padding: "10px",
  },
}));

// const ClinicsLinks = [
//   { label: "Riyadh - Malaz" },
//   { label: "Riyadh - AlYasmin" },
//   { label: "Riyadh - Rahmaniyah" },
//   { label: "Jeddah - AlZahra" },
//   { label: "Jeddah - Setten" },
//   { label: "Jeddah - Al Basateen" },
//   { label: "AlKhobar - Akrabia" },
// ];

// const StoresLinks = [
//   { label: "Riyadh - Malaz" },
//   { label: "Riyadh - AlYasmin" },
//   { label: "Riyadh - Rahmaniyah" },
//   { label: "Jeddah - AlBawadi" },
//   { label: "Jeddah - AlZahra" },
//   { label: "Jeddah - Al Basateen" },
//   { label: "Jeddah - Setten" },
//   { label: "AlKhobar - Akrabia" },
// ];

const Footer = () => {
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();

  const [aboutData, setAboutData] = useState([]);
  const [linksData, setLinksData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [socialsData, setSocialsData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [partnersData, setPartnersData] = useState([]);

  const fetchAboutData = () => {
    axios
      .get(`${baseUrl}/api/footer/about`)
      .then((response) => {
        setAboutData(response.data);
      })
      .catch(() => {});
  };

  const fetchLinksData = () => {
    axios
      .get(`${baseUrl}/api/footer/link`)
      .then((response) => {
        setLinksData(response.data);
      })
      .catch(() => {});
  };

  const fetchContactData = () => {
    axios
      .get(`${baseUrl}/api/footer/contact`)
      .then((response) => {
        setContactData(response.data);
      })
      .catch(() => {});
  };

  const fetchSocialsData = () => {
    axios
      .get(`${baseUrl}/api/footer/social`)
      .then((response) => {
        setSocialsData(response.data);
      })
      .catch(() => {});
  };

  const fetchPaymentsData = () => {
    axios
      .get(`${baseUrl}/api/footer/payment_link`)
      .then((response) => {
        setPaymentsData(response.data);
      })
      .catch(() => {});
  };

  const fetchPartnersData = () => {
    axios
      .get(`${baseUrl}/api/footer/partner`)
      .then((response) => {
        setPartnersData(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchAboutData();
    fetchLinksData();
    fetchContactData();
    fetchSocialsData();
    fetchPaymentsData();
    fetchPartnersData();
  }, []);

  return (
    <>
      <Container dir={getDirection()}>
        <Grid
          container
          padding={"20px 40px 80px 40px"}
          display={"flex"}
          dir={getDirection()}
        >
          <Grid xs={12} lg={2.4} md={4} item dir={getDirection()}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <img
                src={aboutData?.logo}
                alt="logo"
                style={{ height: "80px", width: "auto" }}
              />
              <Typography
                sx={{ fontSize: "1.2rem", fontWeight: "bolder", color: "#fff" }}
              >
                {translate("footer.petosiska")}
              </Typography>
              {aboutData.cr_number !== null ? (
                <Typography
                  sx={{
                    fontSize: "1.0rem",
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                >
                  CR#: {aboutData.cr_number}
                </Typography>
              ) : null}
              <Typography
                sx={{ fontSize: "1.0rem", color: "#fff", width: "85%" }}
              >
                {language === "ar"
                  ? aboutData?.arb_copyright
                  : aboutData?.eng_copyright}
              </Typography>
            </Box>
          </Grid>

          <FooterSections aboutData={aboutData} />
          <Grid xs={12} lg={2.4} md={4} item dir={getDirection()}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              mt={1}
              gap={"4px"}
              alignItems={"start"}
            >
              <Typography
                sx={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff" }}
              >
                {translate("footer.usefullinks")}
              </Typography>
              {linksData?.map((link, index) => (
                <Box key={index}>
                  <a
                    href={link.link}
                    style={{ color: "#fff" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {language === "ar" ? link?.arb_heading : link?.eng_heading}
                  </a>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid xs={12} lg={2.4} md={4} item dir={getDirection()}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              mt={1}
              gap={"8px"}
              alignItems={"start"}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#fff",
                  paddingBottom: "10px",
                }}
              >
                {translate("footer.storeInfomation")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "5px",
                }}
              >
                <LocationIcon sx={{ fontSize: "20px", color: "#fff" }} />
                <Typography
                  sx={{
                    fontSize: "1.0rem",
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                >
                  {language === "ar"
                    ? contactData?.arb_address
                    : contactData?.eng_address}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "5px",
                }}
              >
                <PhoneIcon sx={{ fontSize: "20px", color: "#fff" }} />
                <Typography
                  sx={{
                    fontSize: "1.0rem",
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                >
                  +{contactData?.phone}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "5px",
                }}
              >
                <EmailIcon sx={{ fontSize: "20px", color: "#fff" }} />
                <Typography
                  sx={{
                    fontSize: "1.0rem",
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                >
                  {contactData?.email}
                </Typography>
              </Box>
            </Box>
            <ImageBox my={2}>
              <Text>{translate("footer.ConnectUs")}</Text>
              <ImageWrapper>
                {socialsData?.map((social, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "40px",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={social.icon}
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "5px",
                      }}
                      alt="Product"
                    />
                  </Box>
                ))}
              </ImageWrapper>
            </ImageBox>
          </Grid>
        </Grid>
      </Container>
      <BottomBar
        images={paymentsData}
        partnersData={partnersData}
        poweredBy={aboutData.powered_by}
      />
    </>
  );
};

const Text = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#fff",
  fontWeight: "700",
}));

const ImageBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  height: "auto",
  borderRadius: "15px",
  border: ".5px solid #45ad70",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: "20px",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default Footer;
