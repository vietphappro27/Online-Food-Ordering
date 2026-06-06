import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantCategory,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const categories = ["Bun", "Pho", "Com", "Mi", "Banh Mi"];

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const menu = [1, 1, 1, 1, 1, 1];

const RestaurantDetail = () => {
  const [foodType, setFoodType] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { id, city } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value);
    console.log(e.target.value, e.target.name);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  console.log("RestaurantDetail: ", restaurant);

  useEffect(() => {
    dispatch(getRestaurantById({ restaurantId: id, jwt }));
    dispatch(getRestaurantCategory({ restaurantId: id, jwt }));
  }, []);

  useEffect(() => {
    // Khi foodType hoặc selectedCategory thay đổi, gọi lại API với params mới
    const menuParams = {
      restaurantId: id,
      jwt,
      vegetarian: foodType === "vegetarian" ? true : null,
      seasonal: foodType === "seasonal" ? true : null,
      food_category: selectedCategory || null,
    };

    dispatch(getMenuItemsByRestaurantId(menuParams));
  }, [selectedCategory, foodType]);

  return (
    <div className='px-5 lg:px-20'>
      <section>
        <h3 className='text-gray-500 py-2 mt-10'>Home/Restaurant/Detail</h3>
        <div>
          <Grid container spacing={2}>
            <Grid size={12}>
              <img
                className='w-full h-[40vh] object-cover'
                src={restaurant.restaurant?.images[0]}
                alt=''
              />
            </Grid>

            <Grid size={6}>
              <img
                className='w-full h-[40vh] object-cover object-center'
                src={restaurant.restaurant?.images[1]}
                alt=''
              />
            </Grid>
            <Grid size={6}>
              <img
                className='w-full h-[40vh] object-cover object-center'
                src={restaurant.restaurant?.images[2]}
                alt=''
              />
            </Grid>
          </Grid>
        </div>

        <div className='pt-3 pb-5'>
          <h1 className='text-4xl font-semibold'>
            {restaurant.restaurant?.name}
          </h1>
          <p className='text-gray-500 mt-1'>
            {restaurant.restaurant?.description}
          </p>

          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 flex items-center gap-3'>
              <LocationOnIcon />
              <span>Ha Dong, Ha Noi</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <CalendarMonthIcon />
              <span>Mon-Sun: 9:00 AM - 10:00 PM(Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className='pt-[2rem] lg:flex relative'>
        <div className='space-y-10 lg:w-[20%] filter'>
          <div className='box space-y-5 lg:sticky top-28 d'>
            <div>
              <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>

              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup
                  name='food_type'
                  value={foodType || "all"}
                  onChange={handleFilter}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>

              <FormControl className='py-10 space-y-5' component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory}
                  name='food_category'
                  value={selectedCategory}
                >
                  <FormControlLabel value='' control={<Radio />} label='All' />
                  {restaurant.categories?.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='space-y-5 lg:w-[80%] lg:pl-10'>
          {menu.menuItems.map((item) => (
            <MenuCard key={item.id || item.name} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetail;
