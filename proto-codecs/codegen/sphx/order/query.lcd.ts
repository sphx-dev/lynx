//@ts-nocheck
import { setPaginationParams } from "../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryExecutionAuthorityRequest, QueryExecutionAuthorityResponseSDKType, QueryMarketsRequest, QueryMarketsResponseSDKType, QueryMarketRequest, QueryMarketResponseSDKType, QueryOrdersRequest, QueryOrdersResponseSDKType, QueryOrdersForAccountRequest, QueryOrdersForAccountResponseSDKType, QueryOrderInfoRequest, QueryOrderInfoResponseSDKType, QueryPerpPositionsRequest, QueryPerpPositionsResponseSDKType, QueryPerpPositionForAccountRequest, QueryPerpPositionForAccountResponseSDKType, QueryPerpPositionRequest, QueryPerpPositionResponseSDKType, QuerySpendableBalanceRequest, QuerySpendableBalanceResponseSDKType } from "./query";
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
    this.perpPositions = this.perpPositions.bind(this);
    this.perpPositionForAccount = this.perpPositionForAccount.bind(this);
    this.perpPosition = this.perpPosition.bind(this);
    this.spendableBalance = this.spendableBalance.bind(this);
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
    if (typeof params?.status !== "undefined") {
      options.params.status = params.status;
    }
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/orders_for_account/${params.address}`;
    return await this.req.get<QueryOrdersForAccountResponseSDKType>(endpoint, options);
  }
  /* rpc ClosedOrdersForAccount(QueryClosedOrdersForAccountRequest) returns (QueryClosedOrdersForAccountResponse) {
     option (google.api.http).get = "/sphx/order/closed_orders_for_account/{address}";
   }
   Queries order info for a given order_id */
  async orderInfo(params: QueryOrderInfoRequest): Promise<QueryOrderInfoResponseSDKType> {
    const endpoint = `sphx/order/order_info/${params.orderId}`;
    return await this.req.get<QueryOrderInfoResponseSDKType>(endpoint);
  }
  /* Queries all perpetual positions */
  async perpPositions(params: QueryPerpPositionsRequest = {
    pagination: undefined
  }): Promise<QueryPerpPositionsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/perp_positions`;
    return await this.req.get<QueryPerpPositionsResponseSDKType>(endpoint, options);
  }
  /* Queries all perpetual positions for a given margin account */
  async perpPositionForAccount(params: QueryPerpPositionForAccountRequest): Promise<QueryPerpPositionForAccountResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/order/perp_positions_for_account/${params.address}`;
    return await this.req.get<QueryPerpPositionForAccountResponseSDKType>(endpoint, options);
  }
  /* Queries a perpetual position for a given position_id */
  async perpPosition(params: QueryPerpPositionRequest): Promise<QueryPerpPositionResponseSDKType> {
    const endpoint = `sphx/order/perp_position/${params.positionId}`;
    return await this.req.get<QueryPerpPositionResponseSDKType>(endpoint);
  }
  /* For a given margin account address get its spendable balance */
  async spendableBalance(params: QuerySpendableBalanceRequest): Promise<QuerySpendableBalanceResponseSDKType> {
    const endpoint = `sphx/order/spendable_balance/${params.address}`;
    return await this.req.get<QuerySpendableBalanceResponseSDKType>(endpoint);
  }
}