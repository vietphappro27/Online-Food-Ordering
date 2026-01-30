package com.vietphap.Online.Food.Ordering.service;

import java.util.List;

import com.vietphap.Online.Food.Ordering.dto.RestaurantDTO;
import com.vietphap.Online.Food.Ordering.model.Restaurant;
import com.vietphap.Online.Food.Ordering.model.User;
import com.vietphap.Online.Food.Ordering.request.CreateRestaurantRequest;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) throws Exception;

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurant() throws Exception;

    public List<Restaurant> searchRestaurant(String keyword) throws Exception;

    public Restaurant findRestaurantById(Long restaurantId) throws Exception;

    public Restaurant getRestaurantsByUserid(Long userId) throws Exception;

    public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception;

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;

}
