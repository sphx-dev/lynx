//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryMarginAccountInfoRequest, QueryMarginAccountInfoResponseSDKType } from "./query";
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
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `sphx/marginacc/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* MarginAccountInfo */
  async marginAccountInfo(params: QueryMarginAccountInfoRequest): Promise<QueryMarginAccountInfoResponseSDKType> {
    const endpoint = `sphx/marginacc/info/${params.address}`;
    return await this.req.get<QueryMarginAccountInfoResponseSDKType>(endpoint);
  }
}