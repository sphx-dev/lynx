//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MarginAccountAsset {
  id: number;
  amount: string;
}
export interface MarginAccountAssetProtoMsg {
  typeUrl: "/sphx.marginacc.MarginAccountAsset";
  value: Uint8Array;
}
export interface MarginAccountAssetAmino {
  id?: number;
  amount: string;
}
export interface MarginAccountAssetAminoMsg {
  type: "/sphx.marginacc.MarginAccountAsset";
  value: MarginAccountAssetAmino;
}
export interface MarginAccountAssetSDKType {
  id: number;
  amount: string;
}
function createBaseMarginAccountAsset(): MarginAccountAsset {
  return {
    id: 0,
    amount: "",
  };
}
export const MarginAccountAsset = {
  typeUrl: "/sphx.marginacc.MarginAccountAsset",
  encode(
    message: MarginAccountAsset,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): MarginAccountAsset {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarginAccountAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
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
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MarginAccountAssetAmino): MarginAccountAsset {
    const message = createBaseMarginAccountAsset();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MarginAccountAsset): MarginAccountAssetAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
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
      value: MarginAccountAsset.encode(message).finish(),
    };
  },
};
