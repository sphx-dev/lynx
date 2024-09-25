//@ts-nocheck
import { OrderId, OrderIdAmino, OrderIdSDKType } from "./order";
import { BinaryReader, BinaryWriter } from "../../binary";
export enum PositionSide {
  POSITION_SIDE_UNSPECIFIED = 0,
  POSITION_SIDE_SHORT = 1,
  POSITION_SIDE_LONG = 2,
  UNRECOGNIZED = -1,
}
export const PositionSideSDKType = PositionSide;
export const PositionSideAmino = PositionSide;
export function positionSideFromJSON(object: any): PositionSide {
  switch (object) {
    case 0:
    case "POSITION_SIDE_UNSPECIFIED":
      return PositionSide.POSITION_SIDE_UNSPECIFIED;
    case 1:
    case "POSITION_SIDE_SHORT":
      return PositionSide.POSITION_SIDE_SHORT;
    case 2:
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
    case PositionSide.POSITION_SIDE_UNSPECIFIED:
      return "POSITION_SIDE_UNSPECIFIED";
    case PositionSide.POSITION_SIDE_SHORT:
      return "POSITION_SIDE_SHORT";
    case PositionSide.POSITION_SIDE_LONG:
      return "POSITION_SIDE_LONG";
    case PositionSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum PositionStatus {
  POSITION_STATUS_UNSPECIFIED = 0,
  POSITION_STATUS_OPEN = 1,
  POSITION_STATUS_CLOSED = 2,
  UNRECOGNIZED = -1,
}
export const PositionStatusSDKType = PositionStatus;
export const PositionStatusAmino = PositionStatus;
export function positionStatusFromJSON(object: any): PositionStatus {
  switch (object) {
    case 0:
    case "POSITION_STATUS_UNSPECIFIED":
      return PositionStatus.POSITION_STATUS_UNSPECIFIED;
    case 1:
    case "POSITION_STATUS_OPEN":
      return PositionStatus.POSITION_STATUS_OPEN;
    case 2:
    case "POSITION_STATUS_CLOSED":
      return PositionStatus.POSITION_STATUS_CLOSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PositionStatus.UNRECOGNIZED;
  }
}
export function positionStatusToJSON(object: PositionStatus): string {
  switch (object) {
    case PositionStatus.POSITION_STATUS_UNSPECIFIED:
      return "POSITION_STATUS_UNSPECIFIED";
    case PositionStatus.POSITION_STATUS_OPEN:
      return "POSITION_STATUS_OPEN";
    case PositionStatus.POSITION_STATUS_CLOSED:
      return "POSITION_STATUS_CLOSED";
    case PositionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface PerpetualPosition {
  id: string;
  marginAccount: string;
  marketId: bigint;
  size: string;
  entryPrice: string;
  leverage: bigint;
  entryTime: bigint;
  side: PositionSide;
  tpOrderId: OrderId;
  slOrderId: OrderId;
  status: PositionStatus;
}
export interface PerpetualPositionProtoMsg {
  typeUrl: "/sphx.order.PerpetualPosition";
  value: Uint8Array;
}
export interface PerpetualPositionAmino {
  id?: string;
  margin_account?: string;
  market_id?: string;
  size: string;
  entry_price: string;
  leverage?: string;
  entry_time?: string;
  side?: PositionSide;
  tp_order_id: OrderIdAmino;
  sl_order_id: OrderIdAmino;
  status?: PositionStatus;
}
export interface PerpetualPositionAminoMsg {
  type: "/sphx.order.PerpetualPosition";
  value: PerpetualPositionAmino;
}
export interface PerpetualPositionSDKType {
  id: string;
  margin_account: string;
  market_id: bigint;
  size: string;
  entry_price: string;
  leverage: bigint;
  entry_time: bigint;
  side: PositionSide;
  tp_order_id: OrderIdSDKType;
  sl_order_id: OrderIdSDKType;
  status: PositionStatus;
}
function createBasePerpetualPosition(): PerpetualPosition {
  return {
    id: "",
    marginAccount: "",
    marketId: BigInt(0),
    size: "",
    entryPrice: "",
    leverage: BigInt(0),
    entryTime: BigInt(0),
    side: 0,
    tpOrderId: OrderId.fromPartial({}),
    slOrderId: OrderId.fromPartial({}),
    status: 0
  };
}
export const PerpetualPosition = {
  typeUrl: "/sphx.order.PerpetualPosition",
  encode(message: PerpetualPosition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.marginAccount !== "") {
      writer.uint32(18).string(message.marginAccount);
    }
    if (message.marketId !== BigInt(0)) {
      writer.uint32(24).int64(message.marketId);
    }
    if (message.size !== "") {
      writer.uint32(34).string(message.size);
    }
    if (message.entryPrice !== "") {
      writer.uint32(42).string(message.entryPrice);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(48).int64(message.leverage);
    }
    if (message.entryTime !== BigInt(0)) {
      writer.uint32(56).int64(message.entryTime);
    }
    if (message.side !== 0) {
      writer.uint32(64).int32(message.side);
    }
    if (message.tpOrderId !== undefined) {
      OrderId.encode(message.tpOrderId, writer.uint32(74).fork()).ldelim();
    }
    if (message.slOrderId !== undefined) {
      OrderId.encode(message.slOrderId, writer.uint32(82).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
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
          message.marginAccount = reader.string();
          break;
        case 3:
          message.marketId = reader.int64();
          break;
        case 4:
          message.size = reader.string();
          break;
        case 5:
          message.entryPrice = reader.string();
          break;
        case 6:
          message.leverage = reader.int64();
          break;
        case 7:
          message.entryTime = reader.int64();
          break;
        case 8:
          message.side = reader.int32() as any;
          break;
        case 9:
          message.tpOrderId = OrderId.decode(reader, reader.uint32());
          break;
        case 10:
          message.slOrderId = OrderId.decode(reader, reader.uint32());
          break;
        case 11:
          message.status = reader.int32() as any;
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
    message.marginAccount = object.marginAccount ?? "";
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.size = object.size ?? "";
    message.entryPrice = object.entryPrice ?? "";
    message.leverage = object.leverage !== undefined && object.leverage !== null ? BigInt(object.leverage.toString()) : BigInt(0);
    message.entryTime = object.entryTime !== undefined && object.entryTime !== null ? BigInt(object.entryTime.toString()) : BigInt(0);
    message.side = object.side ?? 0;
    message.tpOrderId = object.tpOrderId !== undefined && object.tpOrderId !== null ? OrderId.fromPartial(object.tpOrderId) : undefined;
    message.slOrderId = object.slOrderId !== undefined && object.slOrderId !== null ? OrderId.fromPartial(object.slOrderId) : undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: PerpetualPositionAmino): PerpetualPosition {
    const message = createBasePerpetualPosition();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.margin_account !== undefined && object.margin_account !== null) {
      message.marginAccount = object.margin_account;
    }
    if (object.market_id !== undefined && object.market_id !== null) {
      message.marketId = BigInt(object.market_id);
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
    if (object.entry_time !== undefined && object.entry_time !== null) {
      message.entryTime = BigInt(object.entry_time);
    }
    if (object.side !== undefined && object.side !== null) {
      message.side = object.side;
    }
    if (object.tp_order_id !== undefined && object.tp_order_id !== null) {
      message.tpOrderId = OrderId.fromAmino(object.tp_order_id);
    }
    if (object.sl_order_id !== undefined && object.sl_order_id !== null) {
      message.slOrderId = OrderId.fromAmino(object.sl_order_id);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: PerpetualPosition): PerpetualPositionAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.margin_account = message.marginAccount === "" ? undefined : message.marginAccount;
    obj.market_id = message.marketId !== BigInt(0) ? (message.marketId?.toString)() : undefined;
    obj.size = message.size ?? "";
    obj.entry_price = message.entryPrice ?? "";
    obj.leverage = message.leverage !== BigInt(0) ? (message.leverage?.toString)() : undefined;
    obj.entry_time = message.entryTime !== BigInt(0) ? (message.entryTime?.toString)() : undefined;
    obj.side = message.side === 0 ? undefined : message.side;
    obj.tp_order_id = message.tpOrderId ? OrderId.toAmino(message.tpOrderId) : OrderId.toAmino(OrderId.fromPartial({}));
    obj.sl_order_id = message.slOrderId ? OrderId.toAmino(message.slOrderId) : OrderId.toAmino(OrderId.fromPartial({}));
    obj.status = message.status === 0 ? undefined : message.status;
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
      typeUrl: "/sphx.order.PerpetualPosition",
      value: PerpetualPosition.encode(message).finish()
    };
  }
};