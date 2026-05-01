import { api } from "../../config/api";
import {
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  FIND_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
} from "./ActionType";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });

    try {
      const response = await api.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("find cart response", response.data);
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("find cart error", error);
      dispatch({ type: FIND_CART_FAILURE, payload: error.message });
    }
  };
};

export const getAllCartItems = (regData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(`/api/carts/${regData.cartId}/items`, {
        headers: {
          Authorization: `Bearer ${regData.token}`,
        },
      });
      dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error.message });
    }
  };
};

export const addItemToCart = (regData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const response = await api.put(`/api/cart/add`, regData.cartItem, {
        headers: {
          Authorization: `Bearer ${regData.token}`,
        },
      });
      console.log("add item to cart response", response.data);
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("add item to cart error", error);
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    }
  };
};

export const updateCartItem = (regData, jwt) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
      const response = await api.put(
        `/api/cart-item/update`,
        regData, // truyền trực tiếp {cartItemId, quantity}
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("update cart item response", response.data);
      dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("update cart item error", error);
      dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
  };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
      const response = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("remove cart item response", response.data);
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
    } catch (error) {
      console.log("remove cart item error", error);
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
  };
};

// export const clearCartAction = () => {
//   return async (dispatch) => {
//     dispatch({ type: CLEAR_CART_REQUEST });
//     try {
//       const response = await api.put(
//         `/api/carts/clear`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         },
//       );
//       console.log("clear cart response", response.data);
//       dispatch({ type: CLEAR_CART_SUCCESS, payload: cartId });
//     } catch (error) {
//       console.log("clear cart error", error);
//       dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
//     }
//   };
// };
