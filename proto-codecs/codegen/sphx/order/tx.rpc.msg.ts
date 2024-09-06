//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgPlaceOrder, MsgPlaceOrderResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  placeOrder(request: MsgPlaceOrder): Promise<MsgPlaceOrderResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  placeOrder(request: MsgPlaceOrder): Promise<MsgPlaceOrderResponse> {
    const data = MsgPlaceOrder.encode(request).finish();
    const promise = this.rpc.request("sphx.order.Msg", "PlaceOrder", data);
    return promise.then(data => MsgPlaceOrderResponse.decode(new BinaryReader(data)));
  }
}