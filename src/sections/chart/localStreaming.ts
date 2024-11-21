import config from "@/config.js";
import { useMarkets } from "@/hooks/useMarkets";
import { useEffect, useState } from "react";
// Assuming you're working in a browser environment that supports fetch and ReadableStream
// const streamingUrl =
//   "https://benchmarks.pyth.network/v1/shims/tradingview/streaming";
// const streamingUrl = "https://api.non-prod.sphx.dev/tradingview/streaming";
const streamingUrl =
  window.location.protocol + config.VITE_API_URL + "/tradingview/streaming";

let updateCallback: (data: any) => void;

let globalSymbol = "";
let globalResolution = 1;
function startStreaming(
  retries = 3,
  delay = 3000,
  symbol: string,
  resolution: number
) {
  globalSymbol = symbol;
  globalResolution = resolution;
  fetch(streamingUrl)
    .then(response => {
      // console.log(response.body);
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
        return;
      }

      // Assuming the streaming data is separated by line breaks
      const dataStrings = new TextDecoder().decode(value).split("\n");
      // console.log("[stream] dataStrings:", dataStrings);
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

      //   streamData(reader, 3, 3000); // Continue processing the stream
      setTimeout(() => streamData(reader, 3, 3000), 2000); // Continue processing the stream
    })
    .catch(error => {
      attemptReconnect(retries, delay, globalSymbol, globalResolution);
    });
}

function attemptReconnect(
  retriesLeft: any,
  delay: any,
  symbol: string,
  resolution: number
) {
  if (retriesLeft > 0) {
    setTimeout(() => {
      startStreaming(retriesLeft - 1, delay, symbol, resolution);
    }, delay);
  }
}

function handleStreamingData(data: any) {
  const { id, p, t } = data;
  // console.log(`[LOCAL stream] Received data:`, id, p, t);
  if (!!id) {
    updateCallback?.({ id, p, t });
  }
}

export function useLocalStreaming() {
  const [data, setData] = useState<any>(null);
  const { selectedMarket } = useMarkets();

  useEffect(() => {
    updateCallback = data => {
      if (data.id === selectedMarket?.ticker) {
        setData(data);
      }
    };
    setData({});
    startStreaming(3, 3000, selectedMarket?.ticker!, 1);
  }, [selectedMarket, selectedMarket?.ticker]);

  return { ticker: selectedMarket?.ticker, ...data };
}
