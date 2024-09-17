//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
export enum PositionSide {
  POSITION_SIDE_SHORT = 0,
  POSITION_SIDE_LONG = 1,
  UNRECOGNIZED = -1,
}
export const PositionSideSDKType = PositionSide;
export const PositionSideAmino = PositionSide;
export function positionSideFromJSON(object: any): PositionSide {
  switch (object) {
    case 0:
    case "POSITION_SIDE_SHORT":
      return PositionSide.POSITION_SIDE_SHORT;
    case 1:
    case "POSITION_SIDE_LONG":
      return PositionSide.POSITION_SIDE_LONG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PositionSide.UNRECOGNIZED;
  }
}
export function positionSideToJSON(object: PositionSide): string {
  switch (object) {
    case PositionSide.POSITION_SIDE_SHORT:
      return "POSITION_SIDE_SHORT";
    case PositionSide.POSITION_SIDE_LONG:
      return "POSITION_SIDE_LONG";
    case PositionSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface PerpetualPosition {
  id: string;
  accountId: string;
  ticker: string;
  size: string;
  entryPrice: string;
  leverage: bigint;
  currentPrice: string;
  entryTime: bigint;
  unrealizedPL: string;
  side: PositionSide;
}
export interface PerpetualPositionProtoMsg {
  typeUrl: "/sphx.marginacc.PerpetualPosition";
  value: Uint8Array;
}
export interface PerpetualPositionAmino {
  id?: string;
  account_id?: string;
  ticker?: string;
  size: string;
  entry_price: string;
  leverage?: string;
  current_price: string;
  entry_time?: string;
  UnrealizedPL: string;
  side?: PositionSide;
}
export interface PerpetualPositionAminoMsg {
  type: "/sphx.marginacc.PerpetualPosition";
  value: PerpetualPositionAmino;
}
export interface PerpetualPositionSDKType {
  id: string;
  account_id: string;
  ticker: string;
  size: string;
  entry_price: string;
  leverage: bigint;
  current_price: string;
  entry_time: bigint;
  UnrealizedPL: string;
  side: PositionSide;
}
function createBasePerpetualPosition(): PerpetualPosition {
  return {
    id: "",
    accountId: "",
    ticker: "",
    size: "",
    entryPrice: "",
    leverage: BigInt(0),
    currentPrice: "",
    entryTime: BigInt(0),
    unrealizedPL: "",
    side: 0
  };
}
export const PerpetualPosition = {
  typeUrl: "/sphx.marginacc.PerpetualPosition",
  encode(message: PerpetualPosition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.accountId !== "") {
      writer.uint32(18).string(message.accountId);
    }
    if (message.ticker !== "") {
      writer.uint32(26).string(message.ticker);
    }
    if (message.size !== "") {
      writer.uint32(34).string(message.size);
    }
    if (message.entryPrice !== "") {
      writer.uint32(42).string(message.entryPrice);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(48).uint64(message.leverage);
    }
    if (message.currentPrice !== "") {
      writer.uint32(58).string(message.currentPrice);
    }
    if (message.entryTime !== BigInt(0)) {
      writer.uint32(64).uint64(message.entryTime);
    }
    if (message.unrealizedPL !== "") {
      writer.uint32(74).string(message.unrealizedPL);
    }
    if (message.side !== 0) {
      writer.uint32(80).int32(message.side);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PerpetualPosition {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerpetualPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.accountId = reader.string();
          break;
        case 3:
          message.ticker = reader.string();
          break;
        case 4:
          message.size = reader.string();
          break;
        case 5:
          message.entryPrice = reader.string();
          break;
        case 6:
          message.leverage = reader.uint64();
          break;
        case 7:
          message.currentPrice = reader.string();
          break;
        case 8:
          message.entryTime = reader.uint64();
          break;
        case 9:
          message.unrealizedPL = reader.string();
          break;
        case 10:
          message.side = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PerpetualPosition>): PerpetualPosition {
    const message = createBasePerpetualPosition();
    message.id = object.id ?? "";
    message.accountId = object.accountId ?? "";
    message.ticker = object.ticker ?? "";
    message.size = object.size ?? "";
    message.entryPrice = object.entryPrice ?? "";
    message.leverage = object.leverage !== undefined && object.leverage !== null ? BigInt(object.leverage.toString()) : BigInt(0);
    message.currentPrice = object.currentPrice ?? "";
    message.entryTime = object.entryTime !== undefined && object.entryTime !== null ? BigInt(object.entryTime.toString()) : BigInt(0);
    message.unrealizedPL = object.unrealizedPL ?? "";
    message.side = object.side ?? 0;
    return message;
  },
  fromAmino(object: PerpetualPositionAmino): PerpetualPosition {
    const message = createBasePerpetualPosition();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.account_id !== undefined && object.account_id !== null) {
      message.accountId = object.account_id;
    }
    if (object.ticker !== undefined && object.ticker !== null) {
      message.ticker = object.ticker;
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    }
    if (object.entry_price !== undefined && object.entry_price !== null) {
      message.entryPrice = object.entry_price;
    }
    if (object.leverage !== undefined && object.leverage !== null) {
      message.leverage = BigInt(object.leverage);
    }
    if (object.current_price !== undefined && object.current_price !== null) {
      message.currentPrice = object.current_price;
    }
    if (object.entry_time !== undefined && object.entry_time !== null) {
      message.entryTime = BigInt(object.entry_time);
    }
    if (object.UnrealizedPL !== undefined && object.UnrealizedPL !== null) {
      message.unrealizedPL = object.UnrealizedPL;
    }
    if (object.side !== undefined && object.side !== null) {
      message.side = object.side;
    }
    return message;
  },
  toAmino(message: PerpetualPosition): PerpetualPositionAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.account_id = message.accountId === "" ? undefined : message.accountId;
    obj.ticker = message.ticker === "" ? undefined : message.ticker;
    obj.size = message.size ?? "";
    obj.entry_price = message.entryPrice ?? "";
    obj.leverage = message.leverage !== BigInt(0) ? (message.leverage?.toString)() : undefined;
    obj.current_price = message.currentPrice ?? "";
    obj.entry_time = message.entryTime !== BigInt(0) ? (message.entryTime?.toString)() : undefined;
    obj.UnrealizedPL = message.unrealizedPL ?? "";
    obj.side = message.side === 0 ? undefined : message.side;
    return obj;
  },
  fromAminoMsg(object: PerpetualPositionAminoMsg): PerpetualPosition {
    return PerpetualPosition.fromAmino(object.value);
  },
  fromProtoMsg(message: PerpetualPositionProtoMsg): PerpetualPosition {
    return PerpetualPosition.decode(message.value);
  },
  toProto(message: PerpetualPosition): Uint8Array {
    return PerpetualPosition.encode(message).finish();
  },
  toProtoMsg(message: PerpetualPosition): PerpetualPositionProtoMsg {
    return {
      typeUrl: "/sphx.marginacc.PerpetualPosition",
      value: PerpetualPosition.encode(message).finish()
    };
  }
};