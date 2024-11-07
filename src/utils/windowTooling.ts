import { OrderSide, OrderType } from "proto-codecs/codegen/sphx/order/order";
import { getSigningStargateOrderClient } from "./SigningStargateClient";
import { sphx } from "proto-codecs/codegen";
import { DENOMUSDC } from "@/constants";

declare global {
  interface Window {
    orderList: any[];
    address: string;
    marginAccountAddress: string;
    marketId: bigint;
    initTest: () => void;
  }
}

window.orderList = [];
window.address = "";
window.marginAccountAddress = "";
window.marketId = BigInt(1);

async function initTest() {
  let orderId = 0;
  window.orderList = [];
  for (let i = 1; i < 8; i++) {
    window.orderList.push(
      sphx.order.MessageComposer.withTypeUrl.placeOrder({
        user: window.address,
        order: {
          id: {
            marginAccountAddress: window.marginAccountAddress,
            number: BigInt(Date.now() * 1000 + orderId++),
          },
          accountId: window.address,
          side: OrderSide.ORDER_SIDE_BUY,
          quantity: BigInt(0.002 * 1e6),
          price: BigInt((10 + 0.01 * i) * 1e6),
          orderType: OrderType.ORDER_TYPE_LIMIT,
          triggerPrice: BigInt(0),
          leverage: BigInt(1),
          timestamp: BigInt(Math.floor(Date.now() / 1000)),
          marketId: window.marketId,
        },
      })
    );
  }
  for (let i = 1; i < 8; i++) {
    window.orderList.push(
      sphx.order.MessageComposer.withTypeUrl.placeOrder({
        user: window.address,
        order: {
          id: {
            marginAccountAddress: window.marginAccountAddress,
            number: BigInt(Date.now() * 1000 + orderId++),
          },
          accountId: window.address,
          side: OrderSide.ORDER_SIDE_SELL,
          quantity: BigInt(0.002 * 1e6),
          price: BigInt((11 - 0.01 * i) * 1e6),
          orderType: OrderType.ORDER_TYPE_LIMIT,
          triggerPrice: BigInt(0),
          leverage: BigInt(1),
          timestamp: BigInt(Math.floor(Date.now() / 1000)),
          marketId: window.marketId,
        },
      })
    );
  }

  const signingClient = await getSigningStargateOrderClient();
  console.log("==========>", window.orderList);
  const response = await signingClient?.signAndBroadcast(
    window.address,
    window.orderList,
    {
      amount: [{ denom: DENOMUSDC, amount: "100000" }],
      gas: "50500000",
    },
    `Place Limit Orders`
  );
  console.log(response);
}

window.initTest = initTest;
