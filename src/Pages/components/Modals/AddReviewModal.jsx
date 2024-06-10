import { useState } from "react";
import { styled } from "@mui/material/styles";

// MUI Components Import
import { Modal, Box, Grid, Typography, Button, Rating } from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../constants/api";
import LoginNotifModal from "./LoginNotifModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
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

function AddReviewModal({ open, setOpen, prodId }) {
  //   const [saving, setSaving] = useState(false);
  const [ratings, setRatings] = useState();
  const [comments, setComments] = useState();

  const token = window.localStorage.getItem("mp-user-token");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const addProductRating = () => {
    // setSaving(true);
    axios
      .post(
        `${baseUrl}/api/rating/create`,
        {
          rating: ratings,
          comment: comments,
          prodId: prodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Review added successfully!");
        // setSaving(false);
        setOpen(false);
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Review couldn't be added!");
        // setSaving(false);
      });
  };

  const checkToken = () => {
    if (token === null) {
      setLoginModalOpen(true);
    } else {
      addProductRating();
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <LoginNotifModal open={loginModalOpen} setOpen={setLoginModalOpen} />
          {/* <MainRow>
                        <Heading>Add a review</Heading>
                        <CancelOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />

                    </MainRow>
                    <CartWrapper item md={12}>
                        <ImageWrapper>

                            <ImageBox component='img' image={picture} alt="image" />
                        </ImageWrapper>
                        <Detailbox>
                            <Heading>
                                card heading
                            </Heading>
                            <SubHeading>
                                subhead
                            </SubHeading>
                            <SubHeading sx={{ color: '#E92E67' }}>
                                price
                            </SubHeading>

                        </Detailbox>
                    </CartWrapper> */}

          <ReviewBox>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "start",
                gap: "4px",
              }}
            >
              <Rating
                name="simple-controlled"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
              />
            </Box>
            <Heading>Write a review</Heading>
            <StyledTextarea
              value={comments}
              onChange={(e) => setComments(e.currentTarget.value)}
            />
          </ReviewBox>

          <Grid container>
            <Grid
              item
              sm={12}
              md={12}
              display={"flex"}
              justifyContent={"end"}
              gap={"15px"}
            >
              <BottomButton
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </BottomButton>
              <BottomButton
                onClick={() => checkToken()}
                variant="contained"
                color="secondary"
              >
                Submit
              </BottomButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

const BottomButton = styled(Button)(({ theme }) => ({
  height: "40px",
  width: "20%",
  mt: "23px",
  borderRadius: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "45%",
  },
}));

const Heading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "600",
}));

const ReviewBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
}));

const StyledTextarea = styled("textarea")(() => ({
  background: "#fff",
  borderRadius: "8px",
  fontSize: "16px",
  margin: "8px 0",
  height: "100px",
  width: "100%",
  border: "1px solid #C9CFD2",
}));

export default AddReviewModal;
