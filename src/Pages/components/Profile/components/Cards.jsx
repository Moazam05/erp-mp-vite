import { styled } from "@mui/system";

// MUI Components Import
import { Box, Grid, Typography } from "@mui/material";

function Cards() {
  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid item md={12}>
            <Heading>Cards</Heading>
          </Grid>
          <Grid item md={12}>
            <Heading sx={{ padding: "10px 0" }}>
              This page will be live soon.
            </Heading>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const Heading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px ",
}));

export default Cards;
