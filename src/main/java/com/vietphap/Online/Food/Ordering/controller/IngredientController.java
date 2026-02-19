package com.vietphap.Online.Food.Ordering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vietphap.Online.Food.Ordering.model.IngredientCategory;
import com.vietphap.Online.Food.Ordering.model.IngredientItem;
import com.vietphap.Online.Food.Ordering.request.IngredientCategoryRequest;
import com.vietphap.Online.Food.Ordering.request.IngredientItemRequest;
import com.vietphap.Online.Food.Ordering.service.IngredientService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
@RequestMapping("/api/admin/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody IngredientCategoryRequest req) throws Exception {

        IngredientCategory category = ingredientService.createIngredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PostMapping("/item")
    public ResponseEntity<IngredientItem> createIngredientItem(
            @RequestBody IngredientItemRequest req) throws Exception {

        IngredientItem item = ingredientService.createIngredientItem(req.getRestaurantId(), req.getName(),
                req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/stoke/{id}")
    public ResponseEntity<IngredientItem> updateIngredientStock(
            @PathVariable Long id) throws Exception {
        IngredientItem item = ingredientService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientItem>> getRestaurantIngredient(
            @PathVariable Long restaurantId) throws Exception {
        List<IngredientItem> item = ingredientService.findRestaurantIngredient(restaurantId);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/category/{id}")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long id) throws Exception {
        List<IngredientCategory> category = ingredientService.findIngredientCategoriesByRestaurantId(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

}
