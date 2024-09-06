//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
export enum OrderSide {
  ORDER_SIDE_SELL = 0,
  ORDER_SIDE_BUY = 1,
  UNRECOGNIZED = -1,
}
export const OrderSideSDKType = OrderSide;
export const OrderSideAmino = OrderSide;
export function orderSideFromJSON(object: any): OrderSide {
  switch (object) {
    case 0:
    case "ORDER_SIDE_SELL":
      return OrderSide.ORDER_SIDE_SELL;
    case 1:
    case "ORDER_SIDE_BUY":
      return OrderSide.ORDER_SIDE_BUY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderSide.UNRECOGNIZED;
  }
}
export function orderSideToJSON(object: OrderSide): string {
  switch (object) {
    case OrderSide.ORDER_SIDE_SELL:
      return "ORDER_SIDE_SELL";
    case OrderSide.ORDER_SIDE_BUY:
      return "ORDER_SIDE_BUY";
    case OrderSide.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum OrderType {
  ORDER_TYPE_LIMIT = 0,
  ORDER_TYPE_MARKET = 1,
  ORDER_TYPE_STOP_LOSS_MARKET = 2,
  ORDER_TYPE_STOP_LOSS_LIMIT = 3,
  ORDER_TYPE_TAKE_PROFIT_MARKET = 4,
  ORDER_TYPE_TAKE_PROFIT_LIMIT = 5,
  UNRECOGNIZED = -1,
}
export const OrderTypeSDKType = OrderType;
export const OrderTypeAmino = OrderType;
export function orderTypeFromJSON(object: any): OrderType {
  switch (object) {
    case 0:
    case "ORDER_TYPE_LIMIT":
      return OrderType.ORDER_TYPE_LIMIT;
    case 1:
    case "ORDER_TYPE_MARKET":
      return OrderType.ORDER_TYPE_MARKET;
    case 2:
    case "ORDER_TYPE_STOP_LOSS_MARKET":
      return OrderType.ORDER_TYPE_STOP_LOSS_MARKET;
    case 3:
    case "ORDER_TYPE_STOP_LOSS_LIMIT":
      return OrderType.ORDER_TYPE_STOP_LOSS_LIMIT;
    case 4:
    case "ORDER_TYPE_TAKE_PROFIT_MARKET":
      return OrderType.ORDER_TYPE_TAKE_PROFIT_MARKET;
    case 5:
    case "ORDER_TYPE_TAKE_PROFIT_LIMIT":
      return OrderType.ORDER_TYPE_TAKE_PROFIT_LIMIT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderType.UNRECOGNIZED;
  }
}
export function orderTypeToJSON(object: OrderType): string {
  switch (object) {
    case OrderType.ORDER_TYPE_LIMIT:
      return "ORDER_TYPE_LIMIT";
    case OrderType.ORDER_TYPE_MARKET:
      return "ORDER_TYPE_MARKET";
    case OrderType.ORDER_TYPE_STOP_LOSS_MARKET:
      return "ORDER_TYPE_STOP_LOSS_MARKET";
    case OrderType.ORDER_TYPE_STOP_LOSS_LIMIT:
      return "ORDER_TYPE_STOP_LOSS_LIMIT";
    case OrderType.ORDER_TYPE_TAKE_PROFIT_MARKET:
      return "ORDER_TYPE_TAKE_PROFIT_MARKET";
    case OrderType.ORDER_TYPE_TAKE_PROFIT_LIMIT:
      return "ORDER_TYPE_TAKE_PROFIT_LIMIT";
    case OrderType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface OrderId {
  /** Margin Account Address to which the order belongs */
  marginAccountAddress: string;
  /** Order number to uniquely identify the order in the margin account, not globally */
  number: number;
}
export interface OrderIdProtoMsg {
  typeUrl: "/sphx.order.OrderId";
  value: Uint8Array;
}
export interface OrderIdAmino {
  /** Margin Account Address to which the order belongs */
  marginAccountAddress?: string;
  /** Order number to uniquely identify the order in the margin account, not globally */
  number?: number;
}
export interface OrderIdAminoMsg {
  type: "/sphx.order.OrderId";
  value: OrderIdAmino;
}
export interface OrderIdSDKType {
  marginAccountAddress: string;
  number: number;
}
export interface Order {
  id: OrderId;
  /** Do we need to store the account id in the order, or order id is enough? */
  accountId: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  orderType: OrderType;
  triggerPrice: bigint;
  leverage: bigint;
  timestamp: bigint;
  /** The market id to which the order belongs e.g. BTC/USDC */
  MarketId: string;
}
export interface OrderProtoMsg {
  typeUrl: "/sphx.order.Order";
  value: Uint8Array;
}
export interface OrderAmino {
  id?: OrderIdAmino;
  /** Do we need to store the account id in the order, or order id is enough? */
  accountId?: string;
  side?: OrderSide;
  quantity?: string;
  price?: string;
  orderType?: OrderType;
  triggerPrice?: string;
  leverage?: string;
  timestamp?: string;
  /** The market id to which the order belongs e.g. BTC/USDC */
  MarketId?: string;
}
export interface OrderAminoMsg {
  type: "/sphx.order.Order";
  value: OrderAmino;
}
export interface OrderSDKType {
  id: OrderIdSDKType;
  accountId: string;
  side: OrderSide;
  quantity: bigint;
  price: bigint;
  orderType: OrderType;
  triggerPrice: bigint;
  leverage: bigint;
  timestamp: bigint;
  MarketId: string;
}
function createBaseOrderId(): OrderId {
  return {
    marginAccountAddress: "",
    number: 0,
  };
}
export const OrderId = {
  typeUrl: "/sphx.order.OrderId",
  encode(
    message: OrderId,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.marginAccountAddress !== "") {
      writer.uint32(10).string(message.marginAccountAddress);
    }
    if (message.number !== 0) {
      writer.uint32(16).uint32(message.number);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OrderId {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marginAccountAddress = reader.string();
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
  fromPartial(object: Partial<OrderId>): OrderId {
    const message = createBaseOrderId();
    message.marginAccountAddress = object.marginAccountAddress ?? "";
    message.number = object.number ?? 0;
    return message;
  },
  fromAmino(object: OrderIdAmino): OrderId {
    const message = createBaseOrderId();
    if (
      object.marginAccountAddress !== undefined &&
      object.marginAccountAddress !== null
    ) {
      message.marginAccountAddress = object.marginAccountAddress;
    }
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    }
    return message;
  },
  toAmino(message: OrderId): OrderIdAmino {
    const obj: any = {};
    obj.marginAccountAddress =
      message.marginAccountAddress === ""
        ? undefined
        : message.marginAccountAddress;
    obj.number = message.number === 0 ? undefined : message.number;
    return obj;
  },
  fromAminoMsg(object: OrderIdAminoMsg): OrderId {
    return OrderId.fromAmino(object.value);
  },
  fromProtoMsg(message: OrderIdProtoMsg): OrderId {
    return OrderId.decode(message.value);
  },
  toProto(message: OrderId): Uint8Array {
    return OrderId.encode(message).finish();
  },
  toProtoMsg(message: OrderId): OrderIdProtoMsg {
    return {
      typeUrl: "/sphx.order.OrderId",
      value: OrderId.encode(message).finish(),
    };
  },
};
function createBaseOrder(): Order {
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
    MarketId: "",
  };
}
export const Order = {
  typeUrl: "/sphx.order.Order",
  encode(
    message: Order,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
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
      writer.uint32(32).uint64(message.quantity);
    }
    if (message.price !== BigInt(0)) {
      writer.uint32(40).uint64(message.price);
    }
    if (message.orderType !== 0) {
      writer.uint32(48).int32(message.orderType);
    }
    if (message.triggerPrice !== BigInt(0)) {
      writer.uint32(56).uint64(message.triggerPrice);
    }
    if (message.leverage !== BigInt(0)) {
      writer.uint32(64).uint64(message.leverage);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(72).uint64(message.timestamp);
    }
    if (message.MarketId !== "") {
      writer.uint32(82).string(message.MarketId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Order {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
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
          message.quantity = reader.uint64();
          break;
        case 5:
          message.price = reader.uint64();
          break;
        case 6:
          message.orderType = reader.int32() as any;
          break;
        case 7:
          message.triggerPrice = reader.uint64();
          break;
        case 8:
          message.leverage = reader.uint64();
          break;
        case 9:
          message.timestamp = reader.uint64();
          break;
        case 10:
          message.MarketId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Order>): Order {
    const message = createBaseOrder();
    message.id =
      object.id !== undefined && object.id !== null
        ? OrderId.fromPartial(object.id)
        : undefined;
    message.accountId = object.accountId ?? "";
    message.side = object.side ?? 0;
    message.quantity =
      object.quantity !== undefined && object.quantity !== null
        ? BigInt(object.quantity.toString())
        : BigInt(0);
    message.price =
      object.price !== undefined && object.price !== null
        ? BigInt(object.price.toString())
        : BigInt(0);
    message.orderType = object.orderType ?? 0;
    message.triggerPrice =
      object.triggerPrice !== undefined && object.triggerPrice !== null
        ? BigInt(object.triggerPrice.toString())
        : BigInt(0);
    message.leverage =
      object.leverage !== undefined && object.leverage !== null
        ? BigInt(object.leverage.toString())
        : BigInt(0);
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? BigInt(object.timestamp.toString())
        : BigInt(0);
    message.MarketId = object.MarketId ?? "";
    return message;
  },
  fromAmino(object: OrderAmino): Order {
    const message = createBaseOrder();
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
      message.MarketId = object.MarketId;
    }
    return message;
  },
  toAmino(message: Order): OrderAmino {
    const obj: any = {};
    obj.id = message.id ? OrderId.toAmino(message.id) : undefined;
    obj.accountId = message.accountId === "" ? undefined : message.accountId;
    obj.side = message.side === 0 ? undefined : message.side;
    obj.quantity =
      message.quantity !== BigInt(0) ? message.quantity.toString() : undefined;
    obj.price =
      message.price !== BigInt(0) ? message.price.toString() : undefined;
    obj.orderType = message.orderType === 0 ? undefined : message.orderType;
    obj.triggerPrice =
      message.triggerPrice !== BigInt(0)
        ? message.triggerPrice.toString()
        : undefined;
    obj.leverage =
      message.leverage !== BigInt(0) ? message.leverage.toString() : undefined;
    obj.timestamp =
      message.timestamp !== BigInt(0)
        ? message.timestamp.toString()
        : undefined;
    obj.MarketId = message.MarketId === "" ? undefined : message.MarketId;
    return obj;
  },
  fromAminoMsg(object: OrderAminoMsg): Order {
    return Order.fromAmino(object.value);
  },
  fromProtoMsg(message: OrderProtoMsg): Order {
    return Order.decode(message.value);
  },
  toProto(message: Order): Uint8Array {
    return Order.encode(message).finish();
  },
  toProtoMsg(message: Order): OrderProtoMsg {
    return {
      typeUrl: "/sphx.order.Order",
      value: Order.encode(message).finish(),
    };
  },
};
