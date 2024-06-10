import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Loader Import
import { MoonLoader } from "react-spinners";

// MUI Componenets Import
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// Assets Import
import logo from "../../assets/logo.webp";
import BGImage from "../../assets/BGimage2.webp";
import { useTranslation } from "../../contexts/LanguageContext";
import LanguageButton from "./LanguageButton";
import { baseUrl } from "../../constants/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const [navigating, setNavigating] = useState(false);
  const [email, setEmail] = useState("");

  const verifyEmail = () => {
    setNavigating(true);
    axios
      .post(`${baseUrl}/api/auth/forgot`, {
        username: email,
      })
      .then((response) => {
        window.localStorage.setItem("forget-email", email);
        toast.success(response.data.message);
        setTimeout(() => {
          setNavigating(false);
          navigate("/reset-password");
        }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
        console.log("error", err);
        setNavigating(false);
      });
  };

  return (
    <>
      <Wrapper maxWidth={false}>
        <Grid container display={"flex"} justifyContent={"center"}>
          <BGContainer item lg={8.5} md={7} sm={6}></BGContainer>
          <FormContainer item lg={3.5} md={5} sm={6} xs={12}>
            <FormWrapper>
              <LanguageButton />
              <LogoHolder>
                <Logo component="img" image={logo} alt="logo" />
              </LogoHolder>
              <Heading>{translate("register.forget")}</Heading>
              <Text>{translate("register.enter")}</Text>
              <Box py={2}>
                <Input
                  type="email"
                  label={translate("register.email")}
                  fullWidth
                  color="primary"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Button
                sx={{ width: "100%", textTransform: "none" }}
                variant="contained"
                color="secondary"
                onClick={() => verifyEmail()}
              >
                {navigating ? (
                  <>
                    <MoonLoader color="#fff" size={20} />
                  </>
                ) : (
                  translate("register.send")
                )}
              </Button>
            </FormWrapper>
          </FormContainer>
        </Grid>
      </Wrapper>
    </>
  );
}

// Styled Components

const Wrapper = styled(Container)(() => ({
  padding: "0 !important",
  background: `#fff`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const BGContainer = styled(Grid)(() => ({
  background: `url(${BGImage}) center/cover no-repeat`,
  height: "auto",
}));

const FormContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "100vh",
  padding: "0 15px",
  [theme.breakpoints.down("md")]: {
    padding: "36px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  width: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "15px",
  textAlign: "center",
  borderRadius: "10px",
  border: "1px solid #ddd",
  [theme.breakpoints.down("sm")]: {
    width: "260px",
    padding: "20px",
  },
}));

const LogoHolder = styled(Card)(() => ({
  width: "100%",
  border: "none",
  boxShadow: "none",
  textAlign: "center",
}));

const Logo = styled(CardMedia)(() => ({
  width: "auto",
  margin: "0 auto",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "700",
  color: "#2A3342",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#556987",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const Input = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "15px",
}));

export default ForgotPassword;
