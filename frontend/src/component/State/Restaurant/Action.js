import { api } from "../../config/api";

import {
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  UPDATE_RESTAUNRANT_STATUS_REQUEST,
  UPDATE_RESTAUNRANT_STATUS_SUCCESS,
  UPDATE_RESTAUNRANT_STATUS_FAILURE,
} from "./ActionType";

export const getAllRestaurantAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};
      const { data } = await api.get("/api/restaurant", config);
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("getAllRestaurantAction(action): ", data);
    } catch (error) {
      console.log("getAllRestaurantAction(action): ", error);
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/restaurant/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        },
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
      console.log("getRestaurantById(action): ", data);
    } catch (error) {
      console.log("getRestaurantById(action): ", error);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
  };
};

export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const res = await api.get("/api/admin/restaurant/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("getRestaurantByUserId(action): ", res.data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("getRestaurantByUserId(action): ", error);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
  };
};

export const createRestaurant = (reqData) => {
  console.log("create restaurant action token: ", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(
        "/api/admin/restaurant/create",
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        },
      );
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("created restaurant", data);
    } catch (error) {
      console.log("create restaurant error", error);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });

    try {
      const res = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
      console.log("updated restaurant", res.data);
    } catch (error) {
      console.log("update restaurant error", error);
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
      const res = await api.delete(`/api/admin/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
      console.log("deleted restaurant", restaurantId);
    } catch (error) {
      console.log("delete restaurant error", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAUNRANT_STATUS_REQUEST });
    try {
      const res = await api.put(
        // `/api/admin/restaurant/${restaurantId}/status`,
        `/api/admin/restaurant/update/status/${restaurantId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("res", res.data);
      dispatch({ type: UPDATE_RESTAUNRANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("update status restaurant error", error);
      dispatch({ type: UPDATE_RESTAUNRANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created category", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("create category error", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("getRestaurantCategory(action): ", res.data);
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("getRestaurantCategory(action): ", error);
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
    }
  };
};
