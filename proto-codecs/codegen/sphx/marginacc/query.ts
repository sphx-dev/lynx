//@ts-nocheck
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