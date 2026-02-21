package com.vietphap.Online.Food.Ordering.request;

import com.vietphap.Online.Food.Ordering.model.Address;

import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private Address deliveryAddress;
}
