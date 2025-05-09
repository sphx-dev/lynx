//@ts-nocheck
import { MarginAccountAsset, MarginAccountAssetAmino, MarginAccountAssetSDKType } from "./margin_account_asset";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MarginAccountId {
  owner: string;
  number: number;
}
export interface MarginAccountIdProtoMsg {
  typeUrl: "/sphx.marginacc.MarginAccountId";
  value: Uint8Array;
}
export interface MarginAccountIdAmino {
  owner?: string;
  number?: number;
}
export interface MarginAccountIdAminoMsg {
  type: "/sphx.marginacc.MarginAccountId";
  value: MarginAccountIdAmino;
}
export interface MarginAccountIdSDKType {
  owner: string;
  number: number;
}
export interface MarginAccountInfo {
  /** Margin account id. */
  id?: MarginAccountId;
  /** Margin account address. */
  address: string;
  /** List of addresses that can place orders on behalf of the margin account owner. */
  delegates: string[];
  /** Margin account assets. */
  assets: MarginAccountAsset[];
}
export interface MarginAccountInfoProtoMsg {
  typeUrl: "/sphx.marginacc.MarginAccountInfo";
  value: Uint8Array;
}
export interface MarginAccountInfoAmino {
  /** Margin account id. */
  id?: MarginAccountIdAmino;
  /** Margin account address. */
  address?: string;
  /** List of addresses that can place orders on behalf of the margin account owner. */
  delegates?: string[];
  /** Margin account assets. */
  assets?: MarginAccountAssetAmino[];
}
export interface MarginAccountInfoAminoMsg {
  type: "/sphx.marginacc.MarginAccountInfo";
  value: MarginAccountInfoAmino;
}
export interface MarginAccountInfoSDKType {
  id?: MarginAccountIdSDKType;
  address: string;
  delegates: string[];
  assets: MarginAccountAssetSDKType[];
}
function createBaseMarginAccountId(): MarginAccountId {
  return {
    owner: "",
    number: 0
  };
}
export const MarginAccountId = {
  typeUrl: "/sphx.marginacc.MarginAccountId",
  encode(message: MarginAccountId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.number !== 0) {
      writer.uint32(16).uint32(message.number);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarginAccountId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarginAccountId();
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
  fromPartial(object: Partial<MarginAccountId>): MarginAccountId {
    const message = createBaseMarginAccountId();
    message.owner = object.owner ?? "";
    message.number = object.number ?? 0;
    return message;
  },
  fromAmino(object: MarginAccountIdAmino): MarginAccountId {
    const message = createBaseMarginAccountId();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    }
    return message;
  },
  toAmino(message: MarginAccountId): MarginAccountIdAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.number = message.number === 0 ? undefined : message.number;
    return obj;
  },
  fromAminoMsg(object: MarginAccountIdAminoMsg): MarginAccountId {
    return MarginAccountId.fromAmino(object.value);
  },
  fromProtoMsg(message: MarginAccountIdProtoMsg): MarginAccountId {
    return MarginAccountId.decode(message.value);
  },
  toProto(message: MarginAccountId): Uint8Array {
    return MarginAccountId.encode(message).finish();
  },
  toProtoMsg(message: MarginAccountId): MarginAccountIdProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MarginAccountId",
      value: MarginAccountId.encode(message).finish()
    };
  }
};
function createBaseMarginAccountInfo(): MarginAccountInfo {
  return {
    id: undefined,
    address: "",
    delegates: [],
    assets: []
  };
}
export const MarginAccountInfo = {
  typeUrl: "/sphx.marginacc.MarginAccountInfo",
  encode(message: MarginAccountInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      MarginAccountId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    for (const v of message.delegates) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.assets) {
      MarginAccountAsset.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarginAccountInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarginAccountInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = MarginAccountId.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.delegates.push(reader.string());
          break;
        case 4:
          message.assets.push(MarginAccountAsset.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarginAccountInfo>): MarginAccountInfo {
    const message = createBaseMarginAccountInfo();
    message.id = object.id !== undefined && object.id !== null ? MarginAccountId.fromPartial(object.id) : undefined;
    message.address = object.address ?? "";
    message.delegates = object.delegates?.map(e => e) || [];
    message.assets = object.assets?.map(e => MarginAccountAsset.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MarginAccountInfoAmino): MarginAccountInfo {
    const message = createBaseMarginAccountInfo();
    if (object.id !== undefined && object.id !== null) {
      message.id = MarginAccountId.fromAmino(object.id);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    message.delegates = object.delegates?.map(e => e) || [];
    message.assets = object.assets?.map(e => MarginAccountAsset.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MarginAccountInfo): MarginAccountInfoAmino {
    const obj: any = {};
    obj.id = message.id ? MarginAccountId.toAmino(message.id) : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    if (message.delegates) {
      obj.delegates = message.delegates.map(e => e);
    } else {
      obj.delegates = message.delegates;
    }
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? MarginAccountAsset.toAmino(e) : undefined);
    } else {
      obj.assets = message.assets;
    }
    return obj;
  },
  fromAminoMsg(object: MarginAccountInfoAminoMsg): MarginAccountInfo {
    return MarginAccountInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: MarginAccountInfoProtoMsg): MarginAccountInfo {
    return MarginAccountInfo.decode(message.value);
  },
  toProto(message: MarginAccountInfo): Uint8Array {
    return MarginAccountInfo.encode(message).finish();
  },
  toProtoMsg(message: MarginAccountInfo): MarginAccountInfoProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MarginAccountInfo",
      value: MarginAccountInfo.encode(message).finish()
    };
  }
};