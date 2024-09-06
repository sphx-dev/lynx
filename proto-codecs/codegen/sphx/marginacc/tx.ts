//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/sphx.marginacc.MsgUpdateParams";
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
  type: "sphx/x/marginacc/MsgUpdateParams";
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
  typeUrl: "/sphx.marginacc.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/sphx.marginacc.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgCreateMarginAccount {
  owner: string;
  number: number;
}
export interface MsgCreateMarginAccountProtoMsg {
  typeUrl: "/sphx.marginacc.MsgCreateMarginAccount";
  value: Uint8Array;
}
export interface MsgCreateMarginAccountAmino {
  owner?: string;
  number?: number;
}
export interface MsgCreateMarginAccountAminoMsg {
  type: "marginacc/MsgCreateMarginAccount";
  value: MsgCreateMarginAccountAmino;
}
export interface MsgCreateMarginAccountSDKType {
  owner: string;
  number: number;
}
export interface MsgCreateMarginAccountResponse {
  address: string;
}
export interface MsgCreateMarginAccountResponseProtoMsg {
  typeUrl: "/sphx.marginacc.MsgCreateMarginAccountResponse";
  value: Uint8Array;
}
export interface MsgCreateMarginAccountResponseAmino {
  address?: string;
}
export interface MsgCreateMarginAccountResponseAminoMsg {
  type: "/sphx.marginacc.MsgCreateMarginAccountResponse";
  value: MsgCreateMarginAccountResponseAmino;
}
export interface MsgCreateMarginAccountResponseSDKType {
  address: string;
}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({}),
  };
}
export const MsgUpdateParams = {
  typeUrl: "/sphx.marginacc.MsgUpdateParams",
  encode(
    message: MsgUpdateParams,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
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
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
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
    obj.params = message.params
      ? Params.toAmino(message.params)
      : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams): MsgUpdateParamsAminoMsg {
    return {
      type: "sphx/x/marginacc/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message),
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
      typeUrl: "/sphx.marginacc.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish(),
    };
  },
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/sphx.marginacc.MsgUpdateParamsResponse",
  encode(
    _: MsgUpdateParamsResponse,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): MsgUpdateParamsResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
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
  fromAminoMsg(
    object: MsgUpdateParamsResponseAminoMsg
  ): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(
    message: MsgUpdateParamsResponseProtoMsg
  ): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(
    message: MsgUpdateParamsResponse
  ): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish(),
    };
  },
};
function createBaseMsgCreateMarginAccount(): MsgCreateMarginAccount {
  return {
    owner: "",
    number: 0,
  };
}
export const MsgCreateMarginAccount = {
  typeUrl: "/sphx.marginacc.MsgCreateMarginAccount",
  encode(
    message: MsgCreateMarginAccount,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.number !== 0) {
      writer.uint32(16).uint32(message.number);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): MsgCreateMarginAccount {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMarginAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.number = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateMarginAccount>): MsgCreateMarginAccount {
    const message = createBaseMsgCreateMarginAccount();
    message.owner = object.owner ?? "";
    message.number = object.number ?? 0;
    return message;
  },
  fromAmino(object: MsgCreateMarginAccountAmino): MsgCreateMarginAccount {
    const message = createBaseMsgCreateMarginAccount();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    }
    return message;
  },
  toAmino(message: MsgCreateMarginAccount): MsgCreateMarginAccountAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.number = message.number === 0 ? undefined : message.number;
    return obj;
  },
  fromAminoMsg(object: MsgCreateMarginAccountAminoMsg): MsgCreateMarginAccount {
    return MsgCreateMarginAccount.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateMarginAccount): MsgCreateMarginAccountAminoMsg {
    return {
      type: "marginacc/MsgCreateMarginAccount",
      value: MsgCreateMarginAccount.toAmino(message),
    };
  },
  fromProtoMsg(
    message: MsgCreateMarginAccountProtoMsg
  ): MsgCreateMarginAccount {
    return MsgCreateMarginAccount.decode(message.value);
  },
  toProto(message: MsgCreateMarginAccount): Uint8Array {
    return MsgCreateMarginAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateMarginAccount): MsgCreateMarginAccountProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MsgCreateMarginAccount",
      value: MsgCreateMarginAccount.encode(message).finish(),
    };
  },
};
function createBaseMsgCreateMarginAccountResponse(): MsgCreateMarginAccountResponse {
  return {
    address: "",
  };
}
export const MsgCreateMarginAccountResponse = {
  typeUrl: "/sphx.marginacc.MsgCreateMarginAccountResponse",
  encode(
    message: MsgCreateMarginAccountResponse,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): MsgCreateMarginAccountResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMarginAccountResponse();
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
  fromPartial(
    object: Partial<MsgCreateMarginAccountResponse>
  ): MsgCreateMarginAccountResponse {
    const message = createBaseMsgCreateMarginAccountResponse();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(
    object: MsgCreateMarginAccountResponseAmino
  ): MsgCreateMarginAccountResponse {
    const message = createBaseMsgCreateMarginAccountResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(
    message: MsgCreateMarginAccountResponse
  ): MsgCreateMarginAccountResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(
    object: MsgCreateMarginAccountResponseAminoMsg
  ): MsgCreateMarginAccountResponse {
    return MsgCreateMarginAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(
    message: MsgCreateMarginAccountResponseProtoMsg
  ): MsgCreateMarginAccountResponse {
    return MsgCreateMarginAccountResponse.decode(message.value);
  },
  toProto(message: MsgCreateMarginAccountResponse): Uint8Array {
    return MsgCreateMarginAccountResponse.encode(message).finish();
  },
  toProtoMsg(
    message: MsgCreateMarginAccountResponse
  ): MsgCreateMarginAccountResponseProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MsgCreateMarginAccountResponse",
      value: MsgCreateMarginAccountResponse.encode(message).finish(),
    };
  },
};
