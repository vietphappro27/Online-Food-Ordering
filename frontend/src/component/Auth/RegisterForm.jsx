import { Button, TextField, Typography, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("from values", values);
  };
  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Register
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name='fullname'
            label='Full Name'
            type='text'
            fullWidth
            variant='outlined'
            margin='normal'
          />
          <Field
            as={TextField}
            name='email'
            label='Email'
            type='email'
            fullWidth
            variant='outlined'
            margin='normal'
          />

          <Field
            as={TextField}
            name='password'
            label='Password'
            type='password'
            fullWidth
            variant='outlined'
            margin='normal'
          />

          <Select
            fullWidth
            margin='normal'
            as={Select}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='role'
            // onChange={handleChange}
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
              Restaurant Owner
            </MenuItem>
          </Select>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type='submit'
            variant='contained'
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        If you have an account?
        <Button size='small' onClick={() => navigate("/account/login")}>
          login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
