import React from "react";
import { Dashboard } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/State/Authentification/Action.js";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Order", icon: <ShoppingBagIcon />, path: "/order" },
  { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredient", icon: <FastfoodIcon />, path: "/ingredient" },
  { title: "Event", icon: <EventIcon />, path: "/event" },
  { title: "Detail", icon: <AdminPanelSettingsIcon />, path: "/detail" },
  { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width: 1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
  };
  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor='left'
        sx={{ zIndex: 1 }}
      >
        <div
          className='w-[70vw] lg:w-[20vw] h-screen flex flex-col 
            justify-center text-xl space-y-[1.65rem]'
        >
          {menu.map((item, index) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                key={index}
                className='flex items-center  px-5 gap-5 cursor-pointer'
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {index !== menu.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
