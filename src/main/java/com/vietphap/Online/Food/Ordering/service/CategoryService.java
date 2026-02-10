package com.vietphap.Online.Food.Ordering.service;

import java.util.List;

import com.vietphap.Online.Food.Ordering.model.Category;

public interface CategoryService {

    public Category createCategory(String name, Long userId) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long restaurantId) throws Exception;

    public Category findCategoryById(Long categoryId) throws Exception;

}
