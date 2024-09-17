//@ts-nocheck
import { setPaginationParams } from "../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryExecutionAuthorityRequest, QueryExecutionAuthorityResponseSDKType, QueryMarketsRequest, QueryMarketsResponseSDKType, QueryMarketRequest, QueryMarketResponseSDKType, QueryOrdersRequest, QueryOrdersResponseSDKType, QueryOrdersForAccountRequest, QueryOrdersForAccountResponseSDKType, QueryOrderInfoRequest, QueryOrderInfoResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.executionAuthority = this.executionAuthority.bind(this);
    this.markets = this.markets.bind(this);
    this.market = this.market.bind(this);
    this.orders = this.orders.bind(this);
    this.ordersForAccount = this.ordersForAccount.bind(this);
    this.orderInfo = this.orderInfo.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `sphx/order/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* ExecutionAuthority */
  async executionAuthority(_params: QueryExecutionAuthorityRequest = {}): Promise<QueryExecutionAuthorityResponseSDKType> {
    const endpoint = `sphx/order/execution_authority`;
    return await this.req.get<QueryExecutionAuthorityResponseSDKType>(endpoint);
  }
  /* Markets */
  async markets(params: QueryMarketsRequest = {
    pagination: undefined
  }): Promise<QueryMarketsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/markets`;
    return await this.req.get<QueryMarketsResponseSDKType>(endpoint, options);
  }
  /* Market */
  async market(params: QueryMarketRequest): Promise<QueryMarketResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `sphx/order/market`;
    return await this.req.get<QueryMarketResponseSDKType>(endpoint, options);
  }
  /* Orders */
  async orders(params: QueryOrdersRequest = {
    pagination: undefined
  }): Promise<QueryOrdersResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/orders`;
    return await this.req.get<QueryOrdersResponseSDKType>(endpoint, options);
  }
  /* Queries orders for a given margin account */
  async ordersForAccount(params: QueryOrdersForAccountRequest): Promise<QueryOrdersForAccountResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/orders_for_account/${params.address}`;
    return await this.req.get<QueryOrdersForAccountResponseSDKType>(endpoint, options);
  }
  /* OrderInfo */
  async orderInfo(params: QueryOrderInfoRequest): Promise<QueryOrderInfoResponseSDKType> {
    const endpoint = `sphx/order/order_info/${params.orderId}`;
    return await this.req.get<QueryOrderInfoResponseSDKType>(endpoint);
  }
}