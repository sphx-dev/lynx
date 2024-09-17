//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { MsgRegisterMarket, MsgRegisterMarketAmino, MsgRegisterMarketSDKType } from "./tx";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the order module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params;
  executionAuthority: string;
  registerMarket: MsgRegisterMarket[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/sphx.order.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the order module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters of the module. */
  params: ParamsAmino;
  executionAuthority?: string;
  register_market?: MsgRegisterMarketAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/sphx.order.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the order module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  executionAuthority: string;
  register_market: MsgRegisterMarketSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    executionAuthority: "",
    registerMarket: []
  };
}
export const GenesisState = {
  typeUrl: "/sphx.order.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.executionAuthority !== "") {
      writer.uint32(18).string(message.executionAuthority);
    }
    for (const v of message.registerMarket) {
      MsgRegisterMarket.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.executionAuthority = reader.string();
          break;
        case 3:
          message.registerMarket.push(MsgRegisterMarket.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.executionAuthority = object.executionAuthority ?? "";
    message.registerMarket = object.registerMarket?.map(e => MsgRegisterMarket.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.executionAuthority !== undefined && object.executionAuthority !== null) {
      message.executionAuthority = object.executionAuthority;
    }
    message.registerMarket = object.register_market?.map(e => MsgRegisterMarket.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    obj.executionAuthority = message.executionAuthority === "" ? undefined : message.executionAuthority;
    if (message.registerMarket) {
      obj.register_market = message.registerMarket.map(e => e ? MsgRegisterMarket.toAmino(e) : undefined);
    } else {
      obj.register_market = message.registerMarket;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/sphx.order.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};