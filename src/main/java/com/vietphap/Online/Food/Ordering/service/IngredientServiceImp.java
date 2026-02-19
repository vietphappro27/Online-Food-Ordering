package com.vietphap.Online.Food.Ordering.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vietphap.Online.Food.Ordering.model.IngredientCategory;
import com.vietphap.Online.Food.Ordering.model.IngredientItem;
import com.vietphap.Online.Food.Ordering.model.Restaurant;
import com.vietphap.Online.Food.Ordering.repository.IngredientCategoryRepository;
import com.vietphap.Online.Food.Ordering.repository.IngredientItemRepository;

@Service
public class IngredientServiceImp implements IngredientService {

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = new IngredientCategory();
        category.setName(name);
        category.setRestaurant(restaurant);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long ingredientCategoryId) throws Exception {
        Optional<IngredientCategory> category = ingredientCategoryRepository.findById(ingredientCategoryId);
        if (category.isPresent()) {
            return category.get();
        } else {
            throw new Exception("Ingredient category not found with id: " + ingredientCategoryId);
        }
    }

    @Override
    public List<IngredientCategory> findIngredientCategoriesByRestaurantId(Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        List<IngredientCategory> categories = ingredientCategoryRepository.findByRestaurantId(restaurantId);
        return categories;
    }

    @Override
    public IngredientItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId)
            throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);

        IngredientItem item = new IngredientItem();
        item.setRestaurant(restaurant);
        item.setName(ingredientName);
        item.setCategory(category);

        IngredientItem ingredient = ingredientItemRepository.save(item);
        category.getIngredients().add(ingredient);

        return ingredient;
    }

    @Override
    public List<IngredientItem> findRestaurantIngredient(Long restaurantId) throws Exception {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientItem updateStock(Long ingredientItemId) throws Exception {
        Optional<IngredientItem> item = ingredientItemRepository.findById(ingredientItemId);
        if (!item.isPresent()) {
            throw new Exception("Ingredient item not found with id: " + ingredientItemId);
        }

        IngredientItem ingredientItem = item.get();
        ingredientItem.setInStoke(!ingredientItem.isInStoke());
        return ingredientItemRepository.save(ingredientItem);
    }

}
