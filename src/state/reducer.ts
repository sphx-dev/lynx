import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import preferencesReducer from "./preferences";
import orderBookReducer from "./orderBookSlice";
import { api } from "../app/api";

export const rootReducer = combineReducers({
  account: accountReducer,
  preferences: preferencesReducer,
  orderBook: orderBookReducer,
  [api.reducerPath]: api.reducer,
});
