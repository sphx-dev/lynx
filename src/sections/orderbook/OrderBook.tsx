import { FunctionComponent, useRef } from "react";
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
import { useLocalStreaming } from "../chart/localStreaming";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface OrderBookProps {
  windowWidth: number;
}

const HEADERS = ["PRICE", "AMOUNT", "TOTAL"];
const records = 9;

const OrderBook: FunctionComponent<OrderBookProps> = ({ windowWidth }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { data: book, isLoading } = useOrderBook(records);

  return (
    <Container ref={containerRef} data-testid="orderbook-tab">
      {!isLoading && (book?.bids?.length || book?.asks?.length) ? (
        <Stack style={{ width: "100%", flex: "1 0 auto" }}>
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
        <Stack justify="center" align="center" style={{ flex: "1 0 auto" }}>
          <Text variant="textXl" color="tertiary">
            {isLoading ? t("loading") : t("noData")}
          </Text>
        </Stack>
      )}
      <div>
        <BidsAsksSize bidsSize={book?.bids_size} asksSize={book?.asks_size} />
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
}: {
  bidsSize: number;
  asksSize: number;
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
      <TextContainer style={{ left: 0, width: "40px" }}>Bids</TextContainer>
      <TextContainer style={{ left: "40px" }}>{bidsSize}</TextContainer>
      <TextContainer style={{ right: 0, width: "40px" }}>Asks</TextContainer>
      <TextContainer style={{ right: "40px" }}>{asksSize}</TextContainer>
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
        `${BASE_API}/orderbook/?ticker=${selectedMarket?.ticker}`,
        { credentials: "include" }
      );
      const data = await res.json();

      const bids = orderToState(data?.bids?.slice(0, records) ?? []);
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
