import { Container, Typography, styled } from "@mui/material";
import { useTranslation } from "../../contexts/LanguageContext";

function DayDeal() {
  const { translate } = useTranslation();
  return (
    <Wrapper maxWidth={false}>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: "600", color: "#fff" }}>
        {translate("deal.title")}
      </Typography>
    </Wrapper>
  );
}

const Wrapper = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 0",
  margin: "80px 0",
  backgroundColor: "#009444",
});

export default DayDeal;
