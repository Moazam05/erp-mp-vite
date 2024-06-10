import { styled } from "@mui/material/styles";

// MUI Components Import
import { Box, Stack, Typography } from "@mui/material";

function CategoriesSidebar({ title, data }) {
  console.log("Categories Dropdown", data);

  return (
    <>
      <SidebarWrapper>
        <Typography>{title}</Typography>
        <SidebarList>
          {data.map((item) => (
            <SidebarItem key={item.id}>{item.name}</SidebarItem>
          ))}
        </SidebarList>
      </SidebarWrapper>
    </>
  );
}

// Styled Components

const SidebarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "250px",
  height: "auto",
  background: "#fff",
  border: "none",
  transition: "all 300ms ease",
  overflow: "auto",
}));

const SidebarList = styled(Stack)(() => ({
  width: "90%",
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  borderRadius: "10px",
  padding: "10px",
  position: "relative",
  transition: "all 300ms ease",
  fontSize: "12px",
  fontWeight: "600",
  color: "#000",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    height: "4.5rem",
    fontSize: "12px",
  },
}));

export default CategoriesSidebar;
