import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../constants/api";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";

const style = {
  position: "absolute",
  top: "42%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  backgroundColor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "12px",
};

function Cookies() {
  const token = window.localStorage.getItem("mp-user-token");
  const [open, setOpen] = useState(true); // Set initial state to true to open modal
  const [cookies, setCookies] = useState();

  const fetchCookies = () => {
    axios
      .get(`${baseUrl}/api/holiday-note`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setCookies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCookies();
    setOpen(true); // Ensure modal opens when component mounts
  }, []);

  return (
    <>
      {cookies?.is_publish ? (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <IconBox>
              {" "}
              <CookieOutlinedIcon
                sx={{ fontSize: "2.4rem", color: "#178F49" }}
              />{" "}
            </IconBox>
            <Heading>Important Note</Heading>
            <Grid container>
              <Grid
                item
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SubHeading sx={{ fontSize: "16px", fontWeight: "400" }}>
                  {cookies?.holiday_note}
                </SubHeading>
              </Grid>
              <Grid
                item
                sm={12}
                md={12}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant="contained"
                  sx={{
                    height: "40px",
                    width: "20%",
                    mt: "23px",
                    borderRadius: "5px",
                    backgroundColor: "#178F49",
                  }}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      ) : null}
    </>
  );
}

const Heading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "800",
  borderBottom: "1px solid #000",
}));

const IconBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

export default Cookies;
