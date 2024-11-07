import { FunctionComponent, useRef } from "react";
import TitleRow from "./TitleRow";
import { DepthVisualizerAsk, DepthVisualizerBid } from "./DepthVisualizer";
import PriceLevelRow from "./PriceLevelRow";
import { Container, TableContainer } from "./OrderBookStyle";
import { PriceLevelRowContainer } from "./PriceLevelRowStyle";
import { MOBILE_WIDTH } from "../../constants";
import { Stack, Text } from "../../components";
import Divider from "./Divider";
import { OrderType, OrderWithDepth } from "../../types/orderBook";
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
            key={idx}
            onClick={() => publish("PRICE_SELECTED", level.price.toFixed(6))}
          >
            {orderType === OrderType.BIDS ? (
              <DepthVisualizerBid
                key={idx + "-bid"}
                style={{
                  ["--depth" as any]: `${depth}%`,
                  ["--filled" as any]: `${0}%`,
                }}
              />
            ) : (
              <DepthVisualizerAsk
                key={idx + "ask"}
                style={{
                  ["--depth" as any]: `${depth}%`,
                  ["--filled" as any]: `${0}%`,
                }}
              />
            )}
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
      console.log("ORDERBOOK", data);

      const bids = orderToState(data?.bids?.slice(0, records) ?? []);
      const asks = asksToState(
        data?.asks?.slice(data?.asks?.length - records, data?.asks?.length) ??
          []
      );
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
