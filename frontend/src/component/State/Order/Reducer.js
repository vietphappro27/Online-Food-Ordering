import { GET_USER_FAILURE } from "../Authentification/ActionType";
import {
  GET_USER_NOTIFICATIONS_FAILURE,
  GET_USER_NOTIFICATIONS_REQUEST,
  GET_USER_NOTIFICATIONS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
  orders: [],
  notifications: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        orders: payload,
      };
    case GET_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
