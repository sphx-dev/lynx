//@ts-nocheck
import { setPaginationParams } from "../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryMarginAccountInfoRequest, QueryMarginAccountInfoResponseSDKType, QueryMarginAccountsByOwnerRequest, QueryMarginAccountsByOwnerResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.marginAccountInfo = this.marginAccountInfo.bind(this);
    this.marginAccountsByOwner = this.marginAccountsByOwner.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `sphx/marginacc/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* MarginAccountInfo queries the margin account info by address. */
  async marginAccountInfo(params: QueryMarginAccountInfoRequest): Promise<QueryMarginAccountInfoResponseSDKType> {
    const endpoint = `sphx/marginacc/info/${params.address}`;
    return await this.req.get<QueryMarginAccountInfoResponseSDKType>(endpoint);
  }
  /* MarginAccounts queries the margin accounts by owner. */
  async marginAccountsByOwner(params: QueryMarginAccountsByOwnerRequest): Promise<QueryMarginAccountsByOwnerResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `sphx/marginacc/accounts/${params.owner}`;
    return await this.req.get<QueryMarginAccountsByOwnerResponseSDKType>(endpoint, options);
  }
}