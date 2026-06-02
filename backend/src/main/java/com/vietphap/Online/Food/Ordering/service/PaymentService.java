package com.vietphap.Online.Food.Ordering.service;

import com.vietphap.Online.Food.Ordering.model.Order;
import com.vietphap.Online.Food.Ordering.response.PaymentResponse;

public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order) throws Exception;
}
