//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgCreateMarginAccount, MsgCreateMarginAccountResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  createMarginAccount(request: MsgCreateMarginAccount): Promise<MsgCreateMarginAccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.createMarginAccount = this.createMarginAccount.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("sphx.marginacc.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  createMarginAccount(request: MsgCreateMarginAccount): Promise<MsgCreateMarginAccountResponse> {
    const data = MsgCreateMarginAccount.encode(request).finish();
    const promise = this.rpc.request("sphx.marginacc.Msg", "CreateMarginAccount", data);
    return promise.then(data => MsgCreateMarginAccountResponse.decode(new BinaryReader(data)));
  }
}