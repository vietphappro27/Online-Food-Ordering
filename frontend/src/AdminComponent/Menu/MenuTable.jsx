import React, { useEffect } from "react";
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
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getMenuItemsByRestaurantId } from "../../component/State/Menu/Action";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { deleteFoodAction } from "../../component/State/Menu/Action";

const MenuTable = () => {
  const restaurant = useSelector((state) => state.restaurant);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const restaurantId = restaurant.userRestaurant?.id;

  useEffect(() => {
    if (restaurantId) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId,
          jwt,
        }),
      );
    }
  }, [restaurantId, dispatch, jwt]);

  if (!restaurantId) {
    return null;
  }

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("../add-menu")}
              aria-label='settings'
            >
              <CreateIcon />
            </IconButton>
          }
          title='Menu'
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Image</TableCell>
                <TableCell align='right'>Title</TableCell>
                <TableCell align='right'>Ingredient</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Available</TableCell>
                <TableCell align='right'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    <Avatar src={item?.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align='right'>{item?.name}</TableCell>
                  <TableCell align='right'>
                    {item.ingredients.map((ingredient) => (
                      <Chip label={ingredient.name} />
                    ))}
                  </TableCell>
                  <TableCell align='right'>
                    {item?.price?.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell align='right'>
                    {item.available ? "in_stock" : "out_of_stock"}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton>
                      <DeleteIcon
                        color='primary'
                        onClick={() => handleDeleteFood(item.id)}
                      />
                    </IconButton>
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

export default MenuTable;
