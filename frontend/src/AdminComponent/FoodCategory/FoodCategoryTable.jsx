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
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getRestaurantCategory } from "../../component/State/Restaurant/Action";
import { fetchRestaurantOrders } from "../../component/State/Restaurant Order/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const orders = [1, 1, 1, 1, 1, 1, 1, 1];

const FoodCategoryTable = () => {
  const { category, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurantId = restaurant.userRestaurant?.id;

  useEffect(() => {
    if (!restaurantId) return;

    dispatch(getRestaurantCategory({ jwt, restaurantId }));
    dispatch(fetchRestaurantOrders({ jwt, restaurantId }));
  }, [restaurantId]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label='settings'>
              <CreateIcon />
            </IconButton>
          }
          title='Food Category'
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Id</TableCell>
                <TableCell align='left'>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.id}
                  </TableCell>
                  <TableCell align='left'>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
