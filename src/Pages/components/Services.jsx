import { Container, Grid, Typography, styled } from "@mui/material";

// Assets Import
import shipping from "../../assets/shipping.webp";
import returnData from "../../assets/money.webp";
import secure from "../../assets/secure.webp";
import service from "../../assets/service.webp";
import { useTranslation } from "../../contexts/LanguageContext";

function Services() {
  const { translate } = useTranslation();
  const serviceList = [
    {
      detail: translate("services.delivery"),
      heading: translate("services.fast"),
      image: shipping,
    },
    {
      detail: translate("services.all"),
      heading: translate("services.back"),
      image: returnData,
    },
    {
      detail: translate("services.online"),
      heading: translate("services.easy"),
      image: secure,
    },
    {
      detail: translate("services.any"),
      heading: translate("services.support"),
      image: service,
    },
  ];
  return (
    <Wrapper>
      <Grid container justifyContent="space-between">
        {serviceList.map((service, index) => (
          <ServiceCard item key={index} xs={12} sm={4} md={3} lg={2}>
            <ImgBox>
              <img
                src={service.image}
                style={{ height: "50px", maxWidth: "100%" }}
                alt={service.heading}
              />
            </ImgBox>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bolder",
                color: "#454545",
                textAlign: "center",
              }}
            >
              {service.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                color: "#61676A",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {service.detail}
            </Typography>
          </ServiceCard>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled(Container)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0",
  margin: "40px auto",
  gap: "20px",
});

const ServiceCard = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
});

const ImgBox = styled(Grid)({
  height: "100px",
  width: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: "#e3e2de",
});

export default Services;
