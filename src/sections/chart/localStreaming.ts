import { getStreamingUrl } from "@/config.js";
import { useMarkets } from "@/hooks/useMarkets";
import { create } from "zustand";
// Assuming you're working in a browser environment that supports fetch and ReadableStream
// const streamingUrl =
//   "https://benchmarks.pyth.network/v1/shims/tradingview/streaming";
// const streamingUrl = "https://api.non-prod.sphx.dev/tradingview/streaming";
const streamingUrl = getStreamingUrl();

let updateCallback: (data: any) => void;

let startStreamingTimes = 0;
function startStreaming(retries = 3, delay = 3000) {
  console.log("[LOCAL stream] Starting streaming... " + ++startStreamingTimes);

  fetch(streamingUrl)
    .then(response => {
      const reader = response.body?.getReader();

      streamData(reader, retries, delay);
    })
    .catch(error => {
      console.error(
        "[LOCAL stream] Error fetching from the streaming endpoint:",
        error
      );
    });
}

function streamData(
  reader?: ReadableStreamDefaultReader<Uint8Array>,
  retries = 3,
  delay = 3000
) {
  reader
    ?.read()
    .then(({ value, done }) => {
      if (done) {
        console.error("[LOCAL stream] Streaming ended.");
        setTimeout(() => attemptReconnect(retries, delay), 5000);
        return;
      }

      // Assuming the streaming data is separated by line breaks
      const dataStrings = new TextDecoder().decode(value).split("\n");

      dataStrings.forEach(dataString => {
        const trimmedDataString = dataString.trim();
        if (trimmedDataString) {
          try {
            const jsonData = JSON.parse(trimmedDataString);
            handleStreamingData(jsonData);
          } catch (e: any) {
            // console.error("Error parsing JSON:", e.message)
          }
        }
      });

      setTimeout(() => streamData(reader, 3, 3000), 2000); // Continue processing the stream
    })
    .catch(error => {
      attemptReconnect(retries, delay);
    });
}

function attemptReconnect(retriesLeft: any, delay: any) {
  if (retriesLeft > 0) {
    setTimeout(() => {
      startStreaming(retriesLeft - 1, delay);
    }, delay);
  }
}

function handleStreamingData(data: any) {
  const { id, p, t } = data;
  if (!!id) {
    updateCallback?.({ id, p, t });
  }
}

const useStreamingData = create<{
  info: {
    [key: string]: {
      ticker?: string;
      p?: number;
      t?: number;
      id?: string;
    };
  };
  setInfo: (info: any) => void;
  isStreaming: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
  stream: () => void;
}>((set, get) => ({
  info: {},
  setInfo: data => {
    const currentinfo = get().info;
    set({ info: { ...currentinfo, [data.id]: { ticker: data.id, ...data } } });
  },
  isStreaming: false,
  setIsStreaming: isStreaming => set({ isStreaming }),
  stream: () => {
    // Execute only once
    if (!get().isStreaming) {
      updateCallback = data => {
        get().setInfo(data);
      };
      startStreaming(3, 3000);
      set({ isStreaming: true });
    }
  },
}));

/**
 *
 * @returns {StreamDelta} - The streaming data for the selected market
 *
 * @typedef {Object} StreamDelta
 * @property {string} ticker - The ticker of the selected market
 * @property {number} p - The price of the selected market
 * @property {number} t - The timestamp of the selected market
 * @property {string} id - The id of the selected market
 *
 */
export function useLocalStreaming() {
  const { info, stream } = useStreamingData();
  const { selectedMarket } = useMarkets();
  stream();

  return selectedMarket?.ticker ? info[selectedMarket?.ticker] : {};
}

/**
 *
 * @returns {StreamDeltaMap} - The streaming data for the All the available markets
 *
 * @typedef {Object.<string, StreamDelta> StreamDeltaMap
 *
 */
export function useLocalStreamingData() {
  const { info, stream } = useStreamingData();
  stream();
  return info;
}
