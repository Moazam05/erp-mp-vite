import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Formik & Yup Imports
import { useFormik } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

function Register() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      handleSignup(formik.values);
    },
  });
  const [navigating, setNavigating] = useState(false);

  const handleSignup = (formValues) => {
    setNavigating(true);
    axios
      .post(`${baseUrl}/api/auth/register`, {
        name: formValues.name,
        email: formValues.email,
        username: formValues.email,
        phone: formValues.phone,
        user_role: 1,
      })
      .then((response) => {
        console.log("data", response.data);
        toast.success(
          "You must have recieved an email with a password. Please login with that password."
        );
        setTimeout(() => {
          setNavigating(false);
          navigate("/login");
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
              toast.error("Registration Failed! Please try again.");
            }
          } else {
            toast.error(
              err.response.data.message ||
                "Registration Failed! Please try again."
            );
          }
        } else {
          toast.error("An error occurred. Please try again later.");
        }
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
              <Heading>{translate("register.join")}</Heading>
              <Text>{translate("register.start")}</Text>
              <Box py={2}>
                <Input
                  label={translate("register.name")}
                  name="name"
                  fullWidth
                  color="primary"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <Input
                  type="email"
                  name="email"
                  label={translate("register.email")}
                  fullWidth
                  color="primary"
                  placeholder="example@mail.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Input
                  type="number"
                  name="phone"
                  label={translate("register.phone")}
                  fullWidth
                  color="primary"
                  placeholder="+9661234567"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Box>
              <Button
                sx={{ width: "100%", textTransform: "none" }}
                variant="contained"
                color="secondary"
                onClick={() => formik.handleSubmit()}
              >
                {navigating ? (
                  <>
                    <MoonLoader color="#fff" size={20} />
                  </>
                ) : (
                  translate("register.reg")
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
                <Label>{translate("register.already")}</Label>
                <Label
                  sx={{ cursor: "pointer", color: "#009444" }}
                  onClick={() => navigate("/login")}
                >
                  {translate("register.login")}
                </Label>
              </Box>
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

const Logo = styled(CardMedia)(({ theme }) => ({
  width: "auto",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    height: "50px",
  },
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

export default Register;
