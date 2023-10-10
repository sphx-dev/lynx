import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "./features-old/counter/counterSlice"
import orderBookReducer from "./orderbook/api"
import accountReducer from "./account/api"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    orderBook: orderBookReducer,
    account: accountReducer,
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
