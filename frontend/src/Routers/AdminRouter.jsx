import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponent/Admin/Admin";
import { useSelector } from "react-redux";

export const AdminRouter = () => {
  const { auth, restaurant } = useSelector((store) => store);
  const isRestaurantOwner = auth.user?.role === "ROLE_RESTAURANT_OWNER";
  const hasOwnRestaurant =
    !!restaurant.userRestaurant &&
    restaurant.userRestaurant?.owner?.id === auth.user?.id;
  return (
    <div>
      <Routes>
        <Route
          path='/*'
          element={
            isRestaurantOwner ? (
              hasOwnRestaurant ? (
                <Admin />
              ) : (
                <CreateRestaurantForm />
              )
            ) : (
              <Admin />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
};
