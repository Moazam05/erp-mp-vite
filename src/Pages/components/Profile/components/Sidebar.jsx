import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "../../../styles.css";

// MUI Components Import
import { Box, Card } from "@mui/material";

// MUI Icons Import
import InventoryIcon from "@mui/icons-material/DashboardOutlined";
import Settings from "@mui/icons-material/SettingsOutlined";
import Location from "@mui/icons-material/LocationOn";
import AddCard from "@mui/icons-material/AddCard";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useTranslation } from "../../../../contexts/LanguageContext";
import { baseUrl } from "../../../../constants/api";

function Sidebar() {
  const { translate } = useTranslation();
  const token = window.localStorage.getItem("mp-user-token");

  const navigate = useNavigate();
  const location = useLocation();
  const current_loc = location.pathname.split("/").pop();

  const handleLogout = () => {
    axios
      .post(
        `${baseUrl}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        window.localStorage.removeItem("mp-user-token");
        localStorage.removeItem("username");
        navigate("/");
      })
      .catch(() => {
        window.localStorage.removeItem("mp-user-token");
        localStorage.removeItem("username");
        navigate("/");
      });
  };

  return (
    <>
      <SidebarWrapper>
        <SidebarList>
          <SidebarItem
            onClick={() => {
              navigate("");
            }}
            className={current_loc === "profile" && "activeSide"}
          >
            <InventoryIcon sx={{ fontSize: "1rem" }} />
            {translate("sidebar.detail")}
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              navigate("addresses");
            }}
            className={current_loc === "addresses" && "activeSide"}
          >
            <Location sx={{ fontSize: "1rem" }} />
            {translate("sidebar.add")}
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              navigate("order-history");
            }}
            className={current_loc === "order-history" && "activeSide"}
          >
            <InventoryIcon sx={{ fontSize: "1rem" }} />
            {translate("sidebar.order")}
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              navigate("cards");
            }}
            className={current_loc === "cards" && "activeSide"}
          >
            <AddCard sx={{ fontSize: "1rem" }} />
            {translate("sidebar.card")}
          </SidebarItem>
          {/* Wishlist was here */}
          <SidebarItem
            onClick={() => {
              navigate("settings");
            }}
            className={current_loc === "settings" && "activeSide"}
          >
            <Settings sx={{ fontSize: "1rem" }} />
            {translate("sidebar.set")}
          </SidebarItem>
          <SidebarItem onClick={() => handleLogout()}>
            <Logout sx={{ fontSize: "1rem" }} />
            {translate("sidebar.logout")}
          </SidebarItem>
        </SidebarList>
      </SidebarWrapper>
    </>
  );
}

// Styled Components

const SidebarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "250px",
  height: "auto",
  border: "none",
  transition: "all 300ms ease",
  overflow: "auto",
  marginBottom: "20px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "350px",
  },
}));

const SidebarList = styled(Card)(({ theme }) => ({
  width: "90%",
  marginTop: "3.5rem",
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
  // gap: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "85%",
    marginTop: "1.5rem",
    paddingRight: "30px",
  },
}));

const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
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
  [theme.breakpoints.down("sm")]: {
    height: "1.5rem",
    fontSize: "12px",
  },
}));

export default Sidebar;
