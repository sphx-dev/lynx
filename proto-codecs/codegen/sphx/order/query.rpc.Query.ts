//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryExecutionAuthorityRequest, QueryExecutionAuthorityResponse, QueryMarketsRequest, QueryMarketsResponse, QueryMarketRequest, QueryMarketResponse, QueryOrdersRequest, QueryOrdersResponse, QueryOrdersForAccountRequest, QueryOrdersForAccountResponse, QueryOrderInfoRequest, QueryOrderInfoResponse } from "./query";
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
  orderInfo(request: QueryOrderInfoRequest): Promise<QueryOrderInfoResponse>;
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
    }
  };
};