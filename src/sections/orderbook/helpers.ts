import { Order, OrderWithDepth, OrderWithTotal } from "../../types/orderBook";
import Decimal from "decimal.js";
export const addTotalSums = (orders: Order<number>[]): OrderWithTotal[] => {
  const totalSums: number[] = [];

  return orders.map((order, idx) => {
    const { quantity } = order;
    const updatedLevel: OrderWithTotal = { ...order, totalSum: 0 };
    const totalSum: number =
      idx === 0 ? quantity : quantity + totalSums[idx - 1];
    updatedLevel.totalSum = totalSum;
    totalSums.push(totalSum);
    return updatedLevel;
  });
};

export const addDepths = (orders: OrderWithTotal[]): OrderWithDepth[] => {
  const totalSums: number[] = orders.map(order => order.totalSum);
  const maxTotal = Math.max.apply(Math, totalSums);
  return orders.map(order => {
    const calculatedTotal: number = order.totalSum;
    const depth = (calculatedTotal / maxTotal) * 100;
    const updatedOrder: OrderWithDepth = { ...order, depth: 0 };
    updatedOrder.depth = depth;
    return updatedOrder;
  });
};

export const formatToNumbers = (orders: Order<string>[]): Order<number>[] =>
  orders.map(bind => ({
    quantity: +bind.quantity,
    price: +bind.price,
    leverage: bind.leverage,
  }));

export const getSpread = (bids: OrderWithDepth[], asks: OrderWithDepth[]) => {
  try {
    const x = new Decimal(asks[asks.length - 1].price);
    const y = new Decimal(bids[0].price);
    return x.minus(y).toNumber();
  } catch (e) {
    return 0;
  }
};

export const getPercentage = (
  bids: OrderWithDepth[],
  asks: OrderWithDepth[],
  spread: number
) => {
  try {
    const x = new Decimal(asks[asks.length - 1].price);
    const y = new Decimal(bids[0].price);
    const z = new Decimal(spread);
    const midPrice = x.plus(y).dividedBy(2);
    return z.dividedBy(midPrice).mul(100).toDecimalPlaces(3).toNumber();
  } catch (e) {
    return 0;
  }
};

export const sortByPrice = (orders: OrderWithDepth[]) => {
  return orders.sort(
    (currentLevel: OrderWithDepth, nextLevel: OrderWithDepth): number =>
      nextLevel.price - currentLevel.price
  );
};
