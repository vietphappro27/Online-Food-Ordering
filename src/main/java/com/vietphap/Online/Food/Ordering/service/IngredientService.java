package com.vietphap.Online.Food.Ordering.service;

import java.util.List;

import com.vietphap.Online.Food.Ordering.model.IngredientCategory;
import com.vietphap.Online.Food.Ordering.model.IngredientItem;

public interface IngredientService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

    public IngredientCategory findIngredientCategoryById(Long ingredientCategoryId) throws Exception;

    public List<IngredientCategory> findIngredientCategoriesByRestaurantId(Long restaurantId) throws Exception;

    public IngredientItem createIngredientItem(
            Long restaurantId,
            String ingredientName,
            Long categoryId) throws Exception;

    public List<IngredientItem> findRestaurantIngredient(Long restaurantId) throws Exception;

    public IngredientItem updateStock(Long ingredientItemId) throws Exception;
}