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
import { Container, TableContainer } from "./OrderBookStyle";
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
import aIcon from "@/assets/icons/orderbookselector-a.svg";
import bIcon from "@/assets/icons/orderbookselector-b.svg";
import abIcon from "@/assets/icons/orderbookselector-ab.svg";

const HEADERS = ["price", "amount", "total"];
const MIN_RECORDS = 9;
const MAX_RECORDS = 40;

type SideSelection = "A" | "B" | "AB";
const SideSelector = ({
  onChange,
}: {
  onChange: (side: SideSelection) => void;
}) => {
  const [selected, setSelected] = useState<SideSelection>("AB");
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <ABButton
        onClick={() => {
          setSelected("AB");
          onChange("AB");
        }}
        $selected={selected === "AB"}
      >
        <Icon src={abIcon} />
      </ABButton>
      <ABButton
        onClick={() => {
          setSelected("B");
          onChange("B");
        }}
        $selected={selected === "B"}
      >
        <Icon src={bIcon} />
      </ABButton>
      <ABButton
        onClick={() => {
          setSelected("A");
          onChange("A");
        }}
        $selected={selected === "A"}
      >
        <Icon src={aIcon} />
      </ABButton>
    </div>
  );
};

const ABButton = styled.button<{ $selected: boolean }>`
  position: relative;
  background-color: transparent;
  height: 22px;
  width: 22px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $selected }) =>
    $selected ? "var(--primary-base)" : "transparent"};
  border-radius: 3px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OrderBook: FunctionComponent = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [side, setSide] = useState<SideSelection>("AB");
  const { data: book, isLoading } = useOrderBook(containerRef, side);

  return (
    <>
      <SideSelector onChange={s => setSide(s)} />
      <Container ref={containerRef} data-testid="orderbook-tab">
        {!isLoading && (book?.bids?.length || book?.asks?.length) ? (
          <AsksBidsContainer data-testid="asks-and-bids-container">
            <TableContainer>
              <TitleRow titles={HEADERS} />
              <PriceLevelsWrapper>
                <PriceLevels levels={book.asks} orderType={OrderType.ASKS} />
              </PriceLevelsWrapper>
            </TableContainer>
            <Divider spread={book.spread} percentage={book.spreadPercentage} />
            <TableContainer>
              <PriceLevelsWrapper>
                <PriceLevels levels={book.bids} orderType={OrderType.BIDS} />
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
      </Container>
    </>
  );
};

const AsksBidsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 auto;
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

const useOrderBook = (ref: RefObject<HTMLDivElement>, side: SideSelection) => {
  const [records, setRecords] = useState(MIN_RECORDS);
  const { selectedMarket } = useMarkets();

  const responseData = useOrderBookData({ ticker: selectedMarket?.ticker });

  useLayoutEffect(() => {
    if (ref.current) {
      const columnHeight = ref.current?.clientHeight - 75;
      const r = Math.max(
        Math.min(Math.floor(columnHeight / 27), MAX_RECORDS)
        // MIN_RECORDS
      );

      // setRecords(10);
      setRecords(r);
    }
  }, [responseData, ref]);

  const askRecords =
    side === "A" ? records : side === "AB" ? Math.floor(records / 2) : 0;
  const bidsRecords =
    side === "B" ? records : side === "AB" ? Math.floor(records / 2) : 0;

  return {
    ...responseData,
    data: parseOrderBokData(responseData.data, askRecords, bidsRecords),
    // data: parseOrderBokData(responseData.data, 13),
  };
};

function parseOrderBokData(data: any, askRecords: number, bidsRecords: number) {
  let bidsSizeSum = 0;
  let bidsSizeSumValue = 0;
  data?.bids?.forEach((bid: any) => {
    bid.amount = Number(bid.quantity) * Number(bid.price);
    bidsSizeSum += Number(bid.quantity);
    bidsSizeSumValue += Number(bid.quantity) * Number(bid.price);
  });

  const bids = orderToState(data?.bids?.slice(0, bidsRecords) ?? []);
  let asksSizeSum = 0;
  let asksSizeSumValue = 0;
  data?.asks?.forEach((ask: any) => {
    ask.amount = Number(ask.quantity) * Number(ask.price);
    asksSizeSum += Number(ask.quantity);
    asksSizeSumValue += Number(ask.quantity) * Number(ask.price);
  });

  const asks = asksToState(
    data?.asks?.slice(
      Math.max(0, data?.asks?.length - askRecords),
      data?.asks?.length
    ) ?? []
  );

  const maxBid = data?.bids?.length ? data.bids[0].price : 0;
  const minAsk = data?.asks?.length ? data.asks[data.asks.length - 1].price : 0;
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
