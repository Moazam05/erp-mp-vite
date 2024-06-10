import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Link = styled("a")({
  color: "rgba(255,255,255,.8)",
  fontWeight: "300",
  fontSize: 10,
  display: "block",
});

const FooterItem = ({ title, links }) => {
  return (
    <Box padding={"0px 22px"}>
      <Typography mb={2} color={"white"} fontSize={12} fontWeight={"600"}>
        {title}
      </Typography>
      <Box gap={1} display={"flex"} flexDirection={"column"}>
        {links?.map((link) => {
          return <Link key={link.title}>{link.title}</Link>;
        })}
      </Box>
    </Box>
  );
};

export default FooterItem;
