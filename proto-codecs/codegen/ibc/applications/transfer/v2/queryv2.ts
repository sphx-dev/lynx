//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Denom, DenomAmino, DenomSDKType } from "./token";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * QueryDenomRequest is the request type for the Query/Denom RPC
 * method
 */
export interface QueryDenomRequest {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the on chain denomination. */
  hash: string;
}
export interface QueryDenomRequestProtoMsg {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomRequest";
  value: Uint8Array;
}
/**
 * QueryDenomRequest is the request type for the Query/Denom RPC
 * method
 */
export interface QueryDenomRequestAmino {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the on chain denomination. */
  hash?: string;
}
export interface QueryDenomRequestAminoMsg {
  type: "cosmos-sdk/QueryDenomRequest";
  value: QueryDenomRequestAmino;
}
/**
 * QueryDenomRequest is the request type for the Query/Denom RPC
 * method
 */
export interface QueryDenomRequestSDKType {
  hash: string;
}
/**
 * QueryDenomResponse is the response type for the Query/Denom RPC
 * method.
 */
export interface QueryDenomResponse {
  /** denom returns the requested denomination. */
  denom?: Denom;
}
export interface QueryDenomResponseProtoMsg {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomResponse";
  value: Uint8Array;
}
/**
 * QueryDenomResponse is the response type for the Query/Denom RPC
 * method.
 */
export interface QueryDenomResponseAmino {
  /** denom returns the requested denomination. */
  denom?: DenomAmino;
}
export interface QueryDenomResponseAminoMsg {
  type: "cosmos-sdk/QueryDenomResponse";
  value: QueryDenomResponseAmino;
}
/**
 * QueryDenomResponse is the response type for the Query/Denom RPC
 * method.
 */
export interface QueryDenomResponseSDKType {
  denom?: DenomSDKType;
}
/**
 * QueryDenomsRequest is the request type for the Query/Denoms RPC
 * method
 */
export interface QueryDenomsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}
export interface QueryDenomsRequestProtoMsg {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomsRequest";
  value: Uint8Array;
}
/**
 * QueryDenomsRequest is the request type for the Query/Denoms RPC
 * method
 */
export interface QueryDenomsRequestAmino {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequestAmino;
}
export interface QueryDenomsRequestAminoMsg {
  type: "cosmos-sdk/QueryDenomsRequest";
  value: QueryDenomsRequestAmino;
}
/**
 * QueryDenomsRequest is the request type for the Query/Denoms RPC
 * method
 */
export interface QueryDenomsRequestSDKType {
  pagination?: PageRequestSDKType;
}
/**
 * QueryDenomsResponse is the response type for the Query/Denoms RPC
 * method.
 */
export interface QueryDenomsResponse {
  /** denoms returns all denominations. */
  denoms: Denom[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}
export interface QueryDenomsResponseProtoMsg {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomsResponse";
  value: Uint8Array;
}
/**
 * QueryDenomsResponse is the response type for the Query/Denoms RPC
 * method.
 */
export interface QueryDenomsResponseAmino {
  /** denoms returns all denominations. */
  denoms?: DenomAmino[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponseAmino;
}
export interface QueryDenomsResponseAminoMsg {
  type: "cosmos-sdk/QueryDenomsResponse";
  value: QueryDenomsResponseAmino;
}
/**
 * QueryDenomsResponse is the response type for the Query/Denoms RPC
 * method.
 */
export interface QueryDenomsResponseSDKType {
  denoms: DenomSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryDenomRequest(): QueryDenomRequest {
  return {
    hash: ""
  };
}
export const QueryDenomRequest = {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomRequest",
  encode(message: QueryDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDenomRequest>): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    message.hash = object.hash ?? "";
    return message;
  },
  fromAmino(object: QueryDenomRequestAmino): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    return message;
  },
  toAmino(message: QueryDenomRequest): QueryDenomRequestAmino {
    const obj: any = {};
    obj.hash = message.hash === "" ? undefined : message.hash;
    return obj;
  },
  fromAminoMsg(object: QueryDenomRequestAminoMsg): QueryDenomRequest {
    return QueryDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDenomRequest): QueryDenomRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryDenomRequest",
      value: QueryDenomRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryDenomRequestProtoMsg): QueryDenomRequest {
    return QueryDenomRequest.decode(message.value);
  },
  toProto(message: QueryDenomRequest): Uint8Array {
    return QueryDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDenomRequest): QueryDenomRequestProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v2.QueryDenomRequest",
      value: QueryDenomRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDenomResponse(): QueryDenomResponse {
  return {
    denom: undefined
  };
}
export const QueryDenomResponse = {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomResponse",
  encode(message: QueryDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDenomResponse>): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom = object.denom !== undefined && object.denom !== null ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
  fromAmino(object: QueryDenomResponseAmino): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = Denom.fromAmino(object.denom);
    }
    return message;
  },
  toAmino(message: QueryDenomResponse): QueryDenomResponseAmino {
    const obj: any = {};
    obj.denom = message.denom ? Denom.toAmino(message.denom) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDenomResponseAminoMsg): QueryDenomResponse {
    return QueryDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDenomResponse): QueryDenomResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryDenomResponse",
      value: QueryDenomResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryDenomResponseProtoMsg): QueryDenomResponse {
    return QueryDenomResponse.decode(message.value);
  },
  toProto(message: QueryDenomResponse): Uint8Array {
    return QueryDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDenomResponse): QueryDenomResponseProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v2.QueryDenomResponse",
      value: QueryDenomResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDenomsRequest(): QueryDenomsRequest {
  return {
    pagination: undefined
  };
}
export const QueryDenomsRequest = {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomsRequest",
  encode(message: QueryDenomsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsRequest();
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
  fromPartial(object: Partial<QueryDenomsRequest>): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDenomsRequestAmino): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDenomsRequest): QueryDenomsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDenomsRequestAminoMsg): QueryDenomsRequest {
    return QueryDenomsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDenomsRequest): QueryDenomsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryDenomsRequest",
      value: QueryDenomsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryDenomsRequestProtoMsg): QueryDenomsRequest {
    return QueryDenomsRequest.decode(message.value);
  },
  toProto(message: QueryDenomsRequest): Uint8Array {
    return QueryDenomsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDenomsRequest): QueryDenomsRequestProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v2.QueryDenomsRequest",
      value: QueryDenomsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDenomsResponse(): QueryDenomsResponse {
  return {
    denoms: [],
    pagination: undefined
  };
}
export const QueryDenomsResponse = {
  typeUrl: "/ibc.applications.transfer.v2.QueryDenomsResponse",
  encode(message: QueryDenomsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(Denom.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryDenomsResponse>): QueryDenomsResponse {
    const message = createBaseQueryDenomsResponse();
    message.denoms = object.denoms?.map(e => Denom.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDenomsResponseAmino): QueryDenomsResponse {
    const message = createBaseQueryDenomsResponse();
    message.denoms = object.denoms?.map(e => Denom.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDenomsResponse): QueryDenomsResponseAmino {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e ? Denom.toAmino(e) : undefined);
    } else {
      obj.denoms = message.denoms;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDenomsResponseAminoMsg): QueryDenomsResponse {
    return QueryDenomsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDenomsResponse): QueryDenomsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryDenomsResponse",
      value: QueryDenomsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryDenomsResponseProtoMsg): QueryDenomsResponse {
    return QueryDenomsResponse.decode(message.value);
  },
  toProto(message: QueryDenomsResponse): Uint8Array {
    return QueryDenomsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDenomsResponse): QueryDenomsResponseProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v2.QueryDenomsResponse",
      value: QueryDenomsResponse.encode(message).finish()
    };
  }
};