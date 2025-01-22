import { http, HttpResponse, WebSocketLink, ws } from "msw";

export const tradesWS: WebSocketLink = ws.link(
  "ws://localhost:3010/orderbook/ws"
);

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
  http.get("http://localhost:3010/tradingview/streaming", ({ request }) => {
    const streamingData = `{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"id":"BTCUSDC.P","p":90656.12496276255,"t":1732309200,"f":"t","s":0}
{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}`;
    return HttpResponse.text(streamingData);
  }),
  tradesWS.addEventListener("connection", () => {
    console.log("Websocket Connected to '/orderbook/ws'");
  }),
];
