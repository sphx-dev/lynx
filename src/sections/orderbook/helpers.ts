import { Order, OrderWithDepth, OrderWithTotal } from "../../types/orderBook";
import Decimal from "decimal.js";
import { pipe } from "../../utils/pipe";
export const addTotalSums = (orders: Order<number>[]): OrderWithTotal[] => {
  const totalSums: number[] = [];
  let amountSum = 0;

  return orders.map((order, idx, orders) => {
    const { price, quantity } = order;
    const updatedLevel: OrderWithTotal = {
      ...order,
      totalSum: 0,
      amount: 0,
      amountSum: 0,
    };
    const totalSum: number =
      idx === 0 ? quantity : quantity + totalSums[idx - 1];
    updatedLevel.totalSum = totalSum;
    updatedLevel.amount = Number(price) * Number(quantity);
    amountSum += updatedLevel.amount;
    updatedLevel.amountSum = amountSum;
    totalSums.push(totalSum);
    return updatedLevel;
  });
};

export const addDepths = (orders: OrderWithTotal[]): OrderWithDepth[] => {
  const totalSums: number[] = orders.map(order => order.totalSum);
  const maxTotal = Math.max(...totalSums);
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

export const orderToState = (orders: Order<string>[]) =>
  pipe(orders, formatToNumbers, addTotalSums, addDepths, sortByPrice);

export const asksToState = (orders: Order<string>[]) =>
  // expect orders to be sorted 9-0 by price
  orderToState(orders.reverse());
