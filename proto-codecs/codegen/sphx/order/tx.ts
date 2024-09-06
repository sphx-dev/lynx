//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Order, OrderAmino, OrderSDKType } from "./order";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/sphx.order.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** NOTE: All parameters must be supplied. */
  params: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "sphx/x/order/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/sphx.order.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/sphx.order.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgPlaceOrder {
  user: string;
  order?: Order;
}
export interface MsgPlaceOrderProtoMsg {
  typeUrl: "/sphx.order.MsgPlaceOrder";
  value: Uint8Array;
}
export interface MsgPlaceOrderAmino {
  user?: string;
  order?: OrderAmino;
}
export interface MsgPlaceOrderAminoMsg {
  type: "/sphx.order.MsgPlaceOrder";
  value: MsgPlaceOrderAmino;
}
export interface MsgPlaceOrderSDKType {
  user: string;
  order?: OrderSDKType;
}
export interface MsgPlaceOrderResponse {}
export interface MsgPlaceOrderResponseProtoMsg {
  typeUrl: "/sphx.order.MsgPlaceOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceOrderResponseAmino {}
export interface MsgPlaceOrderResponseAminoMsg {
  type: "/sphx.order.MsgPlaceOrderResponse";
  value: MsgPlaceOrderResponseAmino;
}
export interface MsgPlaceOrderResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/sphx.order.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "sphx/x/order/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/sphx.order.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPlaceOrder(): MsgPlaceOrder {
  return {
    user: "",
    order: undefined
  };
}
export const MsgPlaceOrder = {
  typeUrl: "/sphx.order.MsgPlaceOrder",
  encode(message: MsgPlaceOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.order !== undefined) {
      Order.encode(message.order, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPlaceOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlaceOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.order = Order.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPlaceOrder>): MsgPlaceOrder {
    const message = createBaseMsgPlaceOrder();
    message.user = object.user ?? "";
    message.order = object.order !== undefined && object.order !== null ? Order.fromPartial(object.order) : undefined;
    return message;
  },
  fromAmino(object: MsgPlaceOrderAmino): MsgPlaceOrder {
    const message = createBaseMsgPlaceOrder();
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    }
    if (object.order !== undefined && object.order !== null) {
      message.order = Order.fromAmino(object.order);
    }
    return message;
  },
  toAmino(message: MsgPlaceOrder): MsgPlaceOrderAmino {
    const obj: any = {};
    obj.user = message.user === "" ? undefined : message.user;
    obj.order = message.order ? Order.toAmino(message.order) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgPlaceOrderAminoMsg): MsgPlaceOrder {
    return MsgPlaceOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPlaceOrderProtoMsg): MsgPlaceOrder {
    return MsgPlaceOrder.decode(message.value);
  },
  toProto(message: MsgPlaceOrder): Uint8Array {
    return MsgPlaceOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgPlaceOrder): MsgPlaceOrderProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgPlaceOrder",
      value: MsgPlaceOrder.encode(message).finish()
    };
  }
};
function createBaseMsgPlaceOrderResponse(): MsgPlaceOrderResponse {
  return {};
}
export const MsgPlaceOrderResponse = {
  typeUrl: "/sphx.order.MsgPlaceOrderResponse",
  encode(_: MsgPlaceOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPlaceOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlaceOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgPlaceOrderResponse>): MsgPlaceOrderResponse {
    const message = createBaseMsgPlaceOrderResponse();
    return message;
  },
  fromAmino(_: MsgPlaceOrderResponseAmino): MsgPlaceOrderResponse {
    const message = createBaseMsgPlaceOrderResponse();
    return message;
  },
  toAmino(_: MsgPlaceOrderResponse): MsgPlaceOrderResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPlaceOrderResponseAminoMsg): MsgPlaceOrderResponse {
    return MsgPlaceOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPlaceOrderResponseProtoMsg): MsgPlaceOrderResponse {
    return MsgPlaceOrderResponse.decode(message.value);
  },
  toProto(message: MsgPlaceOrderResponse): Uint8Array {
    return MsgPlaceOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPlaceOrderResponse): MsgPlaceOrderResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgPlaceOrderResponse",
      value: MsgPlaceOrderResponse.encode(message).finish()
    };
  }
};