package com.vietphap.Online.Food.Ordering.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vietphap.Online.Food.Ordering.model.Cart;
import com.vietphap.Online.Food.Ordering.model.CartItem;
import com.vietphap.Online.Food.Ordering.model.Food;
import com.vietphap.Online.Food.Ordering.model.User;
import com.vietphap.Online.Food.Ordering.repository.CartItemRepository;
import com.vietphap.Online.Food.Ordering.repository.CartRepository;
import com.vietphap.Online.Food.Ordering.request.AddCartItemRequest;


@Service
public class CartServiceImp implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem item : cart.getItems()) {
            if (item.getFood().getId().equals(food.getId())) {
                if (isSameIngredients(item.getIngredients(), req.getIngredients())) {
                    int newQuantity = item.getQuantity() + req.getQuantity();
                    return updateCartItemQuantity(item.getId(), newQuantity);
                }
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(food.getPrice() * req.getQuantity());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);
        cart.getItems().add(savedCartItem);
        return savedCartItem;
    }

    private boolean isSameIngredients(List<String> list1, List<String> list2) {
        if ((list1 == null || list1.isEmpty()) && (list2 == null || list2.isEmpty())) {
            return true;
        }
        if (list1 == null || list2 == null) {
            return false;
        }
        return list1.size() == list2.size() && list1.containsAll(list2);
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if (!cartItemOptional.isPresent()) {
            throw new Exception("Cart item not found with id: " + cartItemId);
        }
        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice() * quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByCustomerId(user.getId());

        CartItem itemToRemove = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new Exception("Cart item not found with id: " + cartItemId));

        cart.getItems().remove(itemToRemove);
        cartItemRepository.delete(itemToRemove);
        cart.setTotal(calculateCartTotals(cart));
        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {
        Long total = 0L;
        for (CartItem item : cart.getItems()) {
            total += item.getTotalPrice();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> cart = cartRepository.findById(id);

        if (!cart.isPresent()) {
            throw new Exception("Cart not found with id: " + id);
        }
        return cart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setCustomer(user);
        return cartRepository.save(cart);
    }

}
