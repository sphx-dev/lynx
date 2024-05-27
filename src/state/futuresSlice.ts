import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradePair } from "../types/futures";
import { RootState } from "./store";
import { mockFutures } from "../constants/mock";

interface FuturesState {
  currentPair: TradePair;
  availableList: TradePair[];
  favorite: string[];
}

const initialState: FuturesState = {
  currentPair: mockFutures[0],
  availableList: mockFutures,
  favorite: [],
};

const futuresSlice = createSlice({
  name: "futures",
  initialState,
  reducers: {
    toggleFavorite: (state, { payload }: PayloadAction<string>) => {
      const itemIndex = state.favorite.findIndex(symbol => symbol === payload);
      if (itemIndex >= 0) {
        state.favorite.splice(itemIndex, 1);
        return;
      }
      state.favorite.push(payload);
      return state;
    },
    setCurrentPair: (state, { payload }: PayloadAction<TradePair>) => {
      state.currentPair = payload;
    },
  },
});

export const selectCurrentPair = (state: RootState): TradePair =>
  state.futures.currentPair;
export const selectFuturesList = (state: RootState) =>
  state.futures.availableList;

export const selectFavoriteSymbols = (state: RootState) =>
  state.futures.favorite;

export const { toggleFavorite, setCurrentPair } = futuresSlice.actions;

export default futuresSlice.reducer;
