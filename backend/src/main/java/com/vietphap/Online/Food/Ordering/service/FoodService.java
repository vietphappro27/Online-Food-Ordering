package com.vietphap.Online.Food.Ordering.service;

import java.util.List;

import com.vietphap.Online.Food.Ordering.model.Category;
import com.vietphap.Online.Food.Ordering.model.Food;
import com.vietphap.Online.Food.Ordering.model.Restaurant;
import com.vietphap.Online.Food.Ordering.request.CreateFoodRequest;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category catagory, Restaurant restaurant) throws Exception;

    // public Food updateFood(Long foodId, CreateFoodRequest updateFood) throws
    // Exception;

    public void deleteFood(Long foodId) throws Exception;

    // public List<Food> getAllFood() throws Exception;
    public List<Food> getRestaurantsFood(Long restaurantId,
            boolean isVegetarian,
            boolean isNonveg,
            boolean isSeasonal,
            String foodCategory

    ) throws Exception;

    public List<Food> searchFood(String keyword) throws Exception;

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

}
