package com.vietphap.Online.Food.Ordering.request;

import java.util.List;

import com.vietphap.Online.Food.Ordering.model.Category;
import com.vietphap.Online.Food.Ordering.model.IngredientItem;
import lombok.Data;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private long price;

    private Category category;
    private List<String> images;

    private Long restaurantId;
    private boolean vegetarin;
    private boolean seasonal;
    private List<IngredientItem> ingredients;

}
