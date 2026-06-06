import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantOrders,
  updateOrderStatus,
} from "../../component/State/Restaurant Order/Action";
import { useEffect } from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const orderStatus = [
  { label: "PENDING", value: "PENDING" },
  { label: "COMPLETED", value: "COMPLETED" },
  { label: "OUT_FOR_DELIVERY", value: "OUT_FOR_DELIVERY" },
  { label: "DELIVERED", value: "DELIVERED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

const OrderTable = () => {
  const restaurant = useSelector((state) => state.restaurant);
  const restaurantOrder = useSelector((state) => state.restaurantOrder);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const restaurantId = restaurant.userRestaurant?.id;

  useEffect(() => {
    if (restaurantId) {
      dispatch(
        fetchRestaurantOrders({
          restaurantId,
          jwt,
        }),
      );
    }
  }, [restaurantId, dispatch, jwt]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrderStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose();
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title='All Orders' sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align='right'>Image</TableCell>
                <TableCell align='right'>Customer</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Ingredient</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.id}
                  </TableCell>
                  <TableCell align='right'>
                    <AvatarGroup max={3}>
                      {item.items.map((orderItem) => (
                        <Avatar src={orderItem.food?.images?.[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align='right'>{item.customer?.fullname}</TableCell>
                  <TableCell align='right'>
                    {item.totalPrice?.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell align='right'>
                    {item.items.map((orderItem) => (
                      <p>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align='right'>
                    {item.items.map((orderItem) => (
                      <div key={orderItem.id}>
                        {orderItem.ingredients.map((ingre) => (
                          <Chip label={ingre} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align='right'>{item.orderStatus}</TableCell>
                  <TableCell align='right'>
                    <Button
                      id='basic-button'
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup='true'
                      aria-expanded={open}
                      onClick={(e) => handleClick(e, item.id)}
                    >
                      Dashboard
                    </Button>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          onClick={() =>
                            handleUpdateOrderStatus(
                              selectedOrderId,
                              status.value,
                            )
                          }
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrderTable;
