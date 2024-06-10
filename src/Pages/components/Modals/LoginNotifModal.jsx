import { styled } from "@mui/material/styles";

// MUI Components Import
import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  backgroundColor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
};

function LoginNotifModal({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <IconBox>
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "3.5rem", color: "#C91433" }}
            />
          </IconBox>

          <Heading>Login Required!</Heading>
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
                You need to be logged in to proceed!
              </SubHeading>
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              display={"flex"}
              justifyContent={"center"}
              gap={"15px"}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  height: "40px",
                  width: "40%",
                  mt: "23px",
                  borderRadius: "5px",
                }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                color="secondary"
                sx={{
                  height: "40px",
                  width: "40%",
                  mt: "23px",
                  borderRadius: "5px",
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
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

export default LoginNotifModal;
