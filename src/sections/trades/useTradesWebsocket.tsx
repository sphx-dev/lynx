import config from "@/config";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { create } from "zustand";

const websocketURL =
  config.VITE_WS_PROTOCOL +
  "://" +
  config.VITE_API_HOST +
  ":" +
  config.VITE_API_PORT +
  "/orderbook/ws";

const MAX_RECORDS = 500;

export const useTradesWebsocket = () => {
  const { messages, setMessage, setSendMessage, setReadyState } =
    useTradesData();

  const { sendMessage, readyState } = useWebSocket(websocketURL, {
    share: true,
    // onOpen: e => console.log("opened", e),
    // onClose: e => {
    //   console.log("closed", e);
    // },
    // onError: e => console.log("error", e),
    onMessage: msg => {
      const data = JSON.parse(msg.data);
      const messageType = data.message_type;
      const symbol = data.symbol;
      const info = JSON.parse(data.body);
      const parsedMessage = { symbol, messageType, ...info };

      setMessage(parsedMessage);
    },
    shouldReconnect: () => true, //didUnmount.current === false,
    reconnectAttempts: 100,
    reconnectInterval: 5000,
  });
  useEffect(() => {
    setSendMessage(sendMessage);
  }, [setSendMessage, sendMessage]);

  useEffect(() => {
    setReadyState(readyState);
  }, [setReadyState, readyState]);

  return { messages, sendMessage, readyState };
};

type TradesData = {
  readyState: ReadyState;
  messages: any[];
  messagesByTicker: any;
  sendMessage: any;
  setReadyState: (readyState: ReadyState) => void;
  getMessages: (ticker: string) => void;
  setMessage: (message: any) => void;
  setSendMessage: (sendMessage: any) => void;
};

export const useTradesData = create<TradesData>((set, get) => ({
  readyState: ReadyState.CLOSED,
  messages: [],
  messagesByTicker: {},
  setReadyState: (readyState: ReadyState) => {
    set({ readyState });
  },
  sendMessage: () => {},
  getMessages: (ticker: string) => {
    return get().messagesByTicker[ticker] || [];
  },
  setMessage: (message: any) => {
    const symbol = message.symbol;
    set({
      messagesByTicker: {
        ...get().messagesByTicker,
        [symbol]: [
          message,
          ...(get().messagesByTicker[symbol] ?? []).slice(0, MAX_RECORDS),
        ],
      },
    });
    set({ messages: [message, ...get().messages.slice(0, MAX_RECORDS)] });
  },
  setSendMessage: (sendMessage: any) => {
    set({ sendMessage });
  },
}));
