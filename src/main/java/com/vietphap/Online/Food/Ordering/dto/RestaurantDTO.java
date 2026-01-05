package com.vietphap.Online.Food.Ordering.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RestaurantDTO {
    private String title;

    @Column(length = 1000)
    private List<String> images;

    private String description;
    private long id;
}
