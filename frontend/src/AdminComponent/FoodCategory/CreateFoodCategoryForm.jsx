import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/State/Restaurant/Action";

const CreateFoodCategoryForm = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.userRestaurant?.id,
    };
    dispatch(
      createCategoryAction({ reqData: data, jwt: localStorage.getItem("jwt") }),
    );
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
            name='name'
            label='Category Name'
            variant='outlined'
            value={formData.name}
            onChange={handleInputChange}
          />
          <Button variant='contained' type='submit'>
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
