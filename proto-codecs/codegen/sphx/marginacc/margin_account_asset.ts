//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MarginAccountAsset {
  id: number;
  denom: string;
  amount: string;
}
export interface MarginAccountAssetProtoMsg {
  typeUrl: "/sphx.marginacc.MarginAccountAsset";
  value: Uint8Array;
}
export interface MarginAccountAssetAmino {
  id?: number;
  denom?: string;
  amount: string;
}
export interface MarginAccountAssetAminoMsg {
  type: "/sphx.marginacc.MarginAccountAsset";
  value: MarginAccountAssetAmino;
}
export interface MarginAccountAssetSDKType {
  id: number;
  denom: string;
  amount: string;
}
function createBaseMarginAccountAsset(): MarginAccountAsset {
  return {
    id: 0,
    denom: "",
    amount: ""
  };
}
export const MarginAccountAsset = {
  typeUrl: "/sphx.marginacc.MarginAccountAsset",
  encode(message: MarginAccountAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MarginAccountAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarginAccountAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MarginAccountAsset>): MarginAccountAsset {
    const message = createBaseMarginAccountAsset();
    message.id = object.id ?? 0;
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MarginAccountAssetAmino): MarginAccountAsset {
    const message = createBaseMarginAccountAsset();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MarginAccountAsset): MarginAccountAssetAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount ?? "";
    return obj;
  },
  fromAminoMsg(object: MarginAccountAssetAminoMsg): MarginAccountAsset {
    return MarginAccountAsset.fromAmino(object.value);
  },
  fromProtoMsg(message: MarginAccountAssetProtoMsg): MarginAccountAsset {
    return MarginAccountAsset.decode(message.value);
  },
  toProto(message: MarginAccountAsset): Uint8Array {
    return MarginAccountAsset.encode(message).finish();
  },
  toProtoMsg(message: MarginAccountAsset): MarginAccountAssetProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.MarginAccountAsset",
      value: MarginAccountAsset.encode(message).finish()
    };
  }
};