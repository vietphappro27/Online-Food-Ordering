import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";
import { api } from "../../config/api";

export const getIngredientsOfRestaurant = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredient/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("getIngredientsOfRestaurant(action):", response.data);
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (error) {
      console.error("getIngredientsOfRestaurant(action):", error);
    }
  };
};

export const createIngredient = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const response = await api.post(`/api/admin/ingredient/item`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Ingredient created successfully:", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error creating ingredient:", error);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.message });
    }
  };
};

export const createIngredientCategory = ({ data, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.post(`/api/admin/ingredient/category`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Ingredient categories created successfully:", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating ingredient categories:", error);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getIngredientCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.get(
        `/api/admin/ingredient/restaurant/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("getIngredientCategory(action):", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("getIngredientCategory(action):", error);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateStockOfIngredient = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.put(
        `/api/admin/ingredient/stock/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("Stock of ingredient updated successfully:", response.data);
      dispatch({ type: UPDATE_STOCK, payload: response.data });
    } catch (error) {
      console.error("Error updating stock of ingredient:", error);
    }
  };
};
