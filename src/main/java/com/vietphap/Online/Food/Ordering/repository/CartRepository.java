package com.vietphap.Online.Food.Ordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vietphap.Online.Food.Ordering.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByCustomerId(Long userId);
}
