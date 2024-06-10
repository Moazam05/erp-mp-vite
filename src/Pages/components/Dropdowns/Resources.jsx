import { KeyboardArrowDown } from "@mui/icons-material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Resources = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="res-btn"
        aria-controls={open ? "res-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown color="#050038" />}
        style={{ textTransform: "none", color: "#050038" }}
      >
        Resources
      </Button>
      <Menu
        id="res-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "res-btn",
        }}
      >
        <MenuItem onClick={handleClose}>One</MenuItem>
        <MenuItem onClick={handleClose}>Two</MenuItem>
        <MenuItem onClick={handleClose}>Three</MenuItem>
      </Menu>
    </Box>
  );
};

export default Resources;
