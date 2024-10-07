import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3010/orderbook/", ({ request }) => {
    const search = new URL(request.url);
    return HttpResponse.json({
      ticker: search.searchParams.get("ticker"),
      bids: [
        {
          price: 1,
          size: 100,
          total: 100,
        },
        {
          price: 2,
          size: 200,
          total: 200,
        },
      ],
      bid_size: 2,
      asks: [
        {
          price: 3,
          size: 300,
          total: 300,
        },
        {
          price: 4,
          size: 400,
          total: 400,
        },
      ],
      asks_size: 2,
    });
  }),
];
