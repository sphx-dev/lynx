//@ts-nocheck
import { OrderId, OrderIdAmino, OrderIdSDKType, OrderSide, OrderType } from "./order";
import { BinaryReader, BinaryWriter } from "../../binary";
export enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0,
  ORDER_STATUS_OPEN = 1,
  ORDER_STATUS_PARTIALLY_FILLED = 2,
  ORDER_STATUS_FILLED = 3,
  ORDER_STATUS_CANCELED = 4,
  ORDER_STATUS_EXPIRED = 5,
  UNRECOGNIZED = -1,
}
export const OrderStatusSDKType = OrderStatus;
export const OrderStatusAmino = OrderStatus;
export function orderStatusFromJSON(object: any): OrderStatus {
  switch (object) {
    case 0:
    case "ORDER_STATUS_UNSPECIFIED":
      return OrderStatus.ORDER_STATUS_UNSPECIFIED;
    case 1:
    case "ORDER_STATUS_OPEN":
      return OrderStatus.ORDER_STATUS_OPEN;
    case 2:
    case "ORDER_STATUS_PARTIALLY_FILLED":
      return OrderStatus.ORDER_STATUS_PARTIALLY_FILLED;
    case 3:
    case "ORDER_STATUS_FILLED":
      return OrderStatus.ORDER_STATUS_FILLED;
    case 4:
    case "ORDER_STATUS_CANCELED":
      return OrderStatus.ORDER_STATUS_CANCELED;
    case 5:
    case "ORDER_STATUS_EXPIRED":
      return OrderStatus.ORDER_STATUS_EXPIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderStatus.UNRECOGNIZED;
  }
}
export function orderStatusToJSON(object: OrderStatus): string {
  switch (object) {
    case OrderStatus.ORDER_STATUS_UNSPECIFIED:
      return "ORDER_STATUS_UNSPECIFIED";
    case OrderStatus.ORDER_STATUS_OPEN:
      return "ORDER_STATUS_OPEN";
    case OrderStatus.ORDER_STATUS_PARTIALLY_FILLED:
      return "ORDER_STATUS_PARTIALLY_FILLED";
    case OrderStatus.ORDER_STATUS_FILLED:
      return "ORDER_STATUS_FILLED";
    case OrderStatus.ORDER_STATUS_CANCELED:
      return "ORDER_STATUS_CANCELED";
    case OrderStatus.ORDER_STATUS_EXPIRED:
      return "ORDER_STATUS_EXPIRED";
    case OrderStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Fill {
  /** Quantity of the fill */
  quantity: string;
  /** Price of the fill */
  price: string;
  /** Timestamp of the fill */
  timestamp: bigint;
  /** Leverage used for the fill */
  leverage: bigint;
}
export interface FillProtoMsg {
  typeUrl: "/sphx.order.Fill";
  value: Uint8Array;
}
export interface FillAmino {
  /** Quantity of the fill */
  quantity: string;
  /** Price of the fill */
  price: string;
  /** Timestamp of the fill */
  timestamp?: string;
  /** Leverage used for the fill */
  leverage?: string;
}
export interface FillAminoMsg {
  type: "/sphx.order.Fill";
  value: FillAmino;
}
export interface FillSDKType {
  quantity: string;
  price: string;
  timestamp: bigint;
  leverage: bigint;
}
export interface ValidatedOrder {
  /** OrderId is the order to be executed */
  id: OrderId;
  /** accountId is the margin account address to which the order belongs */
  accountId: string;
  /** Order side buy or sell */
  side: OrderSide;
  /** Quantity of the order */
  quantity: bigint;
  /** Price of the order */
  price: bigint;
  /** Order type limit, market etc */
  orderType: OrderType;
  /** Trigger price for stop loss, take profit */
  triggerPrice: bigint;
  /** Leverage used for the order */
  leverage: bigint;
  /** Timestamp of the order */
  timestamp: bigint;
  /** MarketId of the order */
  marketId: bigint;
  /** Status of the order, open, filled, cancelled etc */
  status: OrderStatus;
  /** List of partial fills if the order was partially filled or fully filled */
  fills: Fill[];
}
export interface ValidatedOrderProtoMsg {
  typeUrl: "/sphx.order.ValidatedOrder";
  value: Uint8Array;
}
export interface ValidatedOrderAmino {
  /** OrderId is the order to be executed */
  id?: OrderIdAmino;
  /** accountId is the margin account address to which the order belongs */
  accountId?: string;
  /** Order side buy or sell */
  side?: OrderSide;
  /** Quantity of the order */
  quantity?: string;
  /** Price of the order */
  price?: string;
  /** Order type limit, market etc */
  orderType?: OrderType;
  /** Trigger price for stop loss, take profit */
  triggerPrice?: string;
  /** Leverage used for the order */
  leverage?: string;
  /** Timestamp of the order */
  timestamp?: string;
  /** MarketId of the order */
  MarketId?: string;
  /** Status of the order, open, filled, cancelled etc */
  status?: OrderStatus;
  /** List of partial fills if the order was partially filled or fully filled */
  fills?: FillAmino[];
}
export interface ValidatedOrderAminoMsg {
  type: "/sphx.order.ValidatedOrder";
  value: ValidatedOrderAmino;
}
export interface ValidatedOrderSDKType {
  id: OrderIdSDKType;
  accountId: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  orderType: OrderType;
  triggerPrice: bigint;
  leverage: bigint;
  timestamp: bigint;
  MarketId: bigint;
  status: OrderStatus;
  fills: FillSDKType[];
}
function createBaseFill(): Fill {
  return {
    quantity: "",
    price: "",
    timestamp: BigInt(0),
    leverage: BigInt(0)
  };
}
export const Fill = {
  typeUrl: "/sphx.order.Fill",
  encode(message: Fill, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.quantity !== "") {
      writer.uint32(10).string(message.quantity);
    }
    if (message.price !== "") {
      writer.uint32(18).string(message.price);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(24).int64(message.timestamp);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(32).int64(message.leverage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Fill {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFill();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.quantity = reader.string();
          break;
        case 2:
          message.price = reader.string();
          break;
        case 3:
          message.timestamp = reader.int64();
          break;
        case 4:
          message.leverage = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Fill>): Fill {
    const message = createBaseFill();
    message.quantity = object.quantity ?? "";
    message.price = object.price ?? "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    message.leverage = object.leverage !== undefined && object.leverage !== null ? BigInt(object.leverage.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: FillAmino): Fill {
    const message = createBaseFill();
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = object.quantity;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    if (object.leverage !== undefined && object.leverage !== null) {
      message.leverage = BigInt(object.leverage);
    }
    return message;
  },
  toAmino(message: Fill): FillAmino {
    const obj: any = {};
    obj.quantity = message.quantity ?? "";
    obj.price = message.price ?? "";
    obj.timestamp = message.timestamp !== BigInt(0) ? (message.timestamp?.toString)() : undefined;
    obj.leverage = message.leverage !== BigInt(0) ? (message.leverage?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: FillAminoMsg): Fill {
    return Fill.fromAmino(object.value);
  },
  fromProtoMsg(message: FillProtoMsg): Fill {
    return Fill.decode(message.value);
  },
  toProto(message: Fill): Uint8Array {
    return Fill.encode(message).finish();
  },
  toProtoMsg(message: Fill): FillProtoMsg {
    return {
      typeUrl: "/sphx.order.Fill",
      value: Fill.encode(message).finish()
    };
  }
};
function createBaseValidatedOrder(): ValidatedOrder {
  return {
    id: OrderId.fromPartial({}),
    accountId: "",
    side: 0,
    quantity: BigInt(0),
    price: BigInt(0),
    orderType: 0,
    triggerPrice: BigInt(0),
    leverage: BigInt(0),
    timestamp: BigInt(0),
    marketId: BigInt(0),
    status: 0,
    fills: []
  };
}
export const ValidatedOrder = {
  typeUrl: "/sphx.order.ValidatedOrder",
  encode(message: ValidatedOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      OrderId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.accountId !== "") {
      writer.uint32(18).string(message.accountId);
    }
    if (message.side !== 0) {
      writer.uint32(24).int32(message.side);
    }
    if (message.quantity !== BigInt(0)) {
      writer.uint32(32).int64(message.quantity);
    }
    if (message.price !== BigInt(0)) {
      writer.uint32(40).int64(message.price);
    }
    if (message.orderType !== 0) {
      writer.uint32(48).int32(message.orderType);
    }
    if (message.triggerPrice !== BigInt(0)) {
      writer.uint32(56).int64(message.triggerPrice);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(64).int64(message.leverage);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(72).int64(message.timestamp);
    }
    if (message.marketId !== BigInt(0)) {
      writer.uint32(80).int64(message.marketId);
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    for (const v of message.fills) {
      Fill.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ValidatedOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatedOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = OrderId.decode(reader, reader.uint32());
          break;
        case 2:
          message.accountId = reader.string();
          break;
        case 3:
          message.side = reader.int32() as any;
          break;
        case 4:
          message.quantity = reader.int64();
          break;
        case 5:
          message.price = reader.int64();
          break;
        case 6:
          message.orderType = reader.int32() as any;
          break;
        case 7:
          message.triggerPrice = reader.int64();
          break;
        case 8:
          message.leverage = reader.int64();
          break;
        case 9:
          message.timestamp = reader.int64();
          break;
        case 10:
          message.marketId = reader.int64();
          break;
        case 11:
          message.status = reader.int32() as any;
          break;
        case 12:
          message.fills.push(Fill.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatedOrder>): ValidatedOrder {
    const message = createBaseValidatedOrder();
    message.id = object.id !== undefined && object.id !== null ? OrderId.fromPartial(object.id) : undefined;
    message.accountId = object.accountId ?? "";
    message.side = object.side ?? 0;
    message.quantity = object.quantity !== undefined && object.quantity !== null ? BigInt(object.quantity.toString()) : BigInt(0);
    message.price = object.price !== undefined && object.price !== null ? BigInt(object.price.toString()) : BigInt(0);
    message.orderType = object.orderType ?? 0;
    message.triggerPrice = object.triggerPrice !== undefined && object.triggerPrice !== null ? BigInt(object.triggerPrice.toString()) : BigInt(0);
    message.leverage = object.leverage !== undefined && object.leverage !== null ? BigInt(object.leverage.toString()) : BigInt(0);
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.status = object.status ?? 0;
    message.fills = object.fills?.map(e => Fill.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ValidatedOrderAmino): ValidatedOrder {
    const message = createBaseValidatedOrder();
    if (object.id !== undefined && object.id !== null) {
      message.id = OrderId.fromAmino(object.id);
    }
    if (object.accountId !== undefined && object.accountId !== null) {
      message.accountId = object.accountId;
    }
    if (object.side !== undefined && object.side !== null) {
      message.side = object.side;
    }
    if (object.quantity !== undefined && object.quantity !== null) {
      message.quantity = BigInt(object.quantity);
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = BigInt(object.price);
    }
    if (object.orderType !== undefined && object.orderType !== null) {
      message.orderType = object.orderType;
    }
    if (object.triggerPrice !== undefined && object.triggerPrice !== null) {
      message.triggerPrice = BigInt(object.triggerPrice);
    }
    if (object.leverage !== undefined && object.leverage !== null) {
      message.leverage = BigInt(object.leverage);
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    if (object.MarketId !== undefined && object.MarketId !== null) {
      message.marketId = BigInt(object.MarketId);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    message.fills = object.fills?.map(e => Fill.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ValidatedOrder): ValidatedOrderAmino {
    const obj: any = {};
    obj.id = message.id ? OrderId.toAmino(message.id) : undefined;
    obj.accountId = message.accountId === "" ? undefined : message.accountId;
    obj.side = message.side === 0 ? undefined : message.side;
    obj.quantity = message.quantity !== BigInt(0) ? (message.quantity?.toString)() : undefined;
    obj.price = message.price !== BigInt(0) ? (message.price?.toString)() : undefined;
    obj.orderType = message.orderType === 0 ? undefined : message.orderType;
    obj.triggerPrice = message.triggerPrice !== BigInt(0) ? (message.triggerPrice?.toString)() : undefined;
    obj.leverage = message.leverage !== BigInt(0) ? (message.leverage?.toString)() : undefined;
    obj.timestamp = message.timestamp !== BigInt(0) ? (message.timestamp?.toString)() : undefined;
    obj.MarketId = message.marketId !== BigInt(0) ? (message.marketId?.toString)() : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    if (message.fills) {
      obj.fills = message.fills.map(e => e ? Fill.toAmino(e) : undefined);
    } else {
      obj.fills = message.fills;
    }
    return obj;
  },
  fromAminoMsg(object: ValidatedOrderAminoMsg): ValidatedOrder {
    return ValidatedOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatedOrderProtoMsg): ValidatedOrder {
    return ValidatedOrder.decode(message.value);
  },
  toProto(message: ValidatedOrder): Uint8Array {
    return ValidatedOrder.encode(message).finish();
  },
  toProtoMsg(message: ValidatedOrder): ValidatedOrderProtoMsg {
    return {
      typeUrl: "/sphx.order.ValidatedOrder",
      value: ValidatedOrder.encode(message).finish()
    };
  }
};