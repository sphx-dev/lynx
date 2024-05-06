export enum Side {
  Sell = "sell",
  Buy = "buy",
}
export interface Order {
  id: string;
  account_id: string;
  timestamp: string;
  quantity: string;
  price: string;
  sile: Side;
}

export interface AccountResponse {
  id: string;
  balance: string;
  open_orders: Order[];
  closed_orders: Order[];
}

export interface OrderResponse {
  account: AccountResponse;
  done: Order[] | null;
  partial_order: Order[] | null;
}

export interface LimitOrderResponse extends OrderResponse {
  order: Order[];
}
