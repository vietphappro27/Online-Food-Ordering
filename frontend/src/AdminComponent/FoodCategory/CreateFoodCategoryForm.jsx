import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CreateFoodCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });
  const handleSubmit = () => {
    const data = {
      name: formData.name,

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
          Create Food Category
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='categoryName'
            name='categoryName'
            label='Category Name'
            variant='outlined'
            value={formData.name}
            onChange={handleInputChange}
          ></TextField>

          <Button variant='contained' type='submit'>
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
