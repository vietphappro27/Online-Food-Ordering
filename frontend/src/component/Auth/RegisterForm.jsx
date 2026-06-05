import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentification/Action";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
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

          <Field name='role'>
            {({ field }) => (
              <FormControl fullWidth margin='normal'>
                <InputLabel id='role-select-label'>Role</InputLabel>
                <Select
                  {...field}
                  labelId='role-select-label'
                  id='role-select'
                  label='Role'
                >
                  <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                  <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
                    Restaurant Owner
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type='submit'
            variant='contained'
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        If you have an account?
        <Button size='small' onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
