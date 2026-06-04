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
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = 2;
      console.log("data --- ", values);
    },
  });
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
    const image = await uploadImageToCloudinary(file);
    console.log("image --- ", image);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };
  const handleRemoveImage = (index) => {
    const updateImages = [...formik.values.images];
    updateImages.splice(index, 1);
    formik.setFieldValue("images", updateImages);
  };

  return (
    <div className='py-10 px-5 min-h-screen'>
      <div className='w-full max-w-4xl mx-auto'>
        <h1 className='font-bold text-2xl text-center py-2'>Add New Menu</h1>
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
            {/* name */}
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
            {/* des */}
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
            {/* price */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <TextField
                fullWidth
                id='price'
                name='price'
                label='Price'
                variant='outlined'
                value={formik.values.price}
                onChange={formik.handleChange}
              ></TextField>
            </Grid>
            {/* category */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formik.values.category}
                  label='Category'
                  onChange={formik.handleChange}
                  name='category'
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* ingredients */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>
                  Ingredients
                </InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  name='ingredients'
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id='select-multiple-chip'
                      label='Ingredients'
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  //   MenuProps={MenuProps}
                >
                  {[1, 2, 3].map((name, index) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* seasional */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Is Seasonal
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='seasonal'
                  value={formik.values.seasonal}
                  label='Is Seasonal'
                  onChange={formik.handleChange}
                  name='seasonal'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* vegetarian */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Is Vegetarian
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='vegetarian'
                  value={formik.values.vegetarian}
                  label='Is Vegetarian'
                  onChange={formik.handleChange}
                  name='vegetarian'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            className='mt-4'
            variant='contained'
            color='primary'
            type='submit'
          >
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
