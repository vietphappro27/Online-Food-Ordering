import { LOGOUT } from "../Authentification/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CART_ITEM_REQUEST:
    case actionTypes.REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FIND_CART_SUCCESS:
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };
    case actionTypes.ADD_ITEM_TO_CART_SUCCESS: {
      const exists = state.cartItems.some((item) => item.id === action.payload.id);
      const cartItems = exists
        ? state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item,
          )
        : [...state.cartItems, action.payload];
      const total = cartItems.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0,
      );
      return {
        ...state,
        loading: false,
        cartItems,
        cart: state.cart
          ? { ...state.cart, items: cartItems, total }
          : state.cart,
      };
    }
    case actionTypes.UPDATE_CART_ITEM_SUCCESS: {
      const cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
      const total = cartItems.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0,
      );
      return {
        ...state,
        loading: false,
        cartItems,
        cart: state.cart
          ? { ...state.cart, items: cartItems, total }
          : state.cart,
      };
    }
    case actionTypes.REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        cartItems: action.payload.items,
      };
    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CART_ITEM_FAILURE:
    case actionTypes.REMOVE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cart: null,
        cartItems: [],
        success: "logout successfully",
      };
    default:
      return state;
  }
};
export default cartReducer;
