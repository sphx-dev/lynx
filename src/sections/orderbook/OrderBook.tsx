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
import { useQuery } from "react-query";
import config from "@/config";
import { asksToState, orderToState } from "./helpers";
import styled from "styled-components";
import { useLocalStreaming } from "../chart/localStreaming";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { t } from "i18next";
import { formatDollars } from "@/utils/format";

const HEADERS = ["PRICE", "AMOUNT", "TOTAL"];
const MIN_RECORDS = 9;

const OrderBook: FunctionComponent = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const asksBidsRef = useRef(null);
  const { data: book, isLoading } = useOrderBook(asksBidsRef);
  const { selectedMarket } = useMarkets();
  const symbol = selectedMarket?.baseAsset;
  const [sizeOption, setSizeOption] = useState(0);

  return (
    <Container ref={containerRef} data-testid="orderbook-tab">
      {!isLoading && (book?.bids?.length || book?.asks?.length) ? (
        <AsksBidsContainer ref={asksBidsRef}>
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
          <Text variant="textXl" color="tertiary">
            {isLoading ? t("loading") : t("noData")}
          </Text>
        </Stack>
      )}
      <div onClick={() => setSizeOption(x => (x + 1) % 3)}>
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
      </div>
    </Container>
  );
};

const MIN_SIDE = 27;
const MAX_SIDE = 100 - MIN_SIDE - MIN_SIDE;
const BidsAsksSize = ({
  bidsSize,
  asksSize,
  formatFn,
}: {
  bidsSize: number;
  asksSize: number;
  formatFn?: (value: number) => string;
}) => {
  let bidsWidth = (bidsSize / (bidsSize + asksSize)) * MAX_SIDE + MIN_SIDE;
  let asksWidth = (asksSize / (bidsSize + asksSize)) * MAX_SIDE + MIN_SIDE;
  if (!bidsSize && !asksSize) {
    bidsWidth = 50;
    asksWidth = 50;
  }

  return (
    <div style={{ position: "relative", height: "20px", margin: "15px 0 7px" }}>
      <Bids style={{ width: bidsWidth + "%" }}></Bids>
      <Asks style={{ width: asksWidth + "%" }}></Asks>
      {!formatFn && (
        <TextContainer style={{ left: 0, width: "40px" }}>
          {t("bids")}
        </TextContainer>
      )}
      <TextContainer style={{ left: !formatFn ? "40px" : "5px" }}>
        {formatFn ? formatFn(bidsSize) : bidsSize}
      </TextContainer>
      {!formatFn && (
        <TextContainer style={{ right: 0, width: "40px" }}>
          {t("asks")}
        </TextContainer>
      )}
      <TextContainer style={{ right: !formatFn ? "40px" : "5px" }}>
        {formatFn ? formatFn(asksSize) : asksSize}
      </TextContainer>
    </div>
  );
};

const StreamingInfo = () => {
  const { t } = useTranslation();
  const data = useLocalStreaming();

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "10px" }}>
        {t(data?.ticker || "")}: {data?.p}
      </div>
      <div style={{ textAlign: "center", fontSize: "10px" }}>
        {dayjs(new Date((data?.t || 0) * 1000)).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </>
  );
};

const AsksBidsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 auto;
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
              total={amountSum}
              size={amount}
              price={price}
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

const BASE_API = config.VITE_API_URL;
const useOrderBook = (ref: RefObject<HTMLDivElement>) => {
  const [records, setRecords] = useState(MIN_RECORDS);
  const { selectedMarket } = useMarkets();

  const responseData = useOrderBookData({ ticker: selectedMarket?.ticker });

  useLayoutEffect(() => {
    if (ref.current) {
      const r = Math.floor((ref.current?.clientHeight - 60) / 26 / 2);
      setRecords(r ? r : MIN_RECORDS);
    }
  }, [responseData, ref]);

  return {
    ...responseData,
    data: parseOrderBokData(responseData.data, records),
  };
};

const useOrderBookData = ({ ticker }: { ticker: string | undefined }) => {
  const response = useQuery({
    queryKey: ["orderBook", ticker],
    queryFn: async () => {
      const res = await fetch(`${BASE_API}/orderbook/?ticker=${ticker}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    refetchInterval: 2000,

    enabled: !!ticker,
  });

  return response;
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
