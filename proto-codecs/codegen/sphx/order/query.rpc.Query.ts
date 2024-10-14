//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryExecutionAuthorityRequest, QueryExecutionAuthorityResponse, QueryMarketsRequest, QueryMarketsResponse, QueryMarketRequest, QueryMarketResponse, QueryOrdersRequest, QueryOrdersResponse, QueryOrdersForAccountRequest, QueryOrdersForAccountResponse, QueryOrderInfoRequest, QueryOrderInfoResponse, QueryPerpPositionsRequest, QueryPerpPositionsResponse, QueryPerpPositionForAccountRequest, QueryPerpPositionForAccountResponse, QueryPerpPositionRequest, QueryPerpPositionResponse, QuerySpendableBalanceRequest, QuerySpendableBalanceResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  executionAuthority(request?: QueryExecutionAuthorityRequest): Promise<QueryExecutionAuthorityResponse>;
  markets(request?: QueryMarketsRequest): Promise<QueryMarketsResponse>;
  market(request: QueryMarketRequest): Promise<QueryMarketResponse>;
  orders(request?: QueryOrdersRequest): Promise<QueryOrdersResponse>;
  /** Queries orders for a given margin account */
  ordersForAccount(request: QueryOrdersForAccountRequest): Promise<QueryOrdersForAccountResponse>;
  /**
   * rpc ClosedOrdersForAccount(QueryClosedOrdersForAccountRequest) returns (QueryClosedOrdersForAccountResponse) {
   *   option (google.api.http).get = "/sphx/order/closed_orders_for_account/{address}";
   * }
   * Queries order info for a given order_id
   */
  orderInfo(request: QueryOrderInfoRequest): Promise<QueryOrderInfoResponse>;
  /** Queries all perpetual positions */
  perpPositions(request?: QueryPerpPositionsRequest): Promise<QueryPerpPositionsResponse>;
  /** Queries all perpetual positions for a given margin account */
  perpPositionForAccount(request: QueryPerpPositionForAccountRequest): Promise<QueryPerpPositionForAccountResponse>;
  /** Queries a perpetual position for a given position_id */
  perpPosition(request: QueryPerpPositionRequest): Promise<QueryPerpPositionResponse>;
  /** For a given margin account address get its spendable balance */
  spendableBalance(request: QuerySpendableBalanceRequest): Promise<QuerySpendableBalanceResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.executionAuthority = this.executionAuthority.bind(this);
    this.markets = this.markets.bind(this);
    this.market = this.market.bind(this);
    this.orders = this.orders.bind(this);
    this.ordersForAccount = this.ordersForAccount.bind(this);
    this.orderInfo = this.orderInfo.bind(this);
    this.perpPositions = this.perpPositions.bind(this);
    this.perpPositionForAccount = this.perpPositionForAccount.bind(this);
    this.perpPosition = this.perpPosition.bind(this);
    this.spendableBalance = this.spendableBalance.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  executionAuthority(request: QueryExecutionAuthorityRequest = {}): Promise<QueryExecutionAuthorityResponse> {
    const data = QueryExecutionAuthorityRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "ExecutionAuthority", data);
    return promise.then(data => QueryExecutionAuthorityResponse.decode(new BinaryReader(data)));
  }
  markets(request: QueryMarketsRequest = {
    pagination: undefined
  }): Promise<QueryMarketsResponse> {
    const data = QueryMarketsRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "Markets", data);
    return promise.then(data => QueryMarketsResponse.decode(new BinaryReader(data)));
  }
  market(request: QueryMarketRequest): Promise<QueryMarketResponse> {
    const data = QueryMarketRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "Market", data);
    return promise.then(data => QueryMarketResponse.decode(new BinaryReader(data)));
  }
  orders(request: QueryOrdersRequest = {
    pagination: undefined
  }): Promise<QueryOrdersResponse> {
    const data = QueryOrdersRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "Orders", data);
    return promise.then(data => QueryOrdersResponse.decode(new BinaryReader(data)));
  }
  ordersForAccount(request: QueryOrdersForAccountRequest): Promise<QueryOrdersForAccountResponse> {
    const data = QueryOrdersForAccountRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "OrdersForAccount", data);
    return promise.then(data => QueryOrdersForAccountResponse.decode(new BinaryReader(data)));
  }
  orderInfo(request: QueryOrderInfoRequest): Promise<QueryOrderInfoResponse> {
    const data = QueryOrderInfoRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "OrderInfo", data);
    return promise.then(data => QueryOrderInfoResponse.decode(new BinaryReader(data)));
  }
  perpPositions(request: QueryPerpPositionsRequest = {
    pagination: undefined
  }): Promise<QueryPerpPositionsResponse> {
    const data = QueryPerpPositionsRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "PerpPositions", data);
    return promise.then(data => QueryPerpPositionsResponse.decode(new BinaryReader(data)));
  }
  perpPositionForAccount(request: QueryPerpPositionForAccountRequest): Promise<QueryPerpPositionForAccountResponse> {
    const data = QueryPerpPositionForAccountRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "PerpPositionForAccount", data);
    return promise.then(data => QueryPerpPositionForAccountResponse.decode(new BinaryReader(data)));
  }
  perpPosition(request: QueryPerpPositionRequest): Promise<QueryPerpPositionResponse> {
    const data = QueryPerpPositionRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "PerpPosition", data);
    return promise.then(data => QueryPerpPositionResponse.decode(new BinaryReader(data)));
  }
  spendableBalance(request: QuerySpendableBalanceRequest): Promise<QuerySpendableBalanceResponse> {
    const data = QuerySpendableBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Query", "SpendableBalance", data);
    return promise.then(data => QuerySpendableBalanceResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    executionAuthority(request?: QueryExecutionAuthorityRequest): Promise<QueryExecutionAuthorityResponse> {
      return queryService.executionAuthority(request);
    },
    markets(request?: QueryMarketsRequest): Promise<QueryMarketsResponse> {
      return queryService.markets(request);
    },
    market(request: QueryMarketRequest): Promise<QueryMarketResponse> {
      return queryService.market(request);
    },
    orders(request?: QueryOrdersRequest): Promise<QueryOrdersResponse> {
      return queryService.orders(request);
    },
    ordersForAccount(request: QueryOrdersForAccountRequest): Promise<QueryOrdersForAccountResponse> {
      return queryService.ordersForAccount(request);
    },
    orderInfo(request: QueryOrderInfoRequest): Promise<QueryOrderInfoResponse> {
      return queryService.orderInfo(request);
    },
    perpPositions(request?: QueryPerpPositionsRequest): Promise<QueryPerpPositionsResponse> {
      return queryService.perpPositions(request);
    },
    perpPositionForAccount(request: QueryPerpPositionForAccountRequest): Promise<QueryPerpPositionForAccountResponse> {
      return queryService.perpPositionForAccount(request);
    },
    perpPosition(request: QueryPerpPositionRequest): Promise<QueryPerpPositionResponse> {
      return queryService.perpPosition(request);
    },
    spendableBalance(request: QuerySpendableBalanceRequest): Promise<QuerySpendableBalanceResponse> {
      return queryService.spendableBalance(request);
    }
  };
};