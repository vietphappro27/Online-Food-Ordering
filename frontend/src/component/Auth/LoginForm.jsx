import { Button, TextField, Typography, Alert } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../State/Authentification/Action";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(
      loginUser({
        userData: values,
        navigate,
      }),
    );
    setSubmitting(false);
  };

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Login
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form>
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

            {auth && auth.error && (
              <Alert severity='error' sx={{ mt: 2 }}>
                Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.
              </Alert>
            )}

            <Button
              sx={{ mt: 2, padding: "1rem" }}
              fullWidth
              type='submit'
              variant='contained'
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have an account?
        <Button size='small' onClick={() => navigate("/account/register")}>
          register
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
