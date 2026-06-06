import * as actionTypes from "./ActionType";

const initialState = {
  menuItems: [],
  loading: false,
  error: null,
  search: [],
  message: null,
};

const menuItemReducer = (stats = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MENU_ITEM_REQUEST:
    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.DELETE_MENU_ITEM_REQUEST:
    case actionTypes.SEARCH_MENU_ITEM_REQUEST:
    case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_REQUEST:
      return {
        ...stats,
        loading: true,
        error: null,
        message: null,
      };
    case actionTypes.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...stats,
        loading: false,
        menuItems: [...stats.menuItems, action.payload],
        message: "Menu item created successfully",
      };
    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...stats,
        loading: false,
        menuItems: action.payload,
      };
    case actionTypes.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...stats,
        loading: false,
        menuItems: stats.menuItems.filter(
          (menuItem) => menuItem.id !== action.payload,
        ),
      };

    case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS:
      console.log("updated menu item availability", action.payload);
      return {
        ...stats,
        loading: false,
        menuItems: stats.menuItems.map((menuItem) =>
          menuItem.id === action.payload.id ? action.payload : menuItem,
        ),
      };
    case actionTypes.SEARCH_MENU_ITEM_REQUEST:
      return {
        ...stats,
        loading: true,
        search: action.payload,
      };
    case actionTypes.CREATE_MENU_ITEM_FAILURE:
    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.DELETE_MENU_ITEM_FAILURE:
    case actionTypes.SEARCH_MENU_ITEM_FAILURE:
    case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_FAILURE:
      return {
        ...stats,
        loading: false,
        error: action.payload,
        message: null,
      };
    default:
      return stats;
  }
};

export default menuItemReducer;
