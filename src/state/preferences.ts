import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { ThemeName } from "../theme";

export type PreferencesState = {
  currentTheme: ThemeName;
  currency: {
    asset: "USD";
    sign: "$";
    description: "US Dollars";
    name: "USDC";
  };
};

export const PREFERENCES_INITIAL_STATE: PreferencesState = {
  currentTheme: "dark",
  currency: {
    asset: "USD",
    sign: "$",
    description: "US Dollars",
    name: "USDC",
  },
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: PREFERENCES_INITIAL_STATE,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = preferencesSlice.actions;

export default preferencesSlice.reducer;

export const selectCurrentTheme = (state: RootState) =>
  state.preferences.currentTheme;

export const selectPreferredCurrency = (state: RootState) =>
  state.preferences.currency;
