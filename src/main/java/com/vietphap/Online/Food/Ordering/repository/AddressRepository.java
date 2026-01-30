package com.vietphap.Online.Food.Ordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vietphap.Online.Food.Ordering.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}