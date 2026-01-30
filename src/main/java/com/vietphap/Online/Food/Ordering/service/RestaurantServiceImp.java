package com.vietphap.Online.Food.Ordering.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vietphap.Online.Food.Ordering.dto.RestaurantDTO;
import com.vietphap.Online.Food.Ordering.model.Address;
import com.vietphap.Online.Food.Ordering.model.Restaurant;
import com.vietphap.Online.Food.Ordering.model.User;
import com.vietphap.Online.Food.Ordering.repository.AddressRepository;
import com.vietphap.Online.Food.Ordering.repository.RestaurantRepository;
import com.vietphap.Online.Food.Ordering.repository.UserRepository;
import com.vietphap.Online.Food.Ordering.request.CreateRestaurantRequest;

import jakarta.persistence.Column;

@Service
public class RestaurantServiceImp implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) throws Exception {

        Address address = addressRepository.save(req.getAddress());
        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest req) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        if (restaurant.getCuisineType() != null) {
            restaurant.setCuisineType(req.getCuisineType());
        }
        if (restaurant.getDescription() != null) {
            restaurant.setDescription(req.getDescription());
        }
        if (restaurant.getName() != null) {
            restaurant.setName(req.getName());
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long id) throws Exception {
        restaurantRepository.deleteById(id);
    }

    @Override
    public List<Restaurant> getAllRestaurant() throws Exception {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {

        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        if (restaurant.isEmpty()) {
            throw new Exception("Restaurant not found with id: " + id);
        }
        return restaurant.get();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) throws Exception {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant getRestaurantsByUserid(Long UserId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(UserId);
        if (restaurant == null) {
            throw new Exception("Restaurant not found with user id: " + UserId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setTitle(restaurant.getName());
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setId(restaurant.getId());
        restaurantDTO.setImages(restaurant.getImages());

        if (user.getFavorites().contains(restaurantDTO)) {
            user.getFavorites().remove(restaurantDTO);
        } else {
            user.getFavorites().add(restaurantDTO);
        }

        userRepository.save(user);
        return restaurantDTO;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }

}
