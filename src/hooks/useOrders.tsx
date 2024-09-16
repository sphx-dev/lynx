import { useEffect, useState } from "react";
import { create } from "zustand";
import { getOrdersByAddress } from "../utils/queryPositions";
import { ValidatedOrder } from "../../proto-codecs/codegen/sphx/order/validated_order";
import { bigIntMax } from "../utils/bigIntTools";
import {
  placeLimitOrderInChain,
  PlaceLimitOrderInChainParams,
  placeMarketOrderInChain,
  PlaceMarketOrderInChainParams,
} from "../utils/placeOrder";

type OrdersStoreType = {
  orders: ValidatedOrder[];
  setOrders: (orders: ValidatedOrder[]) => void;
};

const useOrdersStore = create<OrdersStoreType>((set, get) => ({
  orders: [],
  setOrders: orders => set({ orders }),
}));

export const useOrders = (owner: string | undefined | null) => {
  const [lastPlacedOrder, setLastPlacedOrder] = useState<number>(Date.now());
  const update = () => {
    setLastPlacedOrder(Date.now());
  };

  const { orders, setOrders } = useOrdersStore();
  const [nextOrderId, setNextOrderId] = useState<bigint | null>(null);

  useEffect(() => {
    if (owner) {
      getOrdersByAddress(owner).then(response => {
        setOrders(response.orders);

        const id =
          response.orders
            .map(order => order?.id?.number || 0n)
            .reduce((a, b) => bigIntMax(a, b), 0n) + 1n;
        setNextOrderId(BigInt(id));
      });
    }
  }, [owner, setOrders, lastPlacedOrder]);

  const placeLimitOrderInChainHook = (o: PlaceLimitOrderInChainParams) => {
    return placeLimitOrderInChain(o).then(response => {
      update();
      return response;
    });
  };

  const placeMarketOrderInChainHook = (o: PlaceMarketOrderInChainParams) => {
    return placeMarketOrderInChain(o).then(response => {
      update();
      return response;
    });
  };

  return {
    orders,
    nextOrderId,
    placeLimitOrderInChain: placeLimitOrderInChainHook,
    placeMarketOrderInChain: placeMarketOrderInChainHook,
    /**
     * Update the orders list
     * This is used to refresh the orders list after placing a new order.
     * It is exposed so it can be used by websockets updates.
     */
    update,
  };
};
