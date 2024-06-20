import { Account, Side } from "./order";

export interface Order<T> {
  quantity: T;
  price: T;
  leverage: number;
}

export interface OrderWithTotal extends Order<number> {
  totalSum: number;
}
export interface OrderWithDepth extends OrderWithTotal {
  depth: number;
}

export interface OrderBookResponse {
  account: Account;
  asks: Order<string>[];
  bids: Order<string>[];
}

export enum OrderType {
  BIDS,
  ASKS,
}

export interface TradesItem {
  price: string;
  quantity: number;
  side: Side;
  date: string;
}
