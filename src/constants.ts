import config from "./config";

// Mobile in in pixels
export const MOBILE_WIDTH: number = 800;

// Order book rows
export const ORDERBOOK_LEVELS: number = 18;

// BASE API URL
export const API_URL: string = config?.VITE_API_URL;

export const BREAK_POINTS = {
  DESKTOP_MIN_WIDTH: 1200,
  TABLET_MIN_WIDTH: 800,
  MOBILE_MIN_WIDTH: 600,
};

export const DENOMUSDC = "uusdc";
