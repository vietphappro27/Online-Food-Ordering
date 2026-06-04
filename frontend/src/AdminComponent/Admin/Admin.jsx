import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Order from "../Order/Order";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredient from "../Ingredient/Ingredient";
import Event from "../Event/Event";
// import Detail from "../Detail/Detail";
import RestaurantDetail from "./RestaurantDetail";

const Admin = () => {
  const handleClose = () => {
    // Handle drawer close logic here
  };

  return (
    <div>
      <div className='lg:flex justify-between'>
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/order' element={<Order />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredient' element={<Ingredient />} />
            <Route path='/event' element={<Event />} />
            <Route path='/detail' element={<RestaurantDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
