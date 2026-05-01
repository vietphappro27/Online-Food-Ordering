import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./State/Authentification/Reducer";
import restaurantReducer from "./State/Restaurant/Reducer";
import { thunk } from "redux-thunk";
import menuItemReducer from "./State/Menu/Reducer";
import cartReducer from "./State/Cart/Reducer";
import orderReducer from "./State/Order/Reducer";
import restaurantOrderReducer from "./State/Restaurant Order/Reducer";
import ingredientReducer from "./State/Ingredients/Reducer";

const rooteReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: restaurantOrderReducer,
  ingredient: ingredientReducer,
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
