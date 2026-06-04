import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CreateIngredientForm = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });
  const handleSubmit = () => {
    const data = {
      name: formData.categoryName,

      restaurantId: {
        id: 1,
      },
    };
    console.log("data --- ", data);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>
          Create Ingredient
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            value={handleInputChange}
            onChange={FormData.name}
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Ingredient Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={formData.ingredientCategoryId}
              label='Ingredient'
              onChange={handleInputChange}
              name='ingredientCategoryId'
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' type='submit'>
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
