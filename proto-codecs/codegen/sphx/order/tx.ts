//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Market, MarketAmino, MarketSDKType } from "./market";
import { Order, OrderAmino, OrderSDKType, OrderId, OrderIdAmino, OrderIdSDKType, FillType } from "./order";
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
export interface MsgUpdateExecutionAuthority {
  authority: string;
  executionAuthority: string;
}
export interface MsgUpdateExecutionAuthorityProtoMsg {
  typeUrl: "/sphx.order.MsgUpdateExecutionAuthority";
  value: Uint8Array;
}
export interface MsgUpdateExecutionAuthorityAmino {
  authority?: string;
  executionAuthority?: string;
}
export interface MsgUpdateExecutionAuthorityAminoMsg {
  type: "/sphx.order.MsgUpdateExecutionAuthority";
  value: MsgUpdateExecutionAuthorityAmino;
}
export interface MsgUpdateExecutionAuthoritySDKType {
  authority: string;
  executionAuthority: string;
}
export interface MsgUpdateExecutionAuthorityResponse {}
export interface MsgUpdateExecutionAuthorityResponseProtoMsg {
  typeUrl: "/sphx.order.MsgUpdateExecutionAuthorityResponse";
  value: Uint8Array;
}
export interface MsgUpdateExecutionAuthorityResponseAmino {}
export interface MsgUpdateExecutionAuthorityResponseAminoMsg {
  type: "/sphx.order.MsgUpdateExecutionAuthorityResponse";
  value: MsgUpdateExecutionAuthorityResponseAmino;
}
export interface MsgUpdateExecutionAuthorityResponseSDKType {}
export interface MsgRegisterMarket {
  authority: string;
  market: Market;
}
export interface MsgRegisterMarketProtoMsg {
  typeUrl: "/sphx.order.MsgRegisterMarket";
  value: Uint8Array;
}
export interface MsgRegisterMarketAmino {
  authority?: string;
  market?: MarketAmino;
}
export interface MsgRegisterMarketAminoMsg {
  type: "/sphx.order.MsgRegisterMarket";
  value: MsgRegisterMarketAmino;
}
export interface MsgRegisterMarketSDKType {
  authority: string;
  market: MarketSDKType;
}
export interface MsgRegisterMarketResponse {
  marketId: number;
}
export interface MsgRegisterMarketResponseProtoMsg {
  typeUrl: "/sphx.order.MsgRegisterMarketResponse";
  value: Uint8Array;
}
export interface MsgRegisterMarketResponseAmino {
  market_id?: number;
}
export interface MsgRegisterMarketResponseAminoMsg {
  type: "/sphx.order.MsgRegisterMarketResponse";
  value: MsgRegisterMarketResponseAmino;
}
export interface MsgRegisterMarketResponseSDKType {
  market_id: number;
}
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
export interface MsgPlaceOrderResponse {
  orderId: OrderId;
}
export interface MsgPlaceOrderResponseProtoMsg {
  typeUrl: "/sphx.order.MsgPlaceOrderResponse";
  value: Uint8Array;
}
export interface MsgPlaceOrderResponseAmino {
  order_id: OrderIdAmino;
}
export interface MsgPlaceOrderResponseAminoMsg {
  type: "/sphx.order.MsgPlaceOrderResponse";
  value: MsgPlaceOrderResponseAmino;
}
export interface MsgPlaceOrderResponseSDKType {
  order_id: OrderIdSDKType;
}
export interface MsgCancelOrder {
  user: string;
  orderId: OrderId;
}
export interface MsgCancelOrderProtoMsg {
  typeUrl: "/sphx.order.MsgCancelOrder";
  value: Uint8Array;
}
export interface MsgCancelOrderAmino {
  user?: string;
  order_id: OrderIdAmino;
}
export interface MsgCancelOrderAminoMsg {
  type: "/sphx.order.MsgCancelOrder";
  value: MsgCancelOrderAmino;
}
export interface MsgCancelOrderSDKType {
  user: string;
  order_id: OrderIdSDKType;
}
export interface MsgCancelOrderResponse {
  orderId: OrderId;
}
export interface MsgCancelOrderResponseProtoMsg {
  typeUrl: "/sphx.order.MsgCancelOrderResponse";
  value: Uint8Array;
}
export interface MsgCancelOrderResponseAmino {
  order_id: OrderIdAmino;
}
export interface MsgCancelOrderResponseAminoMsg {
  type: "/sphx.order.MsgCancelOrderResponse";
  value: MsgCancelOrderResponseAmino;
}
export interface MsgCancelOrderResponseSDKType {
  order_id: OrderIdSDKType;
}
export interface MsgExecuteOrder {
  /** Execution authority is the address that can execute the order */
  executionAuthority: string;
  /** OrderId is the order to be executed */
  orderId: OrderId;
  /** Filltype is used to determine if the order was partially or fully filled */
  fillType: FillType;
  /** Quantity is the amount of the order that was filled */
  qty: bigint;
  /** Price is the price at which the order was filled */
  price: string;
  /** Timestamp is the time at which the order was executed */
  timestamp: bigint;
  /** Leverage is the amount of leverage used to execute the order */
  leverage: bigint;
}
export interface MsgExecuteOrderProtoMsg {
  typeUrl: "/sphx.order.MsgExecuteOrder";
  value: Uint8Array;
}
export interface MsgExecuteOrderAmino {
  /** Execution authority is the address that can execute the order */
  executionAuthority?: string;
  /** OrderId is the order to be executed */
  order_id: OrderIdAmino;
  /** Filltype is used to determine if the order was partially or fully filled */
  fill_type?: FillType;
  /** Quantity is the amount of the order that was filled */
  qty?: string;
  /** Price is the price at which the order was filled */
  price: string;
  /** Timestamp is the time at which the order was executed */
  timestamp?: string;
  /** Leverage is the amount of leverage used to execute the order */
  leverage?: string;
}
export interface MsgExecuteOrderAminoMsg {
  type: "/sphx.order.MsgExecuteOrder";
  value: MsgExecuteOrderAmino;
}
export interface MsgExecuteOrderSDKType {
  executionAuthority: string;
  order_id: OrderIdSDKType;
  fill_type: FillType;
  qty: bigint;
  price: string;
  timestamp: bigint;
  leverage: bigint;
}
export interface MsgExecuteOrderResponse {
  orderId: OrderId;
}
export interface MsgExecuteOrderResponseProtoMsg {
  typeUrl: "/sphx.order.MsgExecuteOrderResponse";
  value: Uint8Array;
}
export interface MsgExecuteOrderResponseAmino {
  order_id: OrderIdAmino;
}
export interface MsgExecuteOrderResponseAminoMsg {
  type: "/sphx.order.MsgExecuteOrderResponse";
  value: MsgExecuteOrderResponseAmino;
}
export interface MsgExecuteOrderResponseSDKType {
  order_id: OrderIdSDKType;
}
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
function createBaseMsgUpdateExecutionAuthority(): MsgUpdateExecutionAuthority {
  return {
    authority: "",
    executionAuthority: ""
  };
}
export const MsgUpdateExecutionAuthority = {
  typeUrl: "/sphx.order.MsgUpdateExecutionAuthority",
  encode(message: MsgUpdateExecutionAuthority, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.executionAuthority !== "") {
      writer.uint32(18).string(message.executionAuthority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateExecutionAuthority {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateExecutionAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.executionAuthority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateExecutionAuthority>): MsgUpdateExecutionAuthority {
    const message = createBaseMsgUpdateExecutionAuthority();
    message.authority = object.authority ?? "";
    message.executionAuthority = object.executionAuthority ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateExecutionAuthorityAmino): MsgUpdateExecutionAuthority {
    const message = createBaseMsgUpdateExecutionAuthority();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.executionAuthority !== undefined && object.executionAuthority !== null) {
      message.executionAuthority = object.executionAuthority;
    }
    return message;
  },
  toAmino(message: MsgUpdateExecutionAuthority): MsgUpdateExecutionAuthorityAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.executionAuthority = message.executionAuthority === "" ? undefined : message.executionAuthority;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateExecutionAuthorityAminoMsg): MsgUpdateExecutionAuthority {
    return MsgUpdateExecutionAuthority.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateExecutionAuthorityProtoMsg): MsgUpdateExecutionAuthority {
    return MsgUpdateExecutionAuthority.decode(message.value);
  },
  toProto(message: MsgUpdateExecutionAuthority): Uint8Array {
    return MsgUpdateExecutionAuthority.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateExecutionAuthority): MsgUpdateExecutionAuthorityProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgUpdateExecutionAuthority",
      value: MsgUpdateExecutionAuthority.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateExecutionAuthorityResponse(): MsgUpdateExecutionAuthorityResponse {
  return {};
}
export const MsgUpdateExecutionAuthorityResponse = {
  typeUrl: "/sphx.order.MsgUpdateExecutionAuthorityResponse",
  encode(_: MsgUpdateExecutionAuthorityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateExecutionAuthorityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateExecutionAuthorityResponse();
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
  fromPartial(_: Partial<MsgUpdateExecutionAuthorityResponse>): MsgUpdateExecutionAuthorityResponse {
    const message = createBaseMsgUpdateExecutionAuthorityResponse();
    return message;
  },
  fromAmino(_: MsgUpdateExecutionAuthorityResponseAmino): MsgUpdateExecutionAuthorityResponse {
    const message = createBaseMsgUpdateExecutionAuthorityResponse();
    return message;
  },
  toAmino(_: MsgUpdateExecutionAuthorityResponse): MsgUpdateExecutionAuthorityResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateExecutionAuthorityResponseAminoMsg): MsgUpdateExecutionAuthorityResponse {
    return MsgUpdateExecutionAuthorityResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateExecutionAuthorityResponseProtoMsg): MsgUpdateExecutionAuthorityResponse {
    return MsgUpdateExecutionAuthorityResponse.decode(message.value);
  },
  toProto(message: MsgUpdateExecutionAuthorityResponse): Uint8Array {
    return MsgUpdateExecutionAuthorityResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateExecutionAuthorityResponse): MsgUpdateExecutionAuthorityResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgUpdateExecutionAuthorityResponse",
      value: MsgUpdateExecutionAuthorityResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterMarket(): MsgRegisterMarket {
  return {
    authority: "",
    market: Market.fromPartial({})
  };
}
export const MsgRegisterMarket = {
  typeUrl: "/sphx.order.MsgRegisterMarket",
  encode(message: MsgRegisterMarket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.market !== undefined) {
      Market.encode(message.market, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterMarket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.market = Market.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterMarket>): MsgRegisterMarket {
    const message = createBaseMsgRegisterMarket();
    message.authority = object.authority ?? "";
    message.market = object.market !== undefined && object.market !== null ? Market.fromPartial(object.market) : undefined;
    return message;
  },
  fromAmino(object: MsgRegisterMarketAmino): MsgRegisterMarket {
    const message = createBaseMsgRegisterMarket();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.market !== undefined && object.market !== null) {
      message.market = Market.fromAmino(object.market);
    }
    return message;
  },
  toAmino(message: MsgRegisterMarket): MsgRegisterMarketAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.market = message.market ? Market.toAmino(message.market) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterMarketAminoMsg): MsgRegisterMarket {
    return MsgRegisterMarket.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterMarketProtoMsg): MsgRegisterMarket {
    return MsgRegisterMarket.decode(message.value);
  },
  toProto(message: MsgRegisterMarket): Uint8Array {
    return MsgRegisterMarket.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterMarket): MsgRegisterMarketProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgRegisterMarket",
      value: MsgRegisterMarket.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterMarketResponse(): MsgRegisterMarketResponse {
  return {
    marketId: 0
  };
}
export const MsgRegisterMarketResponse = {
  typeUrl: "/sphx.order.MsgRegisterMarketResponse",
  encode(message: MsgRegisterMarketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== 0) {
      writer.uint32(8).uint32(message.marketId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterMarketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterMarketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterMarketResponse>): MsgRegisterMarketResponse {
    const message = createBaseMsgRegisterMarketResponse();
    message.marketId = object.marketId ?? 0;
    return message;
  },
  fromAmino(object: MsgRegisterMarketResponseAmino): MsgRegisterMarketResponse {
    const message = createBaseMsgRegisterMarketResponse();
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = object.market_id;
    }
    return message;
  },
  toAmino(message: MsgRegisterMarketResponse): MsgRegisterMarketResponseAmino {
    const obj: any = {};
    obj.market_id = message.marketId === 0 ? undefined : message.marketId;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterMarketResponseAminoMsg): MsgRegisterMarketResponse {
    return MsgRegisterMarketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterMarketResponseProtoMsg): MsgRegisterMarketResponse {
    return MsgRegisterMarketResponse.decode(message.value);
  },
  toProto(message: MsgRegisterMarketResponse): Uint8Array {
    return MsgRegisterMarketResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterMarketResponse): MsgRegisterMarketResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgRegisterMarketResponse",
      value: MsgRegisterMarketResponse.encode(message).finish()
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
  return {
    orderId: OrderId.fromPartial({})
  };
}
export const MsgPlaceOrderResponse = {
  typeUrl: "/sphx.order.MsgPlaceOrderResponse",
  encode(message: MsgPlaceOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== undefined) {
      OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPlaceOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlaceOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = OrderId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPlaceOrderResponse>): MsgPlaceOrderResponse {
    const message = createBaseMsgPlaceOrderResponse();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
    return message;
  },
  fromAmino(object: MsgPlaceOrderResponseAmino): MsgPlaceOrderResponse {
    const message = createBaseMsgPlaceOrderResponse();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = OrderId.fromAmino(object.order_id);
    }
    return message;
  },
  toAmino(message: MsgPlaceOrderResponse): MsgPlaceOrderResponseAmino {
    const obj: any = {};
    obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : OrderId.toAmino(OrderId.fromPartial({}));
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
function createBaseMsgCancelOrder(): MsgCancelOrder {
  return {
    user: "",
    orderId: OrderId.fromPartial({})
  };
}
export const MsgCancelOrder = {
  typeUrl: "/sphx.order.MsgCancelOrder",
  encode(message: MsgCancelOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.orderId !== undefined) {
      OrderId.encode(message.orderId, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.orderId = OrderId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelOrder>): MsgCancelOrder {
    const message = createBaseMsgCancelOrder();
    message.user = object.user ?? "";
    message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
    return message;
  },
  fromAmino(object: MsgCancelOrderAmino): MsgCancelOrder {
    const message = createBaseMsgCancelOrder();
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    }
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = OrderId.fromAmino(object.order_id);
    }
    return message;
  },
  toAmino(message: MsgCancelOrder): MsgCancelOrderAmino {
    const obj: any = {};
    obj.user = message.user === "" ? undefined : message.user;
    obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : OrderId.toAmino(OrderId.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgCancelOrderAminoMsg): MsgCancelOrder {
    return MsgCancelOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelOrderProtoMsg): MsgCancelOrder {
    return MsgCancelOrder.decode(message.value);
  },
  toProto(message: MsgCancelOrder): Uint8Array {
    return MsgCancelOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelOrder): MsgCancelOrderProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgCancelOrder",
      value: MsgCancelOrder.encode(message).finish()
    };
  }
};
function createBaseMsgCancelOrderResponse(): MsgCancelOrderResponse {
  return {
    orderId: OrderId.fromPartial({})
  };
}
export const MsgCancelOrderResponse = {
  typeUrl: "/sphx.order.MsgCancelOrderResponse",
  encode(message: MsgCancelOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== undefined) {
      OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = OrderId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelOrderResponse>): MsgCancelOrderResponse {
    const message = createBaseMsgCancelOrderResponse();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
    return message;
  },
  fromAmino(object: MsgCancelOrderResponseAmino): MsgCancelOrderResponse {
    const message = createBaseMsgCancelOrderResponse();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = OrderId.fromAmino(object.order_id);
    }
    return message;
  },
  toAmino(message: MsgCancelOrderResponse): MsgCancelOrderResponseAmino {
    const obj: any = {};
    obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : OrderId.toAmino(OrderId.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgCancelOrderResponseAminoMsg): MsgCancelOrderResponse {
    return MsgCancelOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelOrderResponseProtoMsg): MsgCancelOrderResponse {
    return MsgCancelOrderResponse.decode(message.value);
  },
  toProto(message: MsgCancelOrderResponse): Uint8Array {
    return MsgCancelOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelOrderResponse): MsgCancelOrderResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgCancelOrderResponse",
      value: MsgCancelOrderResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteOrder(): MsgExecuteOrder {
  return {
    executionAuthority: "",
    orderId: OrderId.fromPartial({}),
    fillType: 0,
    qty: BigInt(0),
    price: "",
    timestamp: BigInt(0),
    leverage: BigInt(0)
  };
}
export const MsgExecuteOrder = {
  typeUrl: "/sphx.order.MsgExecuteOrder",
  encode(message: MsgExecuteOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.executionAuthority !== "") {
      writer.uint32(10).string(message.executionAuthority);
    }
    if (message.orderId !== undefined) {
      OrderId.encode(message.orderId, writer.uint32(18).fork()).ldelim();
    }
    if (message.fillType !== 0) {
      writer.uint32(24).int32(message.fillType);
    }
    if (message.qty !== BigInt(0)) {
      writer.uint32(32).uint64(message.qty);
    }
    if (message.price !== "") {
      writer.uint32(42).string(message.price);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(48).uint64(message.timestamp);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(56).uint64(message.leverage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExecuteOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.executionAuthority = reader.string();
          break;
        case 2:
          message.orderId = OrderId.decode(reader, reader.uint32());
          break;
        case 3:
          message.fillType = reader.int32() as any;
          break;
        case 4:
          message.qty = reader.uint64();
          break;
        case 5:
          message.price = reader.string();
          break;
        case 6:
          message.timestamp = reader.uint64();
          break;
        case 7:
          message.leverage = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExecuteOrder>): MsgExecuteOrder {
    const message = createBaseMsgExecuteOrder();
    message.executionAuthority = object.executionAuthority ?? "";
    message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
    message.fillType = object.fillType ?? 0;
    message.qty = object.qty !== undefined && object.qty !== null ? BigInt(object.qty.toString()) : BigInt(0);
    message.price = object.price ?? "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    message.leverage = object.leverage !== undefined && object.leverage !== null ? BigInt(object.leverage.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgExecuteOrderAmino): MsgExecuteOrder {
    const message = createBaseMsgExecuteOrder();
    if (object.executionAuthority !== undefined && object.executionAuthority !== null) {
      message.executionAuthority = object.executionAuthority;
    }
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = OrderId.fromAmino(object.order_id);
    }
    if (object.fill_type !== undefined && object.fill_type !== null) {
      message.fillType = object.fill_type;
    }
    if (object.qty !== undefined && object.qty !== null) {
      message.qty = BigInt(object.qty);
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    if (object.leverage !== undefined && object.leverage !== null) {
      message.leverage = BigInt(object.leverage);
    }
    return message;
  },
  toAmino(message: MsgExecuteOrder): MsgExecuteOrderAmino {
    const obj: any = {};
    obj.executionAuthority = message.executionAuthority === "" ? undefined : message.executionAuthority;
    obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : OrderId.toAmino(OrderId.fromPartial({}));
    obj.fill_type = message.fillType === 0 ? undefined : message.fillType;
    obj.qty = message.qty !== BigInt(0) ? (message.qty?.toString)() : undefined;
    obj.price = message.price ?? "";
    obj.timestamp = message.timestamp !== BigInt(0) ? (message.timestamp?.toString)() : undefined;
    obj.leverage = message.leverage !== BigInt(0) ? (message.leverage?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteOrderAminoMsg): MsgExecuteOrder {
    return MsgExecuteOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExecuteOrderProtoMsg): MsgExecuteOrder {
    return MsgExecuteOrder.decode(message.value);
  },
  toProto(message: MsgExecuteOrder): Uint8Array {
    return MsgExecuteOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteOrder): MsgExecuteOrderProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgExecuteOrder",
      value: MsgExecuteOrder.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteOrderResponse(): MsgExecuteOrderResponse {
  return {
    orderId: OrderId.fromPartial({})
  };
}
export const MsgExecuteOrderResponse = {
  typeUrl: "/sphx.order.MsgExecuteOrderResponse",
  encode(message: MsgExecuteOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== undefined) {
      OrderId.encode(message.orderId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgExecuteOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = OrderId.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExecuteOrderResponse>): MsgExecuteOrderResponse {
    const message = createBaseMsgExecuteOrderResponse();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? OrderId.fromPartial(object.orderId) : undefined;
    return message;
  },
  fromAmino(object: MsgExecuteOrderResponseAmino): MsgExecuteOrderResponse {
    const message = createBaseMsgExecuteOrderResponse();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = OrderId.fromAmino(object.order_id);
    }
    return message;
  },
  toAmino(message: MsgExecuteOrderResponse): MsgExecuteOrderResponseAmino {
    const obj: any = {};
    obj.order_id = message.orderId ? OrderId.toAmino(message.orderId) : OrderId.toAmino(OrderId.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgExecuteOrderResponseAminoMsg): MsgExecuteOrderResponse {
    return MsgExecuteOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExecuteOrderResponseProtoMsg): MsgExecuteOrderResponse {
    return MsgExecuteOrderResponse.decode(message.value);
  },
  toProto(message: MsgExecuteOrderResponse): Uint8Array {
    return MsgExecuteOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteOrderResponse): MsgExecuteOrderResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.MsgExecuteOrderResponse",
      value: MsgExecuteOrderResponse.encode(message).finish()
    };
  }
};