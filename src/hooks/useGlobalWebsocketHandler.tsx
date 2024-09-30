import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "react-query";
import { useChainCosmoshub } from "./useChainCosmoshub";
import {
  CosmosTransactionEvent,
  CosmosFlattenedEvent,
  JsonRpcResultMessage,
  useWebsocket,
} from "./useWebsocket";
import { useMarginAccount } from "./useMarginAccounts";

export function useGlobalWebsocketHandler() {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);
  const queryClient = useQueryClient();
  const messageHandlerRef = useRef<(message: JsonRpcResultMessage) => void>();

  const handleWebSocketMessage = useCallback(
    (message: JsonRpcResultMessage) => {
      // Ensure the address is available
      if (!address) {
        return;
      }

      if (!selectedAddress) {
        return;
      }

      const chainEvents =
        message?.result?.data?.value?.TxResult?.result?.events;
      const events: {
        [eventName: string]: CosmosFlattenedEvent;
      } = message?.result.events;

      // Ensure the chain events are available
      if (!chainEvents) {
        return;
      }

      // Ensure message sender is the current address or MarginAcount address
      console.log("WS_message", "message.sender", events["message.sender"]);
      if (
        !events["message.sender"].includes(address) &&
        !events["message.sender"].includes(selectedAddress)
      ) {
        return;
      }

      const chainEventsNames = chainEvents.map((event) => event.type);
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

      // "new_position" and "modify_position"
      if (chainEventsMap.has("new_position")) {
        console.log("WS_message", "new_position");
        queryClient.invalidateQueries(["positions"]);
      }
      if (chainEventsMap.has("modify_position")) {
        console.log("WS_message", "modify_position");
        queryClient.invalidateQueries(["positions"]);
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
    [address, queryClient, selectedAddress]
  );

  // Persist the current callback in a ref to avoid resubscribing
  useEffect(() => {
    messageHandlerRef.current = handleWebSocketMessage;
  }, [handleWebSocketMessage]);

  // Subscribe to WebSocket messages using the singleton pattern
  useWebsocket((message) => {
    if (messageHandlerRef.current) {
      messageHandlerRef.current(message);
    }
  });
}

function getAddresesFromTransferEvent(events: CosmosTransactionEvent[]) {
  const transferEvents = events.filter((ev) => ev.type === "transfer");
  const attributes = transferEvents.map((ev) => ev.attributes).flat();
  const addresses = attributes
    .filter((attr) => attr.key === "recipient" || attr.key === "sender")
    .map((attr) => attr.value);
  return addresses;
}
