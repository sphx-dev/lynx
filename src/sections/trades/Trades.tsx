import React, { useEffect, useRef } from "react";
import { TableContainer } from "../orderbook/OrderBookStyle";
import { Stack, Text } from "../../components";
import TitleRow from "../orderbook/TitleRow";
import TradeItem from "./TradeItem";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTradesData } from "./useTradesWebsocket";
import { useMarkets } from "@/hooks/useMarkets";
import { ReadyState } from "react-use-websocket";

const HEADERS = ["price", "amount", "time"];

const Trades = React.memo(() => {
  const { t } = useTranslation();
  const { symbol } = useMarkets();
  const containerRef = useRef(null);
  const didUnmount = useRef(false);

  const { messagesByTicker, sendMessage, readyState } = useTradesData();
  const messages = symbol ? messagesByTicker[symbol] ?? [] : [];

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const isLoading = readyState === ReadyState.CONNECTING;

  useEffect(() => {
    // Ping the server every 15 seconds to keep the connection alive
    const interval = setInterval(() => {
      sendMessage(JSON.stringify({ type: "ping", id: Date.now() }));
    }, 15 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [sendMessage]);

  if (!messages || messages.length === 0) {
    return (
      <Stack
        fullHeight
        justify="center"
        align="center"
        data-testid="trades-tab"
      >
        <Text variant="textXLarge" color="tertiary">
          {isLoading ? t("loading") : t("noData")}
        </Text>
      </Stack>
    );
  }

  return (
    <Container ref={containerRef} data-testid="trades-tab">
      <Stack style={{ width: "100%" }}>
        <TableContainer>
          <TitleRow titles={HEADERS} />
        </TableContainer>
        <TableContainer
          style={{ overflowY: "hidden", height: "calc(100vh - 340px)" }}
        >
          {messages.map((msg: any) => (
            <TradeItem
              key={msg.id + msg.messageType}
              price={msg.price}
              quantity={Number(msg.quantityProcessed)}
              date={msg.timestamp}
              side={msg.side}
            />
          ))}
        </TableContainer>
      </Stack>
    </Container>
  );
});

export default Trades;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
