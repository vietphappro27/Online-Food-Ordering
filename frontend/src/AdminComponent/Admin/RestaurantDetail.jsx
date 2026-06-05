import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateRestaurantStatus } from "../../component/State/Restaurant/Action";
const RestaurantDetail = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant detail", restaurant);

  const dispatch = useDispatch();

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.userRestaurant?.id,
        jwt: localStorage.getItem("jwt"),
      }),
    );
  };

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.userRestaurant?.name || "Restaurant Name"}
        </h1>
        <div>
          <Button
            color={restaurant.userRestaurant?.open ? "primary" : "error"}
            className='py-[1rem] px-[2rem]'
            variant='contained'
            onClick={handleRestaurantStatus}
            size='large'
          >
            {restaurant.userRestaurant?.open ? "Close" : "Open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title={<span className='text-gray-300'> Restaurant</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.owner?.fullname || "Owner Name"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.name || "Restaurant Name"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.cuisineType || "Cuisine Type"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Open Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.openingHours || "Opening Hours"}
                  </p>
                </div>

                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.open ? (
                      <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>
                        Open
                      </span>
                    ) : (
                      <span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>
                        Close
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title={<span className='text-gray-300'> Address</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Street</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.street || "Street"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Street</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.ward || "Ward"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.city || "City"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Pin Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.address?.pincode || "Pincode"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader
              title={<span className='text-gray-300'> Contact</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.contactInformation?.email ||
                      "Email"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Phone</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.contactInformation?.mobile ||
                      "Phone"}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <p className=' flex text-gray-400 items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href='/'>
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.userRestaurant?.contactInformation
                          ?.instagram || "/"
                      }
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href='/'>
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.userRestaurant?.contactInformation
                          ?.twitter || "/"
                      }
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetail;
