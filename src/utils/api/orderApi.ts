import { api } from "../../app/api";
import {
  LimitOrderMutation,
  LimitOrderResponse,
  OrderMutation,
  OrderResponse,
} from "../../types/order";

const BASE_URL = "/order";
// FIXME temporary hardcoded
const TICKER = "BTCUSDT.P";
export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    placeMarketOrder: build.mutation<OrderResponse, OrderMutation>({
      query: (payload) => ({
        url: `${BASE_URL}/market?ticker=${TICKER}`,
        method: "POST",
        body: { is_buy: payload.isBuy, volume: payload.volume },
      }),
      invalidatesTags: ["user"],
    }),
    placeLimitOrder: build.mutation<LimitOrderResponse, LimitOrderMutation>({
      query: (payload) => ({
        url: `${BASE_URL}/limit?ticker=${TICKER}`,
        method: "POST",
        body: {
          isBuy: payload.isBuy,
          volume: payload.volume,
          price: payload.price,
          leverage: payload.leverage,
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { usePlaceMarketOrderMutation, usePlaceLimitOrderMutation } = orderApi;
