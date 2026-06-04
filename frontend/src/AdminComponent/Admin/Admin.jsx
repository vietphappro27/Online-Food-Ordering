import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Order from "../Order/Order";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredient from "../Ingredient/Ingredient";
import Event from "../Event/Event";
import RestaurantDetail from "./RestaurantDetail";
import CreateMenuForm from "../Menu/CreateMenuForm";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const Admin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className='min-h-screen'>
      {/* Mobile Menu Button */}
      {isSmallScreen && (
        <div className='p-3'>
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </div>
      )}

      <div className='flex'>
        <AdminSideBar open={drawerOpen} handleClose={handleClose} />

        <div className={`flex-1 p-4 ${!isSmallScreen ? "ml-[20vw]" : ""}`}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/order' element={<Order />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredient' element={<Ingredient />} />
            <Route path='/event' element={<Event />} />
            <Route path='/detail' element={<RestaurantDetail />} />
            <Route path='/add-menu' element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
