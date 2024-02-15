import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import orderBookReducer from "./orderBookSlice"
import accountReducer from "./accountSlice"
import preferencesReducer from "./preferences"

export const store = configureStore({
  reducer: {
    account: accountReducer,
    preferences: preferencesReducer,
    orderBook: orderBookReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
