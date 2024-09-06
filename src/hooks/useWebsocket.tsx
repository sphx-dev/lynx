import {
  createContext,
  createRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getChainWS } from "../config";

type SubscritionMessage = {
  id: string;
  jsonrpc: string;
  method: string;
  params: {
    query: string;
  };
};

export const WsContext = createContext<any>(createRef<any>());

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const ws = useRef<WebSocket | null>(null);
  const [connectionRetries, setConnectionRetries] = useState<number>(0);
  const [subscriptions, setSubscriptions] = useState<
    { id: string; query: string }[]
  >([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let openHandler: () => void,
      closeHandler: () => void,
      errorHandler: (err: Event) => void;

    if (!ws.current || ws?.current?.readyState === WebSocket.CLOSED) {
      console.log("WS::::::::::", "connecting");
      ws.current = new WebSocket(getChainWS());

      openHandler = () => {
        console.log("WS::::::::::", "connected");
        setSubscriptions(pre => [...pre, ...subscribe(ws.current!)]);
        setError(null);
      };

      closeHandler = () => {
        console.log("WS::::::::::", "closed");
        setSubscriptions([]);
        setError(null);
        setTimeout(() => {
          console.log("WS::::::::::", "reconnecting");
          ws.current = null;
          setConnectionRetries((prev: number) => prev + 1);
        }, Math.min(1000 + connectionRetries * 1000, 30 * 1000));
      };

      errorHandler = (err: Event) => {
        console.log("WS::::::::::", "error", err);
        setError(err);
      };

      ws.current.addEventListener("open", openHandler);
      ws.current.addEventListener("close", closeHandler);
      ws.current.addEventListener("error", errorHandler);
    }
  }, [connectionRetries]);

  return (
    <WsContext.Provider
      value={{
        ws: ws.current,
        subscriptions,
        reconnect: () => setConnectionRetries((x: number) => x + 1),
        error,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

const subscribe = (websocket: WebSocket) => {
  const subs = [
    {
      id: "sphx-ws-subscribe-1-" + new Date().toJSON(),
      query: `message.module = 'order'`,
    },
    {
      id: "sphx-ws-subscribe-2-" + new Date().toJSON(),
      query: `message.module = 'marginacc'`,
    },
  ];

  const subscriptionMessages: SubscritionMessage[] = [
    {
      id: subs[0].id,
      jsonrpc: "2.0",
      method: "subscribe",
      params: {
        query: subs[0].query,
      },
    },

    {
      id: subs[1].id,
      jsonrpc: "2.0",
      method: "subscribe",
      params: {
        query: subs[1].query,
      },
    },
  ];

  subscriptionMessages.forEach(msg => {
    websocket.send(JSON.stringify(msg));
  });

  return subs;
};

const unsubscribe = (
  websocket: WebSocket,
  subscriptions: { id: string; query: string }[]
) => {
  const messages = subscriptions.map(sub => ({
    id: sub.id,
    jsonrpc: "2.0",
    method: "unsubscribe",
    params: {
      query: sub.query,
    },
  }));

  messages.forEach(msg => {
    websocket.send(JSON.stringify(msg));
  });
};

export const useWebsocket = (onMessage?: (message: any) => void) => {
  const { ws, error, subscriptions, reconnect } = useContext(WsContext);
  // const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    let messageHandler: (event: MessageEvent<any>) => void;

    if (ws && ws?.readyState !== WebSocket.CLOSED) {
      messageHandler = (event: MessageEvent<any>) => {
        let msg = {};
        try {
          msg = JSON.parse(event.data);
        } catch (e) {
          console.log("WS::::::::::", "msg-error", e);
        }
        onMessage?.(msg);
      };

      console.log("WS::::::::::", "Binding");
      ws?.addEventListener("message", messageHandler);
    }

    return () => {
      ws?.removeEventListener("message", messageHandler);
    };
  }, [onMessage, ws]);

  return {
    // messages,
    subscriptions,
    unsubscribe,
    reconnect,
    status: ws?.readyState,
    isConnecting: ws?.readyState === WebSocket.CONNECTING,
    isOpen: ws?.readyState === WebSocket.OPEN,
    isClosing: ws?.readyState === WebSocket.CLOSING,
    isClosed: ws?.readyState === WebSocket.CLOSED,
    error,
  };
};
