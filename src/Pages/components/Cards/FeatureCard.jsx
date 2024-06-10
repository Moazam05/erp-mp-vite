// MUI Components Import
import { Box, Typography } from "@mui/material";

const FeatureCard = ({ sx, icon, title, desc }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      flex={1}
      sx={{ ...sx }}
    >
      <Box>{icon}</Box>
      <Box>
        <Typography fontSize={12}>{title}</Typography>
        <Typography fontSize={10}>{desc}</Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
