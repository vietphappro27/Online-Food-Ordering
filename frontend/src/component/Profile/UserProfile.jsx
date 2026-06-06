import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../State/Authentification/Action";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { user } = auth;
  console.log("user", user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div
      className='min-h-[80vh] flex flex-col justify-center items-center 
  text-center '
    >
      <div className='flex flex-col items-center justify-center'>
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className='py-5 text-2xl font-semibold'> {user?.fullname}</h1>
        <p>Email: {user?.email}</p>
        <Button onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
