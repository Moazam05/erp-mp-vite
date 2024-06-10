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
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Assets Import
import logo from "../../assets/logo.webp";
import BGImage from "../../assets/BGimage2.webp";
import { useTranslation } from "../../contexts/LanguageContext";
import LanguageButton from "./LanguageButton";
import { baseUrl } from "../../constants/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigating, setNavigating] = useState(false);
  const { translate } = useTranslation();

  const handleSignin = () => {
    setNavigating(true);
    axios
      .post(`${baseUrl}/api/auth/login`, {
        username: email,
        password: password,
      })
      .then((response) => {
        const { token, fullname } = response.data;
        window.localStorage.setItem("mp-user-token", token);
        window.localStorage.setItem("username", fullname);
        toast.success("Successfully Logged In!");
        setTimeout(() => {
          setNavigating(false);
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            const errorMessages = [];
            for (const key in err.response.data) {
              if (Array.isArray(err.response.data[key])) {
                errorMessages.push(...err.response.data[key]);
              }
            }
            if (errorMessages.length > 0) {
              toast.error(errorMessages.join("\n"));
            } else {
              toast.error("Login Failed! Please try again.");
            }
          } else {
            toast.error(
              err.response.data.message || "Login Failed! Please try again."
            );
          }
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        setNavigating(false);
      });
  };

  return (
    <Wrapper maxWidth={false}>
      <Grid container display={"flex"} justifyContent={"center"}>
        <BGContainer item lg={8.5} md={7} sm={6}></BGContainer>
        <FormContainer item lg={3.5} md={5} sm={6} xs={12}>
          <FormWrapper>
            <LanguageButton />
            <LogoHolder>
              <Logo component="img" image={logo} alt="logo" />
            </LogoHolder>
            <Heading>{translate("login.signin")}</Heading>
            <Text>{translate("login.today")}</Text>
            <Box py={2}>
              <Input
                type="email"
                label={translate("login.email")}
                fullWidth
                color="primary"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label={translate("login.pass")}
                fullWidth
                color="primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box
              mb={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormControlLabel
                control={
                  <Checkbox size="small" sx={{ padding: "0 0 0 9px" }} />
                }
                label={<Label>{translate("login.me")}</Label>}
              />
              <Label
                sx={{ cursor: "pointer", color: "#009444" }}
                onClick={() => navigate("/forgot-password")}
              >
                {translate("login.your")}
              </Label>
            </Box>
            <Button
              sx={{ width: "100%", textTransform: "none" }}
              variant="contained"
              color="secondary"
              onClick={() => handleSignin()}
            >
              {navigating ? (
                <>
                  <MoonLoader color="#fff" size={20} />
                </>
              ) : (
                translate("login.signin")
              )}
            </Button>
            <Box
              style={{
                padding: "20px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Label>{translate("login.account")}</Label>
              <Label
                sx={{ cursor: "pointer", color: "#009444" }}
                onClick={() => navigate("/register")}
              >
                {translate("login.up")}
              </Label>
            </Box>
          </FormWrapper>
        </FormContainer>
      </Grid>
    </Wrapper>
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

const Label = styled(Typography)(() => ({
  fontSize: "10px",
}));

export default Login;
