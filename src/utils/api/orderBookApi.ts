import { api } from "../../app/api";
import { OrderBookResponse } from "../../types/orderBook";

export const orderBookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrderBook: build.query<OrderBookResponse, void>({
      query: () => "/orderbook?ticker=BTCUSDT.P",
    }),
  }),
});

export const { useGetOrderBookQuery } = orderBookApi;
