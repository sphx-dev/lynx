//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { MarginAccountInfo, MarginAccountInfoAmino, MarginAccountInfoSDKType } from "./margin_account";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/sphx.marginacc.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/sphx.marginacc.QueryParamsRequest";
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
  typeUrl: "/sphx.marginacc.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/sphx.marginacc.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
export interface QueryMarginAccountInfoRequest {
  /** address of the margin account */
  address: string;
}
export interface QueryMarginAccountInfoRequestProtoMsg {
  typeUrl: "/sphx.marginacc.QueryMarginAccountInfoRequest";
  value: Uint8Array;
}
export interface QueryMarginAccountInfoRequestAmino {
  /** address of the margin account */
  address?: string;
}
export interface QueryMarginAccountInfoRequestAminoMsg {
  type: "/sphx.marginacc.QueryMarginAccountInfoRequest";
  value: QueryMarginAccountInfoRequestAmino;
}
export interface QueryMarginAccountInfoRequestSDKType {
  address: string;
}
export interface QueryMarginAccountInfoResponse {
  /** margin account info */
  marginAccountInfo: MarginAccountInfo;
}
export interface QueryMarginAccountInfoResponseProtoMsg {
  typeUrl: "/sphx.marginacc.QueryMarginAccountInfoResponse";
  value: Uint8Array;
}
export interface QueryMarginAccountInfoResponseAmino {
  /** margin account info */
  margin_account_info: MarginAccountInfoAmino;
}
export interface QueryMarginAccountInfoResponseAminoMsg {
  type: "/sphx.marginacc.QueryMarginAccountInfoResponse";
  value: QueryMarginAccountInfoResponseAmino;
}
export interface QueryMarginAccountInfoResponseSDKType {
  margin_account_info: MarginAccountInfoSDKType;
}
export interface QueryMarginAccountsByOwnerRequest {
  /** owner of the margin accounts */
  owner: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
export interface QueryMarginAccountsByOwnerRequestProtoMsg {
  typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerRequest";
  value: Uint8Array;
}
export interface QueryMarginAccountsByOwnerRequestAmino {
  /** owner of the margin accounts */
  owner?: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
}
export interface QueryMarginAccountsByOwnerRequestAminoMsg {
  type: "/sphx.marginacc.QueryMarginAccountsByOwnerRequest";
  value: QueryMarginAccountsByOwnerRequestAmino;
}
export interface QueryMarginAccountsByOwnerRequestSDKType {
  owner: string;
  pagination?: PageRequestSDKType;
}
export interface QueryMarginAccountsByOwnerResponse {
  /** margin accounts */
  marginAccounts: MarginAccountInfo[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryMarginAccountsByOwnerResponseProtoMsg {
  typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerResponse";
  value: Uint8Array;
}
export interface QueryMarginAccountsByOwnerResponseAmino {
  /** margin accounts */
  margin_accounts: MarginAccountInfoAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryMarginAccountsByOwnerResponseAminoMsg {
  type: "/sphx.marginacc.QueryMarginAccountsByOwnerResponse";
  value: QueryMarginAccountsByOwnerResponseAmino;
}
export interface QueryMarginAccountsByOwnerResponseSDKType {
  margin_accounts: MarginAccountInfoSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/sphx.marginacc.QueryParamsRequest",
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
      typeUrl: "/sphx.marginacc.QueryParamsRequest",
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
  typeUrl: "/sphx.marginacc.QueryParamsResponse",
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
      typeUrl: "/sphx.marginacc.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryMarginAccountInfoRequest(): QueryMarginAccountInfoRequest {
  return {
    address: ""
  };
}
export const QueryMarginAccountInfoRequest = {
  typeUrl: "/sphx.marginacc.QueryMarginAccountInfoRequest",
  encode(message: QueryMarginAccountInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarginAccountInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarginAccountInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarginAccountInfoRequest>): QueryMarginAccountInfoRequest {
    const message = createBaseQueryMarginAccountInfoRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryMarginAccountInfoRequestAmino): QueryMarginAccountInfoRequest {
    const message = createBaseQueryMarginAccountInfoRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryMarginAccountInfoRequest): QueryMarginAccountInfoRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryMarginAccountInfoRequestAminoMsg): QueryMarginAccountInfoRequest {
    return QueryMarginAccountInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarginAccountInfoRequestProtoMsg): QueryMarginAccountInfoRequest {
    return QueryMarginAccountInfoRequest.decode(message.value);
  },
  toProto(message: QueryMarginAccountInfoRequest): Uint8Array {
    return QueryMarginAccountInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMarginAccountInfoRequest): QueryMarginAccountInfoRequestProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.QueryMarginAccountInfoRequest",
      value: QueryMarginAccountInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMarginAccountInfoResponse(): QueryMarginAccountInfoResponse {
  return {
    marginAccountInfo: MarginAccountInfo.fromPartial({})
  };
}
export const QueryMarginAccountInfoResponse = {
  typeUrl: "/sphx.marginacc.QueryMarginAccountInfoResponse",
  encode(message: QueryMarginAccountInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marginAccountInfo !== undefined) {
      MarginAccountInfo.encode(message.marginAccountInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarginAccountInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarginAccountInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marginAccountInfo = MarginAccountInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMarginAccountInfoResponse>): QueryMarginAccountInfoResponse {
    const message = createBaseQueryMarginAccountInfoResponse();
    message.marginAccountInfo = object.marginAccountInfo !== undefined && object.marginAccountInfo !== null ? MarginAccountInfo.fromPartial(object.marginAccountInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryMarginAccountInfoResponseAmino): QueryMarginAccountInfoResponse {
    const message = createBaseQueryMarginAccountInfoResponse();
    if (object.margin_account_info !== undefined && object.margin_account_info !== null) {
      message.marginAccountInfo = MarginAccountInfo.fromAmino(object.margin_account_info);
    }
    return message;
  },
  toAmino(message: QueryMarginAccountInfoResponse): QueryMarginAccountInfoResponseAmino {
    const obj: any = {};
    obj.margin_account_info = message.marginAccountInfo ? MarginAccountInfo.toAmino(message.marginAccountInfo) : MarginAccountInfo.toAmino(MarginAccountInfo.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: QueryMarginAccountInfoResponseAminoMsg): QueryMarginAccountInfoResponse {
    return QueryMarginAccountInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarginAccountInfoResponseProtoMsg): QueryMarginAccountInfoResponse {
    return QueryMarginAccountInfoResponse.decode(message.value);
  },
  toProto(message: QueryMarginAccountInfoResponse): Uint8Array {
    return QueryMarginAccountInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMarginAccountInfoResponse): QueryMarginAccountInfoResponseProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.QueryMarginAccountInfoResponse",
      value: QueryMarginAccountInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryMarginAccountsByOwnerRequest(): QueryMarginAccountsByOwnerRequest {
  return {
    owner: "",
    pagination: undefined
  };
}
export const QueryMarginAccountsByOwnerRequest = {
  typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerRequest",
  encode(message: QueryMarginAccountsByOwnerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarginAccountsByOwnerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarginAccountsByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
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
  fromPartial(object: Partial<QueryMarginAccountsByOwnerRequest>): QueryMarginAccountsByOwnerRequest {
    const message = createBaseQueryMarginAccountsByOwnerRequest();
    message.owner = object.owner ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryMarginAccountsByOwnerRequestAmino): QueryMarginAccountsByOwnerRequest {
    const message = createBaseQueryMarginAccountsByOwnerRequest();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryMarginAccountsByOwnerRequest): QueryMarginAccountsByOwnerRequestAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMarginAccountsByOwnerRequestAminoMsg): QueryMarginAccountsByOwnerRequest {
    return QueryMarginAccountsByOwnerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarginAccountsByOwnerRequestProtoMsg): QueryMarginAccountsByOwnerRequest {
    return QueryMarginAccountsByOwnerRequest.decode(message.value);
  },
  toProto(message: QueryMarginAccountsByOwnerRequest): Uint8Array {
    return QueryMarginAccountsByOwnerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMarginAccountsByOwnerRequest): QueryMarginAccountsByOwnerRequestProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerRequest",
      value: QueryMarginAccountsByOwnerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMarginAccountsByOwnerResponse(): QueryMarginAccountsByOwnerResponse {
  return {
    marginAccounts: [],
    pagination: undefined
  };
}
export const QueryMarginAccountsByOwnerResponse = {
  typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerResponse",
  encode(message: QueryMarginAccountsByOwnerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.marginAccounts) {
      MarginAccountInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryMarginAccountsByOwnerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMarginAccountsByOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marginAccounts.push(MarginAccountInfo.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryMarginAccountsByOwnerResponse>): QueryMarginAccountsByOwnerResponse {
    const message = createBaseQueryMarginAccountsByOwnerResponse();
    message.marginAccounts = object.marginAccounts?.map(e => MarginAccountInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryMarginAccountsByOwnerResponseAmino): QueryMarginAccountsByOwnerResponse {
    const message = createBaseQueryMarginAccountsByOwnerResponse();
    message.marginAccounts = object.margin_accounts?.map(e => MarginAccountInfo.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryMarginAccountsByOwnerResponse): QueryMarginAccountsByOwnerResponseAmino {
    const obj: any = {};
    if (message.marginAccounts) {
      obj.margin_accounts = message.marginAccounts.map(e => e ? MarginAccountInfo.toAmino(e) : undefined);
    } else {
      obj.margin_accounts = message.marginAccounts;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMarginAccountsByOwnerResponseAminoMsg): QueryMarginAccountsByOwnerResponse {
    return QueryMarginAccountsByOwnerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMarginAccountsByOwnerResponseProtoMsg): QueryMarginAccountsByOwnerResponse {
    return QueryMarginAccountsByOwnerResponse.decode(message.value);
  },
  toProto(message: QueryMarginAccountsByOwnerResponse): Uint8Array {
    return QueryMarginAccountsByOwnerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMarginAccountsByOwnerResponse): QueryMarginAccountsByOwnerResponseProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.QueryMarginAccountsByOwnerResponse",
      value: QueryMarginAccountsByOwnerResponse.encode(message).finish()
    };
  }
};