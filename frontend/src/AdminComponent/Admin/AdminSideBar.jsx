import React from "react";
import { Dashboard } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentification/Action.js";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Order", icon: <ShoppingBagIcon />, path: "/order" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredient", icon: <FastfoodIcon />, path: "/ingredient" },
  { title: "Detail", icon: <AdminPanelSettingsIcon />, path: "/detail" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const AdminSideBar = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
      handleClose?.();
      return;
    }

    navigate(`/admin/restaurant${item.path}`);

    if (isSmallScreen) {
      handleClose?.();
    }
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={isSmallScreen ? open : true}
      onClose={handleClose}
      anchor='left'
      sx={{
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? 250 : "20vw",
          boxSizing: "border-box",
        },
      }}
    >
      <div
        className='
          h-screen
          flex
          flex-col
          justify-center
          text-xl
          space-y-6
        '
      >
        {menu.map((item, index) => (
          <React.Fragment key={item.title}>
            <div
              onClick={() => handleNavigate(item)}
              className='
                flex
                items-center
                px-5
                gap-5
                cursor-pointer
                py-3
              '
            >
              {item.icon}
              <span>{item.title}</span>
            </div>

            {index !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default AdminSideBar;
