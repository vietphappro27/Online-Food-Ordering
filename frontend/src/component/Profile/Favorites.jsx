import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
  const { auth } = useSelector((store) => store);
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My favorites</h1>
      <div className='flex flex-wrap gap-1 justify-center'>
        {auth.favorite.map((item, index) => (
          <RestaurantCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
