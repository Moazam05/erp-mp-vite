import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";

// MUI Components Import
import { Box, Grid, Typography, Button } from "@mui/material";

// Loader Import
import { MoonLoader } from "react-spinners";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components Import
import TextInput from "../../../components/TextInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Assets Import
import uploadImg from "../../../../assets/gallery.png";
import { useTranslation } from "../../../../contexts/LanguageContext";
import { baseUrl } from "../../../../constants/api";

const ProfileDetails = () => {
  const { translate } = useTranslation();

  const token = window.localStorage.getItem("mp-user-token");

  const [updating, setUpdating] = useState(false);

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [fullname, setFullname] = useState("");
  const [phoneNum, setPhoneNum] = useState();
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImg] = useState(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImg(URL.createObjectURL(file));
      console.log(file);
    }
  };

  const fetchUserData = () => {
    axios
      .get(`${baseUrl}/api/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setFullname(response.data.fullname);
        setPhoneNum(response.data.phone_number);
        setEmail(response.data.email);
        setPreviewImg(response.data.profileImage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserData = () => {
    setUpdating(true);
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("phone_number", phoneNum);
    formData.append("email", email);
    if (profileImage !== null) {
      formData.append("profileImage", profileImage);
    }

    axios
      .put(`${baseUrl}/api/auth/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        toast.success("Profile updated successfully!");
        setUpdating(false);
        fetchUserData();
      })
      .catch((err) => {
        toast.error("Profile couldn't be updated!");
        console.log("Error", err);
        setUpdating(false);
      });
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const PasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const NewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const ConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Wrapper>
        <Grid container sx={{ display: "flex", flexDirection: "column" }}>
          <CardHeading>{translate("profiledetail.title")} </CardHeading>
          <ProfileWrapper item md={12}>
            <Grid item md={2.3}>
              <Box
                sx={{
                  width: "140px",
                  height: "130px",
                  backgroundColor: "#CECECE",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <label
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="company-logo"
                >
                  <img
                    src={previewImage || uploadImg}
                    style={{ objectFit: "cover" }}
                    height={"100%"}
                    width={"100%"}
                    alt="profile_picture"
                  />
                </label>
                <input
                  id="company-logo"
                  onChange={handleImageUpload}
                  hidden
                  type="file"
                  accept="image/*"
                />
              </Box>
            </Grid>
            <Grid item md={9.4}>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <TextInput
                  label={translate("profiledetail.full")}
                  size={12}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <TextInput
                  label={translate("profiledetail.phone")}
                  size={12}
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
                <TextInput
                  label={translate("profiledetail.email")}
                  size={12}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box my={2}>
                <Button
                  size="small"
                  style={{
                    textTransform: "none",
                    padding: "7px 24px",
                    width: "auto",
                  }}
                  color="secondary"
                  variant="contained"
                  onClick={() => updateUserData()}
                >
                  {updating ? (
                    <>
                      <MoonLoader color="#fff" size={20} />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            </Grid>
          </ProfileWrapper>
          <CardHeading>{translate("profiledetail.change")}</CardHeading>
          <Grid
            item
            md={12}
            padding={"10px"}
            borderRadius={"10px"}
            border={"1px solid #E4E7E9"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"30px"}
              padding={"10px"}
            >
              <TextField
                label={translate("profiledetail.current")}
                size="small"
                color="success"
                type={showCurrentPassword ? "text" : "password"}
                variant="outlined"
                value={values.currentPassword}
                onChange={handlePasswordChange("currentPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={PasswordVisibility} edge="end">
                        {showCurrentPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label={translate("profiledetail.new")}
                size="small"
                color="success"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                value={values.newPassword}
                onChange={handlePasswordChange("newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={NewPasswordVisibility} edge="end">
                        {showNewPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label={translate("profiledetail.confirm")}
                size="small"
                color="success"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                value={values.confirmPassword}
                onChange={handlePasswordChange("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={ConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box my={2} padding={"10px"}>
              <Button
                size="small"
                style={{
                  textTransform: "none",
                  padding: "7px 24px",
                  width: "auto",
                }}
                color="secondary"
                variant="contained"
                onClick={() => updateUserData()}
              >
                {translate("profiledetail.change")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

// Styled Components

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));
const ProfileWrapper = styled(Grid)(({ theme }) => ({
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #E4E7E9",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px ",
}));

export default ProfileDetails;
