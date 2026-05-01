import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const EventCard = () => {
  return (
    <div>
      <Card sx={{ height: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image='https://cdn.pixabay.com/photo/2023/05/27/12/37/noodle-soup-8021417_1280.png'
        />
        <CardContent>
          <Typography variant='h5'>Vietnamese Food</Typography>
          <Typography variant='body2'>50% off on first order</Typography>
          <div className='py-2 space-y-2'>
            <p>{"ha noi"}</p>
            <p className='text-sm text-blue-500'>Mar 9, 2026 12:00 AM</p>
            <p className='text-sm text-red-500'>Mar 10, 2026 12:00 AM</p>
          </div>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};
