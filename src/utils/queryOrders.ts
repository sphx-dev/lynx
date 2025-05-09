import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import {
  QueryOrderInfoRequest,
  QueryOrdersForAccountRequest,
  QueryPerpPositionsRequest_OrderStatus,
} from "../../proto-codecs/codegen/sphx/order/query";
import { createRPCQueryClient } from "proto-codecs/codegen/sphx/rpc.query";
import { getChain } from "../config";
import { OrderId } from "proto-codecs/codegen/sphx/order/order";

export const getOrdersByAddress = async (
  address: string,
  pagination?: { offset?: bigint; limit?: bigint },
  statuses?: OrderStatus[]
) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request: QueryOrdersForAccountRequest = {
    address: address,
    pagination: {
      /**
       * Only one of offset or key should be set.
       */
      key: Uint8Array.from([]),
      offset: pagination?.offset ?? 0n,
      limit: pagination?.limit ?? 10n,
      countTotal: true,
      reverse: true,
    },
    status: statuses?.map(status =>
      fromOrderStatusToPositionOrderStatus(status)
    ),
  };

  const response = await queryClient.sphx.order.ordersForAccount(request);

  return response;
};

export const getOrderByOrderId = async (orderId: OrderId) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request: QueryOrderInfoRequest = {
    orderId: orderId.marginAccountAddress + ":" + orderId.number.toString(),
  };

  const response = await queryClient.sphx.order.orderInfo(request);

  return response;
};

function fromOrderStatusToPositionOrderStatus(
  status: OrderStatus
): QueryPerpPositionsRequest_OrderStatus {
  switch (status) {
    case OrderStatus.UNRECOGNIZED:
      return QueryPerpPositionsRequest_OrderStatus.UNRECOGNIZED;
    case OrderStatus.ORDER_STATUS_OPEN:
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_OPEN;
    case OrderStatus.ORDER_STATUS_CANCELED:
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_CANCELED;
    case OrderStatus.ORDER_STATUS_FILLED:
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_FILLED;
    case OrderStatus.ORDER_STATUS_EXPIRED:
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_EXPIRED;
    case OrderStatus.ORDER_STATUS_PARTIALLY_FILLED:
      return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_PARTIALLY_FILLED;

    default:
      return undefined as any;
    // return QueryPerpPositionsRequest_OrderStatus.ORDER_STATUS_UNSPECIFIED;
  }
}
