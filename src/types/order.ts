export enum Side {
  Sell = "sell",
  Buy = "buy",
}
export interface Order {
  id: string;
  accountId: string;
  timestamp: string;
  quantity: string;
  price: string;
  sile: Side;
}

export interface Account {
  id: string;
  balance: string;
  openOrders: Order[];
  closedOrders: Order[];
}

export interface OrderResponse {
  account: Account;
  done: Order[] | null;
  partialOrder: Order[] | null;
}

export interface LimitOrderResponse extends OrderResponse {
  order: Order[];
}

export interface OrderMutation {
  isBuy: boolean;
  volume: number;
  leverage: number;
  orderType: OrderType;
  triggerPrice?: number;
}

export interface LimitOrderMutation extends OrderMutation {
  price: number;
  leverage: number;
}

export interface Position {
  accountId: string;
  currentPrice: string;
  entryPrice: string;
  id: string;
  leverage: number;
  size: string;
  ticker: string;
  unrealizedPl: string;
}

export enum OrderSide {
  buy = "buy",
  sell = "sell",
}

export enum OrderType {
  LIMIT = "limit",
  MARKET = "market",
  STOP_LOSS_MARKET = "stop_loss_market",
  STOP_LOSS_LIMIT = "stop_loss_limit",
  TAKE_PROFIT_MARKET = "take_profit_market",
  TAKE_PROFIT_LIMIT = "take_profit_limit",
}
