import {
  FunctionComponent,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import TitleRow from "./TitleRow";
import { DepthVisualizerAsk, DepthVisualizerBid } from "./DepthVisualizer";
import PriceLevelRow from "./PriceLevelRow";
import {
  Asks,
  Bids,
  Container,
  TableContainer,
  TextContainer,
} from "./OrderBookStyle";
import { PriceLevelRowContainer } from "./PriceLevelRowStyle";
import { Stack, Text } from "../../components";
import Divider from "./Divider";
import { OrderType, OrderWithDepth } from "../../types/orderBook";
import { usePubSub } from "@/hooks/usePubSub";
import { useMarkets } from "@/hooks/useMarkets";
import { asksToState, orderToState } from "./helpers";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useOrderBookData } from "./useOrderBookData";

const HEADERS = ["price", "amount", "total"];
const MIN_RECORDS = 9;
const MAX_RECORDS = 20;

const OrderBook: FunctionComponent = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const asksBidsRef = useRef(null);
  const { data: book, isLoading } = useOrderBook(asksBidsRef);
  const { selectedMarket } = useMarkets();

  return (
    <Container ref={containerRef} data-testid="orderbook-tab">
      {!isLoading && (book?.bids?.length || book?.asks?.length) ? (
        <AsksBidsContainer
          data-testid="asks-and-bids-container"
          ref={asksBidsRef}
        >
          <TableContainer>
            <TitleRow titles={HEADERS} />
            <PriceLevelsWrapper>
              <PriceLevels
                // levels={book.asks.slice(0, records)}
                levels={book.asks}
                orderType={OrderType.ASKS}
              />
            </PriceLevelsWrapper>
          </TableContainer>
          <Divider spread={book.spread} percentage={book.spreadPercentage} />
          <TableContainer>
            <PriceLevelsWrapper>
              <PriceLevels
                // levels={book.bids.slice(
                //   book.bids.length - records >= 0
                //     ? book.bids.length - records
                //     : 0,
                //   book.bids.length
                // )}
                levels={book.bids}
                orderType={OrderType.BIDS}
              />
            </PriceLevelsWrapper>
          </TableContainer>
        </AsksBidsContainer>
      ) : (
        <Stack justify="center" align="center" style={{ flex: "1 0 auto" }}>
          <Text variant="textXLarge" color="soft400">
            {isLoading ? t("loading") : t("noData")}
          </Text>
        </Stack>
      )}
      {/* <div onClick={() => setSizeOption((x) => (x + 1) % 3)}>
        {sizeOption === 0 && (
          <BidsAsksSize bidsSize={book?.bids_size} asksSize={book?.asks_size} />
        )}
        {sizeOption === 1 && (
          <BidsAsksSize
            bidsSize={book?.bids_size_sum}
            asksSize={book?.asks_size_sum}
            formatFn={(value: number) => value.toFixed(2) + " " + symbol}
          />
        )}
        {sizeOption === 2 && (
          <BidsAsksSize
            bidsSize={book?.bids_size_sum_value}
            asksSize={book?.asks_size_sum_value}
            formatFn={formatDollars}
          />
        )}
        <StreamingInfo />
      </div> */}
    </Container>
  );
};

const MIN_SIDE = 27;
const MAX_SIDE = 100 - MIN_SIDE - MIN_SIDE;

const AsksBidsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 auto;
  height: calc(100vh - 375px);
  overflow: hidden;
`;

const PriceLevelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceLevels = ({
  levels,
  orderType = OrderType.BIDS,
}: {
  levels: OrderWithDepth[];
  orderType: OrderType;
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
        const amount: string = formatPriceInBook(level.amount);
        const amountSum: string = formatPriceInBook(level.amountSum);

        return (
          <PriceLevelRowContainer
            key={calculatedTotal}
            onClick={() => publish("PRICE_SELECTED", level.price.toFixed(6))}
          >
            {orderType === OrderType.BIDS ? (
              <DepthVisualizerBid
                key={calculatedTotal + "-bid"}
                style={{
                  ["--depth" as any]: `${depth}%`,
                  ["--filled" as any]: `${0}%`,
                }}
              />
            ) : (
              <DepthVisualizerAsk
                key={calculatedTotal + "ask"}
                style={{
                  ["--depth" as any]: `${depth}%`,
                  ["--filled" as any]: `${0}%`,
                }}
              />
            )}
            <PriceLevelRow
              key={size + total}
              // total={total}
              // size={size}
              total={total}
              size={size}
              amount={amount}
              amountSum={amountSum}
              price={price}
              orderType={orderType}
              reversedFieldsOrder={orderType === OrderType.ASKS}
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
    maximumFractionDigits: 2,
  });
};

const formatPriceInBook = (arg: number): string => {
  if (arg > 1_000_000_000) {
    return formatPrice(arg / 1_000_000_000) + "b";
  }
  if (arg > 1_000_000) {
    return formatPrice(arg / 1_000_000) + "m";
  }
  if (arg > 1_000) {
    return formatPrice(arg / 1_000) + "k";
  }
  return formatPrice(arg);
};

const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg);
};

export default OrderBook;

const useOrderBook = (ref: RefObject<HTMLDivElement>) => {
  const [records, setRecords] = useState(MIN_RECORDS);
  const { selectedMarket } = useMarkets();

  const responseData = useOrderBookData({ ticker: selectedMarket?.ticker });

  useLayoutEffect(() => {
    if (ref.current) {
      const winHeight = window.outerHeight - 168;
      const columnHeight = ref.current?.clientHeight - 75;
      const h = Math.min(winHeight, columnHeight);
      const r = Math.max(
        Math.min(Math.floor(h / 27 / 2), MAX_RECORDS)
        // MIN_RECORDS
      );

      console.log(r, h, ref.current?.clientHeight, window.outerHeight);

      setRecords(r ? r : MIN_RECORDS);
      // setRecords(20);
    }
  }, [responseData, ref]);

  return {
    ...responseData,
    data: parseOrderBokData(responseData.data, records),
  };
};

function parseOrderBokData(data: any, records: number = MIN_RECORDS) {
  let bidsSizeSum = 0;
  let bidsSizeSumValue = 0;
  data?.bids?.forEach((bid: any) => {
    bid.amount = Number(bid.quantity) * Number(bid.price);
    bidsSizeSum += Number(bid.quantity);
    bidsSizeSumValue += Number(bid.quantity) * Number(bid.price);
  });

  const bids = orderToState(data?.bids?.slice(0, records) ?? []);
  let asksSizeSum = 0;
  let asksSizeSumValue = 0;
  data?.asks?.forEach((ask: any) => {
    ask.amount = Number(ask.quantity) * Number(ask.price);
    asksSizeSum += Number(ask.quantity);
    asksSizeSumValue += Number(ask.quantity) * Number(ask.price);
  });

  const asks = asksToState(
    data?.asks?.slice(
      Math.max(0, data?.asks?.length - records),
      data?.asks?.length
    ) ?? []
  );

  const maxBid = bids.length ? bids[0].price : 0;
  const minAsk = asks.length ? asks[asks.length - 1].price : 0;
  const spread = Math.abs(maxBid - minAsk);
  const spreadPercentage = Math.abs(spread / maxBid) * 100;
  return {
    bids: bids ?? [],
    bids_size: data?.bids_size,
    bids_size_sum: bidsSizeSum,
    bids_size_sum_value: bidsSizeSumValue,
    asks: asks ?? [],
    asks_size: data?.asks_size,
    asks_size_sum: asksSizeSum,
    asks_size_sum_value: asksSizeSumValue,
    spread,
    spreadPercentage,
  };
}
