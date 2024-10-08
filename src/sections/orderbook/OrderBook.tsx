import { FunctionComponent, useRef } from "react";
// import { useAppSelector } from "../../hooks";
// import { orderBook } from "../../state/orderBookSlice";
import TitleRow from "./TitleRow";
import DepthVisualizer from "./DepthVisualizer";
import PriceLevelRow from "./PriceLevelRow";
import { Container, TableContainer } from "./OrderBookStyle";
import { PriceLevelRowContainer } from "./PriceLevelRowStyle";
import { MOBILE_WIDTH } from "../../constants";
import { Stack, Text } from "../../components";
import Divider from "./Divider";
// import { useGetOrderBookQuery } from "../../utils/api/orderBookApi";
import { OrderType, OrderWithDepth } from "../../types/orderBook";
// import getBoundingClientRect from "@popperjs/core/lib/dom-utils/getBoundingClientRect";
// import { getOrderBookRecords } from "../../utils/helpers";
// import { useResize } from "../../hooks/useResize";
import { usePubSub } from "@/hooks/usePubSub";
import { useMarkets } from "@/hooks/useMarkets";
import { useQuery } from "react-query";
import config from "@/config";
import { asksToState, orderToState } from "./helpers";
import styled from "styled-components";

interface OrderBookProps {
  windowWidth: number;
}

const HEADERS = ["PRICE", "AMOUNT", "TOTAL"];
const records = 9;

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  const containerRef = useRef(null);

  const { data: book, isLoading } = useOrderBook(records);

  return (
    <Container ref={containerRef} data-testid="orderbook-tab">
      {/* {(!book || isLoading) && <Text>Loading...</Text>} */}

      {!isLoading && (book?.bids?.length || book?.asks?.length) ? (
        <Stack style={{ width: "100%" }}>
          <TableContainer>
            {windowWidth > MOBILE_WIDTH && <TitleRow titles={HEADERS} />}
            <PriceLevelsWrapper>
              <PriceLevels
                levels={book.asks.slice(0, records)}
                orderType={OrderType.ASKS}
                windowWidth={windowWidth}
              />
            </PriceLevelsWrapper>
          </TableContainer>
          <Divider spread={book.spread} percentage={book.spreadPercentage} />
          <TableContainer>
            {/*<TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />*/}
            <PriceLevelsWrapper>
              <PriceLevels
                levels={book.bids.slice(
                  book.bids.length - records >= 0
                    ? book.bids.length - records
                    : 0,
                  book.bids.length
                )}
                orderType={OrderType.BIDS}
                windowWidth={windowWidth}
              />
            </PriceLevelsWrapper>
          </TableContainer>
        </Stack>
      ) : (
        <Stack fullHeight justify="center" align="center">
          <Text variant="textXl" color="tertiary">
            NO DATA
          </Text>
        </Stack>
      )}
      <div style={{ textAlign: "center" }}>
        Bids: {book?.bids_size}, Asks: {book?.asks_size}
      </div>
    </Container>
  );
};

const PriceLevelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceLevels = ({
  levels,
  orderType = OrderType.BIDS,
  windowWidth,
}: {
  levels: OrderWithDepth[];
  orderType: OrderType;
  windowWidth: number;
}) => {
  const { publish } = usePubSub();

  return (
    <>
      {levels.map((level, idx) => {
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
      })}
    </>
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

const BASE_API = config.VITE_API_URL;
const useOrderBook = (records: number) => {
  const { selectedMarket } = useMarkets();

  const response = useQuery({
    queryKey: ["orderBook", selectedMarket?.ticker, records],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_API}/orderbook/?ticker=${selectedMarket?.ticker}`
      );
      const data = await res.json();

      const bids = orderToState(data?.bids?.slice(0, records) ?? []);
      const asks = asksToState(data?.asks?.slice(0, records) ?? []);
      const maxBid = bids.length ? bids[0].price : 0;
      const minAsk = asks.length ? asks[0].price : 0;
      const spread = Math.abs(maxBid - minAsk);
      const spreadPercentage = Math.abs(spread / maxBid) * 100;
      return {
        bids: bids ?? [],
        bids_size: data?.bids_size,
        asks: asks ?? [],
        asks_size: data?.asks_size,
        spread,
        spreadPercentage,
      };
    },
    refetchInterval: 2000,

    enabled: !!selectedMarket?.ticker,
  });

  return response;
};
