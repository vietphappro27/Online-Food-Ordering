import { data } from "react-router-dom";
import { api } from "../../config/api";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
} from "./ActionType";

export const createOrder = (regData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`/api/order/add`, regData.order, {
        headers: { Authorization: `Bearer ${regData.jwt}` },
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
      console.log("create order", data);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("create order error", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const getUserOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    try {
      const response = await api.get(`/api/order/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("get user orders", response.data);
      dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("get user orders error", error);
      dispatch({ type: GET_USER_ORDERS_FAILURE, payload: error.message });
    }
  };
};
