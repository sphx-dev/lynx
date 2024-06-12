import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks";
import { orderBook } from "../../state/orderBookSlice";
import TitleRow from "./TitleRow";
import DepthVisualizer from "./DepthVisualizer";
import PriceLevelRow from "./PriceLevelRow";
import { Container, TableContainer } from "./OrderBookStyle";
import { PriceLevelRowContainer } from "./PriceLevelRowStyle";
import { MOBILE_WIDTH } from "../../constants";
import { Stack, Text } from "../../components";
import Divider from "./Divider";
import { useGetOrderBookQuery } from "../../utils/api/orderBookApi";
import { OrderType, OrderWithDepth } from "../../types/orderBook";
import getBoundingClientRect from "@popperjs/core/lib/dom-utils/getBoundingClientRect";
import { getOrderBookRecords } from "../../utils/helpers";

interface OrderBookProps {
  windowWidth: number;
}

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  const book = useAppSelector(orderBook);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(getBoundingClientRect(containerRef.current).height);
    }
  }, [containerRef.current]);

  const records = getOrderBookRecords(height);
  useGetOrderBookQuery(records, {
    pollingInterval: 1000,
    skip: records <= 0,
  });

  const buildPriceLevels = (
    levels: OrderWithDepth[],
    orderType: OrderType = OrderType.BIDS
  ): React.ReactNode => {
    return levels.map((level, idx) => {
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
    <Container ref={containerRef}>
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
        <Stack fullHeight justify="center" align="center">
          <Text variant="textXl" color="tertiary">
            NO DATA
          </Text>
        </Stack>
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
