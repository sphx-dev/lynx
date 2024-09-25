import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "react-query";
import { useChainCosmoshub } from "./useChainCosmoshub";
import {
  CosmosTransactionEvent,
  JsonRpcResultMessage,
  useWebsocket,
} from "./useWebsocket";

export function useGlobalWebsocketHandler() {
  const { address } = useChainCosmoshub();
  const queryClient = useQueryClient();
  const messageHandlerRef = useRef<(message: JsonRpcResultMessage) => void>();

  const handleWebSocketMessage = useCallback(
    (message: JsonRpcResultMessage) => {
      if (!address) return; // Ensure the address is available

      const chainEvents =
        message?.result?.data?.value?.TxResult?.result?.events;
      if (!chainEvents) return;

      const chainEventsNames = chainEvents.map(event => event.type);
      const chainEventsMap = new Set(chainEventsNames);

      // ACCOUNT EVENTS
      if (chainEventsMap.has("create_margin_account")) {
        console.log("WS_message", "create_margin_account event");
        queryClient.invalidateQueries(["marginAccounts"]);
      }
      if (chainEventsMap.has("withdraw")) {
        console.log("WS_message", "withdraw event");
      }

      // ORDER EVENTS
      // "register_market"
      if (chainEventsMap.has("register_market")) {
        console.log("WS_message", "register_market event");
        queryClient.invalidateQueries(["markets"]);
      }
      // "place_order"
      if (chainEventsMap.has("place_order")) {
        console.log("WS_message", "place_order event");
        queryClient.invalidateQueries(["orders"]);
      }
      // "cancel_order"
      if (chainEventsMap.has("cancel_order")) {
        console.log("WS_message", "cancel_order event");
        queryClient.invalidateQueries(["orders"]);
      }

      // TRADE EVENTS
      // "transfer"
      if (chainEventsMap.has("transfer")) {
        const addresses = getAddresesFromTransferEvent(chainEvents);
        console.log(
          "WS_message",
          "transfer event",
          addresses,
          addresses.includes(address)
        );
        if (addresses.includes(address)) {
          queryClient.invalidateQueries(["balance"]);
        }
      }
    },
    [address, queryClient]
  );

  // Persist the current callback in a ref to avoid resubscribing
  useEffect(() => {
    messageHandlerRef.current = handleWebSocketMessage;
  }, [handleWebSocketMessage]);

  // Subscribe to WebSocket messages using the singleton pattern
  useWebsocket(message => {
    if (messageHandlerRef.current) {
      messageHandlerRef.current(message);
    }
  });
}

function getAddresesFromTransferEvent(events: CosmosTransactionEvent[]) {
  const transferEvents = events.filter(ev => ev.type === "transfer");
  const attributes = transferEvents.map(ev => ev.attributes).flat();
  const addresses = attributes
    .filter(attr => attr.key === "recipient" || attr.key === "sender")
    .map(attr => attr.value);
  return addresses;
}
