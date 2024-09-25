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

  onSuccess: (msg: string) => {};
  onError: (msg: string) => {};
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

  onSuccess: (msg: string) => {};
  onError: (msg: string) => {};
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
  onSuccess,
  onError,
}: PlaceMarketOrderInChainParams) => {
  if (address) {
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
                number: ++orderId,
              },
              accountId: address,
              // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
              side,
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
                number: ++orderId,
              },
              accountId: address,
              // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
              side,
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

    console.log("orderMessage", ordersMessage);

    try {
      const signingClient = await getSigningStargateOrderClient();
      const response = await signingClient?.signAndBroadcast(
        address,
        ordersMessage,
        composeFee(),
        `Market Order ${quantity} leverage:${leverage}x${
          takeProfit && stopLoss ? ` (tp: ${takeProfit}, sl: ${stopLoss})` : ""
        }`
      );
      console.log("TxResponse", response);
      if (response.code === 0) {
        onSuccess("Order placed correctly");
      } else {
        onError(getMessageFromCode(response.code, response?.rawLog));
      }
      return response;
    } catch (err) {
      console.log("ERR", err);
      onError?.("" + err);
    }
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
  onSuccess,
  onError,
}: PlaceLimitOrderInChainParams) => {
  if (!address) {
    console.error("Empty address");
  }
  if (!marginAccountAddress) {
    console.error("Empty marginAccountAddress");
  }
  if (address) {
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
                number: ++orderId,
              },
              accountId: address,
              // Oposit to the original order
              side,
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
                number: ++orderId,
              },
              accountId: address,
              // Oposit to the original order
              side,
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

    console.log("orderMessage", orderMessages);

    try {
      const signingClient = await getSigningStargateOrderClient();
      const response = await signingClient?.signAndBroadcast(
        address,
        orderMessages,
        composeFee(),
        `Limit Order ${quantity} at ${price}USDC  leverage:${leverage}x${
          takeProfit && stopLoss ? ` (tp: ${takeProfit}, sl: ${stopLoss})` : ""
        }`
      );
      console.log("TxResponse", response);
      if (response.code === 0) {
        onSuccess("Order placed correctly");
      } else {
        onError(getMessageFromCode(response.code, response?.rawLog));
      }

      return response;
    } catch (err) {
      console.log("ERR", err);
      onError?.("" + err);
    }
  }
};

const getMessageFromCode = (code: number, rawLog = ""): string => {
  // TODO: move this to translations
  switch (code) {
    case 1:
      if (rawLog.includes("balance")) {
        return "Insufficient balance in margin account to place order";
      }
      if (rawLog.includes("market with id")) {
        return "Selected Market id does not exist";
      }

      return "Internal error";
    case 111222:
      return "111222 error";
    default:
      return "Error placing order. Please try again";
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
  const response = await signingClient?.signAndBroadcast(
    address,
    [message],
    composeFee(),
    memo
  );

  console.log("TxResponse CANCEL", response);

  return response;
};
