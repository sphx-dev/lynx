//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryMarginAccountInfoRequest, QueryMarginAccountInfoResponse, QueryMarginAccountsByOwnerRequest, QueryMarginAccountsByOwnerResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** MarginAccountInfo queries the margin account info by address. */
  marginAccountInfo(request: QueryMarginAccountInfoRequest): Promise<QueryMarginAccountInfoResponse>;
  /** MarginAccounts queries the margin accounts by owner. */
  marginAccountsByOwner(request: QueryMarginAccountsByOwnerRequest): Promise<QueryMarginAccountsByOwnerResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.marginAccountInfo = this.marginAccountInfo.bind(this);
    this.marginAccountsByOwner = this.marginAccountsByOwner.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.marginacc.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  marginAccountInfo(request: QueryMarginAccountInfoRequest): Promise<QueryMarginAccountInfoResponse> {
    const data = QueryMarginAccountInfoRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.marginacc.Query", "MarginAccountInfo", data);
    return promise.then(data => QueryMarginAccountInfoResponse.decode(new BinaryReader(data)));
  }
  marginAccountsByOwner(request: QueryMarginAccountsByOwnerRequest): Promise<QueryMarginAccountsByOwnerResponse> {
    const data = QueryMarginAccountsByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request("sphx.marginacc.Query", "MarginAccountsByOwner", data);
    return promise.then(data => QueryMarginAccountsByOwnerResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    marginAccountInfo(request: QueryMarginAccountInfoRequest): Promise<QueryMarginAccountInfoResponse> {
      return queryService.marginAccountInfo(request);
    },
    marginAccountsByOwner(request: QueryMarginAccountsByOwnerRequest): Promise<QueryMarginAccountsByOwnerResponse> {
      return queryService.marginAccountsByOwner(request);
    }
  };
};