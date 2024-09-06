//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { ValidatedOrder, ValidatedOrderAmino, ValidatedOrderSDKType } from "./validated_order";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/sphx.order.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/sphx.order.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/sphx.order.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/sphx.order.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryOrdersRequest {
  pagination?: PageRequest;
}
export interface QueryOrdersRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersRequest";
  value: Uint8Array;
}
export interface QueryOrdersRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryOrdersRequestAminoMsg {
  type: "/sphx.order.QueryOrdersRequest";
  value: QueryOrdersRequestAmino;
}
export interface QueryOrdersRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryOrdersResponse {
  orders: ValidatedOrder[];
  pagination?: PageResponse;
}
export interface QueryOrdersResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersResponse";
  value: Uint8Array;
}
export interface QueryOrdersResponseAmino {
  orders?: ValidatedOrderAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOrdersResponseAminoMsg {
  type: "/sphx.order.QueryOrdersResponse";
  value: QueryOrdersResponseAmino;
}
export interface QueryOrdersResponseSDKType {
  orders: ValidatedOrderSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOrdersForAccountRequest {
  address: string;
  pagination?: PageRequest;
}
export interface QueryOrdersForAccountRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersForAccountRequest";
  value: Uint8Array;
}
export interface QueryOrdersForAccountRequestAmino {
  address?: string;
  pagination?: PageRequestAmino;
}
export interface QueryOrdersForAccountRequestAminoMsg {
  type: "/sphx.order.QueryOrdersForAccountRequest";
  value: QueryOrdersForAccountRequestAmino;
}
export interface QueryOrdersForAccountRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType;
}
export interface QueryOrdersForAccountResponse {
  orders: ValidatedOrder[];
  pagination?: PageResponse;
}
export interface QueryOrdersForAccountResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrdersForAccountResponse";
  value: Uint8Array;
}
export interface QueryOrdersForAccountResponseAmino {
  orders?: ValidatedOrderAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOrdersForAccountResponseAminoMsg {
  type: "/sphx.order.QueryOrdersForAccountResponse";
  value: QueryOrdersForAccountResponseAmino;
}
export interface QueryOrdersForAccountResponseSDKType {
  orders: ValidatedOrderSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOrderInfoRequest {
  /** order_id is `marginAccAddr:orderNumber` */
  orderId: string;
}
export interface QueryOrderInfoRequestProtoMsg {
  typeUrl: "/sphx.order.QueryOrderInfoRequest";
  value: Uint8Array;
}
export interface QueryOrderInfoRequestAmino {
  /** order_id is `marginAccAddr:orderNumber` */
  order_id?: string;
}
export interface QueryOrderInfoRequestAminoMsg {
  type: "/sphx.order.QueryOrderInfoRequest";
  value: QueryOrderInfoRequestAmino;
}
export interface QueryOrderInfoRequestSDKType {
  order_id: string;
}
export interface QueryOrderInfoResponse {
  order: ValidatedOrder;
}
export interface QueryOrderInfoResponseProtoMsg {
  typeUrl: "/sphx.order.QueryOrderInfoResponse";
  value: Uint8Array;
}
export interface QueryOrderInfoResponseAmino {
  order?: ValidatedOrderAmino;
}
export interface QueryOrderInfoResponseAminoMsg {
  type: "/sphx.order.QueryOrderInfoResponse";
  value: QueryOrderInfoResponseAmino;
}
export interface QueryOrderInfoResponseSDKType {
  order: ValidatedOrderSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/sphx.order.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/sphx.order.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersRequest(): QueryOrdersRequest {
  return {
    pagination: undefined
  };
}
export const QueryOrdersRequest = {
  typeUrl: "/sphx.order.QueryOrdersRequest",
  encode(message: QueryOrdersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersRequest>): QueryOrdersRequest {
    const message = createBaseQueryOrdersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersRequestAmino): QueryOrdersRequest {
    const message = createBaseQueryOrdersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersRequest): QueryOrdersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersRequestAminoMsg): QueryOrdersRequest {
    return QueryOrdersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersRequestProtoMsg): QueryOrdersRequest {
    return QueryOrdersRequest.decode(message.value);
  },
  toProto(message: QueryOrdersRequest): Uint8Array {
    return QueryOrdersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersRequest): QueryOrdersRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersRequest",
      value: QueryOrdersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersResponse(): QueryOrdersResponse {
  return {
    orders: [],
    pagination: undefined
  };
}
export const QueryOrdersResponse = {
  typeUrl: "/sphx.order.QueryOrdersResponse",
  encode(message: QueryOrdersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.orders) {
      ValidatedOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(ValidatedOrder.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersResponse>): QueryOrdersResponse {
    const message = createBaseQueryOrdersResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersResponseAmino): QueryOrdersResponse {
    const message = createBaseQueryOrdersResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersResponse): QueryOrdersResponseAmino {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? ValidatedOrder.toAmino(e) : undefined);
    } else {
      obj.orders = message.orders;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersResponseAminoMsg): QueryOrdersResponse {
    return QueryOrdersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersResponseProtoMsg): QueryOrdersResponse {
    return QueryOrdersResponse.decode(message.value);
  },
  toProto(message: QueryOrdersResponse): Uint8Array {
    return QueryOrdersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersResponse): QueryOrdersResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersResponse",
      value: QueryOrdersResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersForAccountRequest(): QueryOrdersForAccountRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryOrdersForAccountRequest = {
  typeUrl: "/sphx.order.QueryOrdersForAccountRequest",
  encode(message: QueryOrdersForAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersForAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersForAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersForAccountRequest>): QueryOrdersForAccountRequest {
    const message = createBaseQueryOrdersForAccountRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersForAccountRequestAmino): QueryOrdersForAccountRequest {
    const message = createBaseQueryOrdersForAccountRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersForAccountRequest): QueryOrdersForAccountRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersForAccountRequestAminoMsg): QueryOrdersForAccountRequest {
    return QueryOrdersForAccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersForAccountRequestProtoMsg): QueryOrdersForAccountRequest {
    return QueryOrdersForAccountRequest.decode(message.value);
  },
  toProto(message: QueryOrdersForAccountRequest): Uint8Array {
    return QueryOrdersForAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersForAccountRequest): QueryOrdersForAccountRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersForAccountRequest",
      value: QueryOrdersForAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrdersForAccountResponse(): QueryOrdersForAccountResponse {
  return {
    orders: [],
    pagination: undefined
  };
}
export const QueryOrdersForAccountResponse = {
  typeUrl: "/sphx.order.QueryOrdersForAccountResponse",
  encode(message: QueryOrdersForAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.orders) {
      ValidatedOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrdersForAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrdersForAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orders.push(ValidatedOrder.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrdersForAccountResponse>): QueryOrdersForAccountResponse {
    const message = createBaseQueryOrdersForAccountResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOrdersForAccountResponseAmino): QueryOrdersForAccountResponse {
    const message = createBaseQueryOrdersForAccountResponse();
    message.orders = object.orders?.map(e => ValidatedOrder.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOrdersForAccountResponse): QueryOrdersForAccountResponseAmino {
    const obj: any = {};
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? ValidatedOrder.toAmino(e) : undefined);
    } else {
      obj.orders = message.orders;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrdersForAccountResponseAminoMsg): QueryOrdersForAccountResponse {
    return QueryOrdersForAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrdersForAccountResponseProtoMsg): QueryOrdersForAccountResponse {
    return QueryOrdersForAccountResponse.decode(message.value);
  },
  toProto(message: QueryOrdersForAccountResponse): Uint8Array {
    return QueryOrdersForAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrdersForAccountResponse): QueryOrdersForAccountResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrdersForAccountResponse",
      value: QueryOrdersForAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOrderInfoRequest(): QueryOrderInfoRequest {
  return {
    orderId: ""
  };
}
export const QueryOrderInfoRequest = {
  typeUrl: "/sphx.order.QueryOrderInfoRequest",
  encode(message: QueryOrderInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== "") {
      writer.uint32(10).string(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrderInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderInfoRequest>): QueryOrderInfoRequest {
    const message = createBaseQueryOrderInfoRequest();
    message.orderId = object.orderId ?? "";
    return message;
  },
  fromAmino(object: QueryOrderInfoRequestAmino): QueryOrderInfoRequest {
    const message = createBaseQueryOrderInfoRequest();
    if (object.order_id !== undefined && object.order_id !== null) {
      message.orderId = object.order_id;
    }
    return message;
  },
  toAmino(message: QueryOrderInfoRequest): QueryOrderInfoRequestAmino {
    const obj: any = {};
    obj.order_id = message.orderId === "" ? undefined : message.orderId;
    return obj;
  },
  fromAminoMsg(object: QueryOrderInfoRequestAminoMsg): QueryOrderInfoRequest {
    return QueryOrderInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderInfoRequestProtoMsg): QueryOrderInfoRequest {
    return QueryOrderInfoRequest.decode(message.value);
  },
  toProto(message: QueryOrderInfoRequest): Uint8Array {
    return QueryOrderInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderInfoRequest): QueryOrderInfoRequestProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrderInfoRequest",
      value: QueryOrderInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOrderInfoResponse(): QueryOrderInfoResponse {
  return {
    order: ValidatedOrder.fromPartial({})
  };
}
export const QueryOrderInfoResponse = {
  typeUrl: "/sphx.order.QueryOrderInfoResponse",
  encode(message: QueryOrderInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.order !== undefined) {
      ValidatedOrder.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOrderInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOrderInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = ValidatedOrder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryOrderInfoResponse>): QueryOrderInfoResponse {
    const message = createBaseQueryOrderInfoResponse();
    message.order = object.order !== undefined && object.order !== null ? ValidatedOrder.fromPartial(object.order) : undefined;
    return message;
  },
  fromAmino(object: QueryOrderInfoResponseAmino): QueryOrderInfoResponse {
    const message = createBaseQueryOrderInfoResponse();
    if (object.order !== undefined && object.order !== null) {
      message.order = ValidatedOrder.fromAmino(object.order);
    }
    return message;
  },
  toAmino(message: QueryOrderInfoResponse): QueryOrderInfoResponseAmino {
    const obj: any = {};
    obj.order = message.order ? ValidatedOrder.toAmino(message.order) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOrderInfoResponseAminoMsg): QueryOrderInfoResponse {
    return QueryOrderInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOrderInfoResponseProtoMsg): QueryOrderInfoResponse {
    return QueryOrderInfoResponse.decode(message.value);
  },
  toProto(message: QueryOrderInfoResponse): Uint8Array {
    return QueryOrderInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOrderInfoResponse): QueryOrderInfoResponseProtoMsg {
    return {
      typeUrl: "/sphx.order.QueryOrderInfoResponse",
      value: QueryOrderInfoResponse.encode(message).finish()
    };
  }
};