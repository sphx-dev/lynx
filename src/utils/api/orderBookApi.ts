import { api } from "../../app/api";
import { OrderBookResponse } from "../../types/orderBook";

export const orderBookApi = api.injectEndpoints({
  endpoints: build => ({
    getOrderBook: build.query<OrderBookResponse, number>({
      query: () => "/orderbook/?ticker=BTCUSDT.P",
      transformResponse: (res: OrderBookResponse, _, records: number) => {
        return {
          ...res,
          bids: res.bids ? res.bids.slice(0, records) : [],
          asks: res.asks ? res.asks.slice(0, records) : [],
        };
      },
    }),
  }),
});

export const { useGetOrderBookQuery } = orderBookApi;
