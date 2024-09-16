//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgUpdateExecutionAuthority, MsgUpdateExecutionAuthorityResponse, MsgRegisterMarket, MsgRegisterMarketResponse, MsgPlaceOrder, MsgPlaceOrderResponse, MsgCancelOrder, MsgCancelOrderResponse, MsgExecuteOrder, MsgExecuteOrderResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  updateExecutionAuthority(request: MsgUpdateExecutionAuthority): Promise<MsgUpdateExecutionAuthorityResponse>;
  registerMarket(request: MsgRegisterMarket): Promise<MsgRegisterMarketResponse>;
  placeOrder(request: MsgPlaceOrder): Promise<MsgPlaceOrderResponse>;
  cancelOrder(request: MsgCancelOrder): Promise<MsgCancelOrderResponse>;
  executeOrder(request: MsgExecuteOrder): Promise<MsgExecuteOrderResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.updateExecutionAuthority = this.updateExecutionAuthority.bind(this);
    this.registerMarket = this.registerMarket.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.executeOrder = this.executeOrder.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  updateExecutionAuthority(request: MsgUpdateExecutionAuthority): Promise<MsgUpdateExecutionAuthorityResponse> {
    const data = MsgUpdateExecutionAuthority.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "UpdateExecutionAuthority", data);
    return promise.then(data => MsgUpdateExecutionAuthorityResponse.decode(new BinaryReader(data)));
  }
  registerMarket(request: MsgRegisterMarket): Promise<MsgRegisterMarketResponse> {
    const data = MsgRegisterMarket.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "RegisterMarket", data);
    return promise.then(data => MsgRegisterMarketResponse.decode(new BinaryReader(data)));
  }
  placeOrder(request: MsgPlaceOrder): Promise<MsgPlaceOrderResponse> {
    const data = MsgPlaceOrder.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "PlaceOrder", data);
    return promise.then(data => MsgPlaceOrderResponse.decode(new BinaryReader(data)));
  }
  cancelOrder(request: MsgCancelOrder): Promise<MsgCancelOrderResponse> {
    const data = MsgCancelOrder.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "CancelOrder", data);
    return promise.then(data => MsgCancelOrderResponse.decode(new BinaryReader(data)));
  }
  executeOrder(request: MsgExecuteOrder): Promise<MsgExecuteOrderResponse> {
    const data = MsgExecuteOrder.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "ExecuteOrder", data);
    return promise.then(data => MsgExecuteOrderResponse.decode(new BinaryReader(data)));
  }
}