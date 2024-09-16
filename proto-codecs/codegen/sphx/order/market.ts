//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
export enum MarketStatus {
  STATUS_UNSPECIFIED = 0,
  STATUS_ACTIVE = 1,
  STATUS_PAUSED = 2,
  STATUS_CANCEL_ONLY = 3,
  STATUS_POST_ONLY = 4,
  UNRECOGNIZED = -1,
}
export const MarketStatusSDKType = MarketStatus;
export const MarketStatusAmino = MarketStatus;
export function marketStatusFromJSON(object: any): MarketStatus {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return MarketStatus.STATUS_UNSPECIFIED;
    case 1:
    case "STATUS_ACTIVE":
      return MarketStatus.STATUS_ACTIVE;
    case 2:
    case "STATUS_PAUSED":
      return MarketStatus.STATUS_PAUSED;
    case 3:
    case "STATUS_CANCEL_ONLY":
      return MarketStatus.STATUS_CANCEL_ONLY;
    case 4:
    case "STATUS_POST_ONLY":
      return MarketStatus.STATUS_POST_ONLY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MarketStatus.UNRECOGNIZED;
  }
}
export function marketStatusToJSON(object: MarketStatus): string {
  switch (object) {
    case MarketStatus.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case MarketStatus.STATUS_ACTIVE:
      return "STATUS_ACTIVE";
    case MarketStatus.STATUS_PAUSED:
      return "STATUS_PAUSED";
    case MarketStatus.STATUS_CANCEL_ONLY:
      return "STATUS_CANCEL_ONLY";
    case MarketStatus.STATUS_POST_ONLY:
      return "STATUS_POST_ONLY";
    case MarketStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Market {
  id: number;
  ticker: string;
  baseAsset: string;
  quoteAsset: string;
  status: MarketStatus;
}
export interface MarketProtoMsg {
  typeUrl: "/sphx.order.Market";
  value: Uint8Array;
}
export interface MarketAmino {
  id?: number;
  ticker?: string;
  baseAsset?: string;
  quoteAsset?: string;
  status?: MarketStatus;
}
export interface MarketAminoMsg {
  type: "/sphx.order.Market";
  value: MarketAmino;
}
export interface MarketSDKType {
  id: number;
  ticker: string;
  baseAsset: string;
  quoteAsset: string;
  status: MarketStatus;
}
function createBaseMarket(): Market {
  return {
    id: 0,
    ticker: "",
    baseAsset: "",
    quoteAsset: "",
    status: 0
  };
}
export const Market = {
  typeUrl: "/sphx.order.Market",
  encode(message: Market, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.ticker !== "") {
      writer.uint32(18).string(message.ticker);
    }
    if (message.baseAsset !== "") {
      writer.uint32(26).string(message.baseAsset);
    }
    if (message.quoteAsset !== "") {
      writer.uint32(34).string(message.quoteAsset);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Market {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.ticker = reader.string();
          break;
        case 3:
          message.baseAsset = reader.string();
          break;
        case 4:
          message.quoteAsset = reader.string();
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Market>): Market {
    const message = createBaseMarket();
    message.id = object.id ?? 0;
    message.ticker = object.ticker ?? "";
    message.baseAsset = object.baseAsset ?? "";
    message.quoteAsset = object.quoteAsset ?? "";
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: MarketAmino): Market {
    const message = createBaseMarket();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.ticker !== undefined && object.ticker !== null) {
      message.ticker = object.ticker;
    }
    if (object.baseAsset !== undefined && object.baseAsset !== null) {
      message.baseAsset = object.baseAsset;
    }
    if (object.quoteAsset !== undefined && object.quoteAsset !== null) {
      message.quoteAsset = object.quoteAsset;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Market): MarketAmino {
    const obj: any = {};
    obj.id = message.id === 0 ? undefined : message.id;
    obj.ticker = message.ticker === "" ? undefined : message.ticker;
    obj.baseAsset = message.baseAsset === "" ? undefined : message.baseAsset;
    obj.quoteAsset = message.quoteAsset === "" ? undefined : message.quoteAsset;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: MarketAminoMsg): Market {
    return Market.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketProtoMsg): Market {
    return Market.decode(message.value);
  },
  toProto(message: Market): Uint8Array {
    return Market.encode(message).finish();
  },
  toProtoMsg(message: Market): MarketProtoMsg {
    return {
      typeUrl: "/sphx.order.Market",
      value: Market.encode(message).finish()
    };
  }
};