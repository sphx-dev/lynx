import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { SigningStargateClientOptions, StdFee } from "@cosmjs/stargate";
import { sphx } from "../../../proto-codecs";
import { Registry } from "@cosmjs/proto-signing";
import { registry } from "../../../proto-codecs/codegen/sphx/order/tx.registry";
import { OrderSide, OrderType } from "../../types/order";
import {
  OrderType as OrderTypeProto,
  OrderSide as OrderSideProto,
} from "../../../proto-codecs/codegen/sphx/order/order";
import { getChain } from "../../config";

export type PlaceOrderInChainParams = {
  address: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  orderType: OrderType;
  triggerPrice: bigint;
  leverage: bigint;

  onSuccess: (msg: string) => {};
  onError: (msg: string) => {};
};

export type PlaceMarketOrderInChainParams = {
  address: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  // orderType: OrderType; // Always MARKET
  leverage: bigint;

  onSuccess: (msg: string) => {};
  onError: (msg: string) => {};
};

export type PlaceLimitOrderInChainParams = {
  address: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  // orderType: OrderType; // Always LIMIT
  stopLoss: bigint;
  takeProfit: bigint;
  leverage: bigint;

  onSuccess: (msg: string) => {};
  onError: (msg: string) => {};
};

let ORDERID: bigint = BigInt(1);
function getOrderId() {
  return ORDERID++;
}

export const placeMarketOrderInChain = async ({
  address,
  side,
  quantity,
  price,
  leverage,
  onSuccess,
  onError,
}: PlaceMarketOrderInChainParams) => {
  if (address) {
    const orderMessage = sphx.order.MessageComposer.withTypeUrl.placeOrder({
      user: address,
      order: {
        id: {
          marginAccountAddress: address,
          number: getOrderId(),
        },
        accountId: address,
        // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
        side:
          side === OrderSide.buy
            ? OrderSideProto.ORDER_SIDE_BUY
            : OrderSideProto.ORDER_SIDE_SELL,
        quantity,
        price,
        // Always OrderTypeProto.ORDER_TYPE_MARKET
        orderType: OrderTypeProto.ORDER_TYPE_MARKET,
        triggerPrice: BigInt(0),
        leverage: BigInt(leverage),
        timestamp: BigInt(Math.floor(Date.now() / 1000)),
        /** The market id to which the order belongs e.g. BTCUSDC.P */
        marketId: "BTCUSDC.P",
      },
    });

    console.log("orderMessage", orderMessage);

    try {
      const signingClient = await getSigningStargateClient();
      const response = await signingClient?.signAndBroadcast(
        address,
        [orderMessage],
        getFee(),
        `Market Order ${quantity} at ${price}USDC  leverage:${leverage}x`
      );
      console.log("TxResponse", response);
      if (response.code === 0) {
        onSuccess("Order placed correctly");
      } else {
        onError(getMessageFromCode(response.code));
      }
    } catch (err) {
      console.log("ERR", err);
      onError?.("" + err);
    }
  }
};

export const placeLimitOrderInChain = async ({
  address,
  side,
  quantity,
  price,
  stopLoss,
  takeProfit,
  leverage,
  onSuccess,
  onError,
}: PlaceLimitOrderInChainParams) => {
  if (address) {
    const orderMessages = [
      // Initial order to Buy/Sell
      sphx.order.MessageComposer.withTypeUrl.placeOrder({
        user: address,
        order: {
          id: {
            marginAccountAddress: address,
            number: getOrderId(),
          },
          accountId: address,
          // OrderSide.ORDER_SIDE_BUY or OrderSide.ORDER_SIDE_SELL
          side:
            side === OrderSide.buy
              ? OrderSideProto.ORDER_SIDE_BUY
              : OrderSideProto.ORDER_SIDE_SELL,
          quantity,
          price,
          // Always OrderTypeProto.ORDER_TYPE_LIMIT
          orderType: OrderTypeProto.ORDER_TYPE_LIMIT,
          triggerPrice: BigInt(0),
          leverage: BigInt(leverage),
          timestamp: BigInt(Math.floor(Date.now() / 1000)),
          /** The market id to which the order belongs e.g. BTCUSDC.P */
          marketId: "BTCUSDC.P",
        },
      }),
      // Take profit order
      sphx.order.MessageComposer.withTypeUrl.placeOrder({
        user: address,
        order: {
          id: {
            marginAccountAddress: address,
            number: getOrderId(),
          },
          accountId: address,
          // Oposit to the original order
          side:
            side === OrderSide.buy
              ? OrderSideProto.ORDER_SIDE_SELL
              : OrderSideProto.ORDER_SIDE_BUY,
          quantity,
          price: BigInt(takeProfit),
          // Guaranteed take-profit
          // TODO: replace market for take-profit market. Commented out due error in the chain
          // orderType: OrderTypeProto.ORDER_TYPE_TAKE_PROFIT_MARKET,
          orderType: OrderTypeProto.ORDER_TYPE_MARKET,
          triggerPrice: BigInt(takeProfit),
          leverage: BigInt(leverage),
          timestamp: BigInt(Math.floor(Date.now() / 1000)),
          marketId: "BTCUSDC.P",
        },
      }),
      // Stop loss order
      sphx.order.MessageComposer.withTypeUrl.placeOrder({
        user: address,
        order: {
          id: {
            marginAccountAddress: address,
            number: getOrderId(),
          },
          accountId: address,
          // Oposit to the original order
          side:
            side === OrderSide.buy
              ? OrderSideProto.ORDER_SIDE_SELL
              : OrderSideProto.ORDER_SIDE_BUY,
          quantity,
          price: BigInt(stopLoss),
          // Guaranteed stop-loss
          // TODO: replace market for stop-loss market. Commented out due error in the chain
          // orderType: OrderTypeProto.ORDER_TYPE_STOP_LOSS_MARKET,
          orderType: OrderTypeProto.ORDER_TYPE_MARKET,
          triggerPrice: BigInt(stopLoss),
          leverage: BigInt(leverage),
          timestamp: BigInt(Math.floor(Date.now() / 1000)),
          marketId: "BTCUSDC.P",
        },
      }),
    ];

    console.log("orderMessage", orderMessages);

    try {
      const signingClient = await getSigningStargateClient();
      const response = await signingClient?.signAndBroadcast(
        address,
        orderMessages,
        getFee(),
        `Limit Order ${quantity} at ${price}USDC  leverage:${leverage}x (tp: ${takeProfit}, sl: ${stopLoss})`
      );
      console.log("TxResponse", response);
      if (response.code === 0) {
        onSuccess("Order placed correctly");
      } else {
        onError(getMessageFromCode(response.code));
      }
    } catch (err) {
      console.log("ERR", err);
      onError?.("" + err);
    }
  }
};

const getFee = (): StdFee => {
  const fee = {
    amount: [{ denom: "usdc", amount: "100000" }],
    gas: "200000",
  };
  return fee;
};

export const getSigningStargateClient =
  async (): Promise<SigningStargateClient> => {
    if (window.getOfflineSigner) {
      const offlineSigner = window.getOfflineSigner(getChain().chainId);
      const signingClientOptions: SigningStargateClientOptions = {
        gasPrice: GasPrice.fromString("1usdc"),
        registry: new Registry(registry),
      };

      const signingClient: SigningStargateClient =
        await SigningStargateClient.connectWithSigner(
          getChain().rpc,
          offlineSigner,
          signingClientOptions
        );
      return signingClient;
    } else {
      throw Error('No method "getOfflineSigner" available');
    }
  };

const getMessageFromCode = (code: number): string => {
  // TODO: move this to translations
  switch (code) {
    case 1:
      return "Insufficient balance in margin account to place order";
    case 111222:
      return "111222 error";
    default:
      return "Error placing order. Please try again";
  }
};
