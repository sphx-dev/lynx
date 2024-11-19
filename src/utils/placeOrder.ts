import { PRECISION } from "@/constants";
import { sphx } from "../../proto-codecs";

import {
  OrderType,
  OrderSide,
  OrderId,
} from "../../proto-codecs/codegen/sphx/order/order";
import {
  composeFee,
  getSigningStargateOrderClient,
} from "./SigningStargateClient";

export type PlaceMarketOrderInChainParams = {
  address: string;
  marginAccountAddress: string;
  orderId: bigint;
  side: OrderSide;
  quantity: bigint;
  // price: bigint;
  // orderType: OrderType; // Always MARKET
  stopLoss?: bigint;
  takeProfit?: bigint;
  leverage: bigint;
  marketId: bigint;
};

export type PlaceLimitOrderInChainParams = {
  address: string;
  marginAccountAddress: string;
  orderId: bigint;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  // orderType: OrderType; // Always LIMIT
  stopLoss?: bigint;
  takeProfit?: bigint;
  leverage: bigint;
  marketId: bigint;
};

export const placeMarketOrderInChain = async ({
  address,
  marginAccountAddress,
  orderId,
  side,
  quantity,
  // price,
  stopLoss,
  takeProfit,
  leverage,
  marketId,
}: PlaceMarketOrderInChainParams) => {
  const ordersMessage = composeMarketOrderMessages(
    address,
    marginAccountAddress,
    orderId,
    side,
    quantity,
    leverage,
    marketId,
    takeProfit,
    stopLoss
  );

  try {
    const signingClient = await getSigningStargateOrderClient();
    return await signingClient?.signAndBroadcast(
      address,
      ordersMessage,
      await composeFee(signingClient, address, ordersMessage),
      `Market Order ${Number(quantity) / PRECISION} leverage:${leverage}x${
        takeProfit && stopLoss
          ? ` (tp: ${Number(takeProfit) / PRECISION}, sl: ${
              Number(stopLoss) / PRECISION
            })`
          : ""
      }`
    );
  } catch (err) {
    return Promise.reject(errorPlaceOrder);
  }
};

export const placeLimitOrderInChain = async ({
  address,
  marginAccountAddress,
  orderId,
  side,
  quantity,
  price,
  stopLoss,
  takeProfit,
  leverage,
  marketId,
}: PlaceLimitOrderInChainParams) => {
  const orderMessages = composeLimitOrderMessages({
    address,
    marginAccountAddress,
    orderId,
    side,
    quantity,
    price,
    leverage,
    marketId,
    takeProfit,
    stopLoss,
  });

  const signingClient = await getSigningStargateOrderClient();
  try {
    const response = await signingClient?.signAndBroadcast(
      address,
      orderMessages,
      await composeFee(signingClient, address, orderMessages),
      `Limit Order ${Number(quantity) / PRECISION} at ${
        Number(price) / PRECISION
      }USDC leverage:${leverage}x${
        takeProfit && stopLoss
          ? ` (tp: ${Number(takeProfit) / PRECISION}, sl: ${
              Number(stopLoss) / PRECISION
            })`
          : ""
      }`
    );

    if (response.code !== 0) {
      return Promise.reject(
        getMessageFromCode(response.code, response?.rawLog)
      );
    }

    return response;
  } catch (err) {
    return Promise.reject(errorPlaceOrder);
  }
};

export const cancelOrderInChain = async ({
  address,
  orderId,
  memo,
}: {
  address: string;
  orderId: OrderId;
  memo: string;
}) => {
  const message = sphx.order.MessageComposer.withTypeUrl.cancelOrder({
    user: address,
    orderId,
  });

  const signingClient = await getSigningStargateOrderClient();
  try {
    const response = await signingClient?.signAndBroadcast(
      address,
      [message],
      await composeFee(signingClient, address, [message]),
      memo
    );

    console.log("TxResponse CANCEL", response);

    if (response.code !== 0) {
      return Promise.reject(
        getMessageFromCode(response.code, response?.rawLog)
      );
    }

    return response;
  } catch (err) {
    console.error(err);
    return Promise.reject(errorCancelingOrder);
  }
};

function composeMarketOrderMessages(
  address: string,
  marginAccountAddress: string,
  orderId: bigint,
  side: OrderSide,
  quantity: bigint,
  leverage: bigint,
  marketId: bigint,
  takeProfit: bigint | undefined,
  stopLoss: bigint | undefined
) {
  const ordersMessage = [
    sphx.order.MessageComposer.withTypeUrl.placeOrder({
      user: address,
      order: {
        id: {
          marginAccountAddress: marginAccountAddress,
          number: orderId,
        },
        accountId: address,
        // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
        side,
        quantity,
        price: BigInt(0),
        // Always OrderTypeProto.ORDER_TYPE_MARKET
        orderType: OrderType.ORDER_TYPE_MARKET,
        triggerPrice: BigInt(0),
        leverage,
        timestamp: BigInt(Math.floor(Date.now() / 1000)),
        marketId,
      },
    }),
  ];

  if (takeProfit && stopLoss) {
    ordersMessage.push(
      ...[
        // TAKE PROFIT
        sphx.order.MessageComposer.withTypeUrl.placeOrder({
          user: address,
          order: {
            id: {
              marginAccountAddress: marginAccountAddress,
              number: orderId + 1n,
            },
            accountId: address,
            // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
            side:
              side === OrderSide.ORDER_SIDE_BUY
                ? OrderSide.ORDER_SIDE_SELL
                : OrderSide.ORDER_SIDE_BUY,
            quantity,
            price: BigInt(takeProfit),
            orderType: OrderType.ORDER_TYPE_LIMIT,
            triggerPrice: BigInt(takeProfit),
            leverage,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
            marketId,
          },
        }),
        // STOP LOSS
        sphx.order.MessageComposer.withTypeUrl.placeOrder({
          user: address,
          order: {
            id: {
              marginAccountAddress: marginAccountAddress,
              number: orderId + 2n,
            },
            accountId: address,
            // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
            side:
              side === OrderSide.ORDER_SIDE_BUY
                ? OrderSide.ORDER_SIDE_SELL
                : OrderSide.ORDER_SIDE_BUY,
            quantity,
            price: BigInt(stopLoss),
            orderType: OrderType.ORDER_TYPE_LIMIT,
            triggerPrice: BigInt(stopLoss),
            leverage,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
            marketId,
          },
        }),
      ]
    );
  }
  return ordersMessage;
}

function composeLimitOrderMessages({
  address,
  marginAccountAddress,
  orderId,
  side,
  quantity,
  price,
  leverage,
  marketId,
  takeProfit,
  stopLoss,
}: {
  address: string;
  marginAccountAddress: string;
  orderId: bigint;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  leverage: bigint;
  marketId: bigint;
  takeProfit: bigint | undefined;
  stopLoss: bigint | undefined;
}) {
  const orderMessages = [
    // Initial order to Buy/Sell
    sphx.order.MessageComposer.withTypeUrl.placeOrder({
      user: address,
      order: {
        id: {
          marginAccountAddress: marginAccountAddress,
          number: orderId,
        },
        accountId: address,
        // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
        side,
        quantity,
        price,
        // Always OrderTypeProto.ORDER_TYPE_LIMIT
        orderType: OrderType.ORDER_TYPE_LIMIT,
        triggerPrice: BigInt(0),
        leverage,
        timestamp: BigInt(Math.floor(Date.now() / 1000)),
        marketId,
      },
    }),
  ];

  if (takeProfit && stopLoss) {
    orderMessages.push(
      ...[
        // Take profit order
        sphx.order.MessageComposer.withTypeUrl.placeOrder({
          user: address,
          order: {
            id: {
              marginAccountAddress: marginAccountAddress,
              number: orderId + 1n,
            },
            accountId: address,
            // Oposit to the original order
            side:
              side === OrderSide.ORDER_SIDE_BUY
                ? OrderSide.ORDER_SIDE_SELL
                : OrderSide.ORDER_SIDE_BUY,
            quantity,
            price: BigInt(takeProfit),
            // Guaranteed take-profit
            // TODO: replace market for take-profit market. Commented out due error in the chain
            // orderType: OrderTypeProto.ORDER_TYPE_TAKE_PROFIT_MARKET,
            orderType: OrderType.ORDER_TYPE_LIMIT,
            triggerPrice: BigInt(takeProfit),
            leverage,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
            marketId,
          },
        }),
        // Stop loss order
        sphx.order.MessageComposer.withTypeUrl.placeOrder({
          user: address,
          order: {
            id: {
              marginAccountAddress: marginAccountAddress,
              number: orderId + 2n,
            },
            accountId: address,
            // Oposit to the original order
            side:
              side === OrderSide.ORDER_SIDE_BUY
                ? OrderSide.ORDER_SIDE_SELL
                : OrderSide.ORDER_SIDE_BUY,
            quantity,
            price: BigInt(stopLoss),
            // Guaranteed stop-loss
            // TODO: replace market for stop-loss market. Commented out due error in the chain
            // orderType: OrderTypeProto.ORDER_TYPE_STOP_LOSS_MARKET,
            orderType: OrderType.ORDER_TYPE_LIMIT,
            triggerPrice: BigInt(stopLoss),
            leverage,
            timestamp: BigInt(Math.floor(Date.now() / 1000)),
            marketId,
          },
        }),
      ]
    );
  }
  return orderMessages;
}

const errorCancelingOrder = "Error canceling order. Please try again";
const errorPlaceOrder = "Error placing order. Please try again";

export const getMessageFromCode = (code: number, rawLog = ""): string => {
  // TODO: move this to translations
  console.log("getMessageFromCode", code, rawLog);
  switch (code) {
    case 1:
      if (rawLog.includes("balance")) {
        return "Insufficient balance in margin account to place order";
      }
      if (rawLog.includes("market with id")) {
        return "Selected Market id does not exist";
      }

      return "Internal error";
    case 11:
      return "Out of gas";
    case 1101:
      return "Insufficient Funds: Spendable balance in margin account is less than required amount";
    case 111222:
      return "111222 error";
    default:
      return errorPlaceOrder;
  }
};
