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
import {
  cancelOrderSmart,
  placeLimitOrderSmart,
  PlaceLimitOrderSmartParams,
  placeMarketOrderSmart,
  PlaceMarketOrderSmartParams,
} from "@/utils/placeOrderSmart";

const PAGE_SIZE = 10n;

export const useOrders = (
  address: string | undefined,
  page: number,
  statuses: OrderStatus[]
) => {
  const queryResult = useQuery(
    ["orders", address, page, ...statuses],
    () => {
      return getOrdersByAddress(
        address!,
        { offset: BigInt(page) * PAGE_SIZE, limit: PAGE_SIZE },
        statuses
      ).then(response => {
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

  const { data: { orders, totalOrders } = { orders: [], totalOrders: 0 } } =
    queryResult;

  return {
    ...queryResult,

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
    return mutation.mutateAsync(params, {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    });
  };
  return { cancelOrder };
};

export const useCancelOrderSmart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: cancelOrderSmart,
  });
  const cancelOrder = (params: {
    marginAccountAddress: string;
    number: string;
  }) => {
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

export const useCreateOrderSmart = () => {
  const queryClient = useQueryClient();
  const placeMarketMutation = useMutation({
    mutationFn: placeMarketOrderSmart,
  });
  const placeMarketOrder = async (params: PlaceMarketOrderSmartParams) => {
    return placeMarketMutation.mutateAsync(params, {
      onSettled: () => {
        queryClient.invalidateQueries("orders");
      },
    });
  };

  const placeLimitMutation = useMutation({
    mutationFn: placeLimitOrderSmart,
  });
  const placeLimitOrder = async (params: PlaceLimitOrderSmartParams) => {
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
