import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface OrderState {
  done: Array<any>;
  order: Object;
  partialOrder: Object;
  quantityProcessed: Number | null;
  status: "idle" | "loading" | "failed";
}

const initialState: OrderState = {
  done: [],
  order: {},
  partialOrder: {},
  quantityProcessed: null,
  status: "idle",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clear: (state) => {
      state.done = [];
      state.order = {};
      state.partialOrder = {};
      state.quantityProcessed = null;
    },
  },
});

export const { clear } = orderSlice.actions;
export const order = (state: RootState) => state.account;
export default orderSlice.reducer;
