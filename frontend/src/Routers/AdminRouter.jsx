import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponent/Admin/Admin";

export const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/*'
          element={false ? <CreateRestaurantForm /> : <Admin />}
        ></Route>
      </Routes>
    </div>
  );
};
