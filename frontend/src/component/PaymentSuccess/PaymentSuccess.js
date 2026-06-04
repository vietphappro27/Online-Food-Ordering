import React from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
    <Card  className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
          <TaskAltIcon sx={{fontSize: "5rem", color:"#4CAF50"}}/>
          <h1 className="py-5 text-2xl font-semibold">
            Order Placed Successfully
          </h1>
          <p className="text-gray-500 text-sm text-center px-10">
            Thank you for choosing our restaurant! We are happy to serve you.
          </p>
          <Button onClick={() => navigate("/")} variant="contained" className="py-5" sx={{margin: "2rem 0rem"}} >
            Go To Home
          </Button>
            

        </div>
      </div>
    </Card>
  )
};

export default PaymentSuccess;