import { getOrderByOrderId, getOrdersByAddress } from "../utils/queryOrders";

import {
  cancelOrderInChain,
  placeLimitOrderInChain,
  PlaceLimitOrderInChainParams,
  placeMarketOrderInChain,
  PlaceMarketOrderInChainParams,
} from "../utils/placeOrder";

import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderId } from "proto-codecs/codegen/sphx/order/order";

const PAGE_SIZE = 10n;

export const useOrders = (
  address: string | undefined,
  page: number,
  status?: OrderStatus
) => {
  const {
    isLoading,
    error,
    data: { orders, totalOrders } = { orders: [], totalOrders: 0 },
  } = useQuery(
    ["orders", address, page, status],
    () => {
      return getOrdersByAddress(
        address!,
        { offset: BigInt(page) * PAGE_SIZE, limit: PAGE_SIZE },
        status
      ).then(response => {
        // console.log("useOrders response", response);
        return {
          orders: response?.orders,
          totalOrders: Number(response?.pagination?.total) || 0,
        };
      });
    },
    {
      enabled: !!address,
      staleTime: 1000 * 60,
    }
  );

  return {
    isLoading,
    error,
    orders,
    totalOrders,
    pageSize: Number(PAGE_SIZE),
  };
};

export const useOrdersById = (orderIds: OrderId[]) => {
  const results = useQueries(
    orderIds.map(orderId => ({
      queryKey: [
        "order",
        orderId.marginAccountAddress,
        orderId.number.toString(),
      ],
      queryFn: async () => {
        const respose = await getOrderByOrderId(orderId);
        console.log("useOrdersById response", respose);
        return respose.order;
      },
      enabled:
        !!orderId && !!orderId?.marginAccountAddress && !!orderId?.number,
      staleTime: 1000 * 60,
    }))
  );

  return results;
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cancelOrderInChain,
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const cancelOrder = (params: {
    address: string;
    orderId: OrderId;
    memo: string;
  }) => {
    console.log("cancelOrder PARAMS", params);

    return mutation.mutateAsync(params, {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    });
  };
  return { cancelOrder };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const placeMarketMutation = useMutation({
    mutationFn: placeMarketOrderInChain,
  });
  const placeMarketOrder = async (params: PlaceMarketOrderInChainParams) => {
    return placeMarketMutation.mutateAsync(params, {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    });
  };

  const placeLimitMutation = useMutation({
    mutationFn: placeLimitOrderInChain,
  });
  const placeLimitOrder = async (params: PlaceLimitOrderInChainParams) => {
    return placeLimitMutation.mutateAsync(params, {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    });
  };

  return {
    placeMarketOrder,
    marketStatus: placeMarketMutation,
    placeLimitOrder,
    limitStatus: placeLimitMutation,
  };
};
