import { api } from "../../config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST,
  SEARCH_MENU_ITEM_REQUEST,
  GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
  GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
  SEARCH_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  UPDATE_MENU_ITEM_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
  UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
} from "./ActionType";

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post("/api/admin/food/create", menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created menu item", data);
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("create menu item error", error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST });
    try {
      // Tạo object params chỉ chứa các giá trị hợp lệ
      const params = {};
      if (reqData.vegetarian !== undefined && reqData.vegetarian !== null)
        params.vegetarian = reqData.vegetarian;
      if (reqData.noveg !== undefined && reqData.noveg !== null)
        params.noveg = reqData.noveg;
      if (reqData.seasonal !== undefined && reqData.seasonal !== null)
        params.seasonal = reqData.seasonal;
      if (
        reqData.food_category !== undefined &&
        reqData.food_category !== null &&
        reqData.food_category !== ""
      )
        params.food_category = reqData.food_category;

      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}`,
        {
          params,
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        },
      );
      console.log("get menu items by restaurant id", data);
      dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("get menu items by restaurant id error", error);
      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`/api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("searched menu items", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("search menu item error", error);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const updateMenuItemAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("updated menu item availability", data);
      dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("update menu item availability error", error);
      dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE, payload: error });
    }
  };
};

export const deleteFoodAction = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/food/delete/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("deleted menu item", data);
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (error) {
      console.log("delete menu item error", error);
      dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};
