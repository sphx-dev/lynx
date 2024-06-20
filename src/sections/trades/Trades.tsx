import React, { useEffect, useRef, useState } from "react";
import { Container, TableContainer } from "../orderbook/OrderBookStyle";
import { Stack, Text } from "../../components";
import TitleRow from "../orderbook/TitleRow";
import { TRADES } from "./mock";
import { TradesItem } from "../../types/orderBook";
import TradeItem from "./TradeItem";
import getBoundingClientRect from "@popperjs/core/lib/dom-utils/getBoundingClientRect";
import { getTradesRecords } from "../../utils/helpers";
import { useResize } from "../../hooks/useResize";

const HEADERS = ["PRICE", "AMOUNT", "TIME"];

const Trades = () => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const { height: windowHeight } = useResize();

  useEffect(() => {
    if (containerRef.current) {
      setHeight(getBoundingClientRect(containerRef.current).height);
    }
  }, [windowHeight, setHeight]);

  if (!TRADES.length) {
    return (
      <Stack fullHeight justify="center" align="center">
        <Text variant="textXl" color="tertiary">
          NO DATA
        </Text>
      </Stack>
    );
  }

  const records = getTradesRecords(height);
  console.log(records);
  return (
    <Container ref={containerRef}>
      <Stack style={{ width: "100%" }}>
        <TableContainer>
          <TitleRow titles={HEADERS} />
        </TableContainer>
        <TableContainer>
          {TRADES.slice(0, records).map(({ id, ...tradeProps }) => (
            <TradeItem key={id} {...(tradeProps as TradesItem)} />
          ))}
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default Trades;
