import { useEffect, FunctionComponent } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  getOrderBook,
  orderBook,
  OrderWithDepth,
} from "../../state/orderBookSlice";
import TitleRow from "./TitleRow";
import DepthVisualizer from "./DepthVisualizer";
import PriceLevelRow from "./PriceLevelRow";
import { Container, TableContainer } from "./OrderBookStyle";
import { PriceLevelRowContainer } from "./PriceLevelRowStyle";
import { MOBILE_WIDTH } from "../../constants";
import { Stack } from "../../components";
import Divider from "./Divider";

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {
  windowWidth: number;
}

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  const book = useAppSelector(orderBook);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(getOrderBook());
    }, 1000);
  }, []);

  const buildPriceLevels = (
    levels: OrderWithDepth[],
    orderType: OrderType = OrderType.BIDS
  ): React.ReactNode => {
    const sortedLevelsByPrice = levels
      .slice(0, 12)
      .sort(
        (currentLevel: OrderWithDepth, nextLevel: OrderWithDepth): number => {
          let result: number = 0;
          if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
            result = nextLevel.price - currentLevel.price;
          } else {
            result = nextLevel.price - currentLevel.price;
          }
          return result;
        }
      );

    return sortedLevelsByPrice.map((level, idx) => {
      const calculatedTotal: number = level.totalSum;
      const total: string = formatNumber(calculatedTotal);
      const depth = level.depth;
      const size: string = formatNumber(level.quantity);
      const price: string = formatPrice(level.price);

      return (
        <PriceLevelRowContainer key={idx + depth}>
          <DepthVisualizer
            key={depth}
            windowWidth={windowWidth}
            depth={depth}
            orderType={orderType}
          />
          <PriceLevelRow
            key={size + total}
            total={total}
            size={size}
            price={price}
            reversedFieldsOrder={orderType === OrderType.ASKS}
            windowWidth={windowWidth}
          />
        </PriceLevelRowContainer>
      );
    });
  };

  return (
    <Container>
      {book.bids.length && book.asks.length ? (
        <Stack style={{ width: "100%" }}>
          <TableContainer>
            {windowWidth > MOBILE_WIDTH && (
              <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false} />
            )}
            <div>{buildPriceLevels(book.asks, OrderType.ASKS)}</div>
          </TableContainer>
          <Divider />
          {/*<Spread bids={book.bids} asks={book.asks} />*/}
          <TableContainer>
            {/*<TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />*/}
            <div>{buildPriceLevels(book.bids, OrderType.BIDS)}</div>
          </TableContainer>
        </Stack>
      ) : (
        <div>
          <h1>NO DATA</h1>
        </div>
      )}
    </Container>
  );
};

const formatPrice = (arg: number): string => {
  return arg.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: 2,
  });
};

const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg);
};

export default OrderBook;
