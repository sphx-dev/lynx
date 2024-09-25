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
import { useResize } from "../../hooks/useResize";
import { usePubSub } from "@/hooks/usePubSub";

interface OrderBookProps {
  windowWidth: number;
}

const HEADERS = ["PRICE", "AMOUNT", "TOTAL"];

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  // console.info("rendering ORDERBOOK");

  const book = useAppSelector(orderBook);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const { height: windowHeight } = useResize();

  useEffect(() => {
    // TODO: get rid of this and implement it in CSS
    if (containerRef.current) {
      setHeight(getBoundingClientRect(containerRef.current).height);
    }
  }, [setHeight, windowHeight]);

  const records = getOrderBookRecords(height);
  useGetOrderBookQuery(records, {
    // pollingInterval: 10000,
    pollingInterval: 1000,
    skip: records <= 0,
  });

  const { publish } = usePubSub();

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
        <PriceLevelRowContainer
          key={idx + depth}
          onClick={() => publish("PRICE_SELECTED", level.price)}
        >
          <DepthVisualizer
            data-testid="depth-visualizer"
            key={depth}
            $depth={depth}
            $filled={0}
            $orderType={orderType}
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
    <Container ref={containerRef} data-test="orderbook-tab">
      <div>
        Bids: {book.bids_size}, Asks: {book.asks_size}
      </div>
      {book.bids.length || book.asks.length ? (
        <Stack style={{ width: "100%" }}>
          <TableContainer>
            {windowWidth > MOBILE_WIDTH && <TitleRow titles={HEADERS} />}
            <div>
              {buildPriceLevels(book.asks.slice(0, 10), OrderType.ASKS)}
            </div>
          </TableContainer>
          <Divider />
          {/*<Spread bids={book.bids} asks={book.asks} />*/}
          <TableContainer>
            {/*<TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />*/}
            <div>
              {buildPriceLevels(
                book.bids.slice(
                  book.bids.length - 10 >= 0 ? book.bids.length - 10 : 0,
                  book.bids.length
                ),
                OrderType.BIDS
              )}
            </div>
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
