import React, { useState } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun: 9:00 AM - 10:00 PM",
  images: [],
};

const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data ={
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country,
        },
        contact: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: uploadImage? uploadImage: [],
      } 
      console.log("data --- ", data);
    },
  });
  const handleImageChange = async(e) => {
    const file = e.target.files[0]
    setUploadImage(file)
    const image = await uploadImageToCloudinary(file)
    console.log("image --- ", image)
    formik.setFieldValue('images', [...formik.values.images, image])
    setUploadImage(false)
  };
  const handleRemoveImage = (index) => {
    const updateImages =[...formik.values.images]
    updateImages.splice(index,1)
    formik.setFieldValue('images', updateImages)

  };

  return (
    <div className='py-10 px-5 min-h-screen'>
      <div className='w-full max-w-4xl mx-auto'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4 w-full'>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid className='flex flex-wrap gap-5' size={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type='file'
              />
              <label className='relative' htmlFor='fileInput'>
                <span
                  className='w-24 h-24 cursor-pointer flex items-center 
              justify-center p-3 border rounded-md border-gray-600'
                >
                  <AddPhotoAlternateIcon className='text-white' />
                </span>
                {uploadImage && (
                  <div
                    className='absolute left-0 top-0 right-0 
                  bottom-0 w-24 h-24 flex justify-center items-center'
                  >
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative'>
                    <img
                      className='w-24 h-24 object-cover'
                      key={index}
                      src={image}
                      alt=''
                    />
                    <IconButton
                      size='small'
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                value={formik.values.name}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id='description'
                name='description'
                label='Description'
                variant='outlined'
                value={formik.values.description}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='cuisineType'
                name='cuisineType'
                label='Cuisine Type'
                variant='outlined'
                value={formik.values.cuisineType}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='openingHours'
                name='openingHours'
                label='Opening Hours'
                variant='outlined'
                value={formik.values.openingHours}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='streetAddress'
                name='streetAddress'
                label='Street Address'
                variant='outlined'
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='city'
                name='city'
                label='City'
                variant='outlined'
                value={formik.values.city}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='stateProvince'
                name='stateProvince'
                label='State/Province'
                variant='outlined'
                value={formik.values.stateProvince}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id='postalCode'
                name='postalCode'
                label='Postal Code'
                variant='outlined'
                value={formik.values.postalCode}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id='country'
                name='country'
                label='Country'
                variant='outlined'
                value={formik.values.country}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                value={formik.values.email}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='mobile'
                name='mobile'
                label='Mobile'
                variant='outlined'
                value={formik.values.mobile}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='twitter'
                name='twitter'
                label='Twitter'
                variant='outlined'
                value={formik.values.twitter}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='instagram'
                name='instagram'
                label='Instagram'
                variant='outlined'
                value={formik.values.instagram}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <Button className="mt-4" variant="contained" color="primary" 
          type="submit"
          >
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
