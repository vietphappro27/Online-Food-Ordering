import axios from "axios";
import {
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType.js";
import { api } from "../../config.js";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      const updatedOrder = response.data;
      console.log("update order status", updatedOrder);
      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.message });
    }
  };
};

export const fetchRestaurantsOrders = ({ restaurantId, orderStatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
      const response = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );

      const orders = response.data;
      console.log("fetch restaurant orders", orders);
      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: orders,
      });
    } catch (error) {
      console.error("Error fetching restaurant orders:", error);
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.message });
    }
  };
};
