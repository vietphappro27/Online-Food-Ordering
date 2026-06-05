import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  street: "",
  ward: "",
  city: "",
  pincode: "",
};

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street Address is required"),
  ward: Yup.string().required("Ward is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const itemTotal = cart.cart?.total || 0;
  const deliveryFee = itemTotal ? 33000 : 0;
  const platformFee = itemTotal ? 2000 : 0;
  const grandTotal = itemTotal + deliveryFee + platformFee;

  const createOrderUsingSelectedAddress = (deliveryAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: deliveryAddress,
      },
    };
    dispatch(createOrder(data));
  };

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullname: auth.user?.fullname,
          street: values.street,
          ward: values.ward,
          city: values.city,
          pincode: values.pincode,
        },
      },
    };
    dispatch(createOrder(data));
    console.log("Form values:", values);
    handleClose();
  };
  return (
    <div>
      <main className='lg:flex justify-between'>
        <section className='lg:r-[30%] space-y-6 lg:min-h-screen pt-10 '>
          {cart.cartItems.map((item, idx) => (
            <CartItem key={idx} item={item} />
          ))}
          <Divider />
          <div className='billDetail px-5 text-sm'>
            <p className='font-extralight py-5'> Bill Detail</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>{itemTotal} VND</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Deliver Fee Total</p>
                <p>{deliveryFee} VND</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Plateform Fee</p>
                <p>{platformFee} VND</p>
              </div>
              <Divider />
            </div>
            <div className='flex justify-between text-gray-400'>
              <p>Total</p>
              <p>{grandTotal} VND</p>
            </div>
          </div>
        </section>
        <Divider orientation='vertical' flexItem />
        <section className='lg:w-[70%] flex justify-self-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>
              Choose Delivery Address
            </h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {auth.user?.addresses?.map((item, idx) => (
                <AddressCard
                  key={idx}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className='flex gap-5 w-64 p-5'>
                <AddLocationAltIcon />
                <div className='space-y-3 text-gray-500'>
                  <h1 className='font-semibold text-lg text-white'>
                    {" "}
                    Add New Address{" "}
                  </h1>

                  <Button
                    variant='outlined'
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name='street'
                    label='Street'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name='ward'
                    label='Ward'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name='city'
                    label='City'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name='pincode'
                    label='Pincode'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
