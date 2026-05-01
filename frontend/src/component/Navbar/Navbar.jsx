import { Avatar, Badge, Box, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../State/Authentification/Action";

export const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Lấy lại user profile nếu đã có jwt mà chưa có user
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
    }
  }, [auth.user, dispatch]);

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };
  return (
    <Box
      className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex
    justify-between'
    >
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li
          onClick={() => navigate("/")}
          className='logo font-semibold text-gray-300 text-2xl'
        >
          PhapFood
        </li>
      </div>

      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        <div className=''>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {auth.user?.fullname?.[0]?.toUpperCase() || "U"}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        <div className=''>
          <IconButton onClick={() => navigate("/cart")}>
            <Badge color='primary' badgeContent={cart.cart?.items.length || 0}>
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};
