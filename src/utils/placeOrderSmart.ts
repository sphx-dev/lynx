import { PRECISION } from "@/constants";

import { OrderSide } from "../../proto-codecs/codegen/sphx/order/order";
import config from "@/config";

export type PlaceMarketOrderSmartParams = {
  marginAccountAddress: string;
  side: OrderSide;
  quantity: number;
  leverage: number;
  marketTicker: string;
};

export type PlaceLimitOrderSmartParams = {
  marginAccountAddress: string;
  side: OrderSide;
  quantity: number;
  price: number;
  leverage: number;
  marketTicker: string;
};

export const placeMarketOrderSmart = async ({
  marginAccountAddress,
  side,
  quantity,
  leverage,
  marketTicker,
}: PlaceMarketOrderSmartParams) => {
  let response = await fetch(
    config.VITE_SMART_API_PROTOCOL +
      "://" +
      config.VITE_SMART_API_HOST +
      ":" +
      config.VITE_SMART_API_PORT +
      "/order/market" +
      "?ticker=" +
      marketTicker +
      "&account_id=" +
      marginAccountAddress,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_buy: side === OrderSide.ORDER_SIDE_BUY ? true : false,
        volume: quantity / PRECISION,
        leverage: leverage,
        order_type: "MARKET",
      }),
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const placeLimitOrderSmart = async ({
  marginAccountAddress,
  side,
  quantity,
  price,
  leverage,
  marketTicker,
}: PlaceLimitOrderSmartParams) => {
  let response = await fetch(
    config.VITE_SMART_API_PROTOCOL +
      "://" +
      config.VITE_SMART_API_HOST +
      ":" +
      config.VITE_SMART_API_PORT +
      "/order/limit" +
      "?ticker=" +
      marketTicker +
      "&account_id=" +
      marginAccountAddress,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_buy: side === OrderSide.ORDER_SIDE_BUY ? true : false,
        price: price / PRECISION,
        volume: quantity / PRECISION,
        leverage: leverage,
        order_type: "LIMIT",
      }),
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};

export const cancelOrderSmart = async ({
  marginAccountAddress,
  number,
}: {
  marginAccountAddress: string;
  number: string;
}) => {
  const response = await fetch(
    config.VITE_SMART_API_PROTOCOL +
      "://" +
      config.VITE_SMART_API_HOST +
      ":" +
      config.VITE_SMART_API_PORT +
      "/order/" +
      marginAccountAddress +
      ":" +
      number,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return { data, status: response.status };
};
