import React, { useEffect, useRef, useState } from "react";
import { TableContainer } from "../orderbook/OrderBookStyle";
import { Stack, Text } from "../../components";
import TitleRow from "../orderbook/TitleRow";
import TradeItem from "./TradeItem";
import useWebSocket, { ReadyState } from "react-use-websocket";
import config from "@/config";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const HEADERS = ["price", "amount", "time"];

const websocketURL =
  config.VITE_WS_PROTOCOL +
  "://" +
  config.VITE_API_HOST +
  ":" +
  config.VITE_API_PORT +
  "/orderbook/ws";

const MAX_RECORDS = 500;

const Trades = React.memo(() => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<any[]>([]);
  const containerRef = useRef(null);
  const didUnmount = useRef(false);

  const { sendMessage, readyState } = useWebSocket(websocketURL, {
    share: true,
    onOpen: e => console.log("opened", e),
    onClose: e => {
      console.log("closed", e);
    },
    onError: e => console.log("error", e),
    onMessage: msg => {
      const data = JSON.parse(msg.data);
      const messageType = data.message_type;
      const info = JSON.parse(data.body);
      const parsedMessage = { messageType, ...info };

      setMessages(prev => [parsedMessage, ...prev.slice(0, MAX_RECORDS)]);
    },
    shouldReconnect: () => didUnmount.current === false,
    reconnectAttempts: 10,
    reconnectInterval: 5000,
  });

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
        <Text variant="textXl" color="tertiary">
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
          {messages.map(msg => (
            <TradeItem
              key={msg.id}
              price={msg.price}
              quantity={Number(msg.quantity)}
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
  border-color: #263946;
  padding: 10px 10px 0;
`;
