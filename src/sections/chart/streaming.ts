import config from "@/config.js";
// import dayjs from "dayjs";

// Assuming you're working in a browser environment that supports fetch and ReadableStream
// const streamingUrl =
//   "https://benchmarks.pyth.network/v1/shims/tradingview/streaming";
// const streamingUrl = "https://api.non-prod.sphx.dev/tradingview/streaming";
const streamingUrl =
  window.location.protocol + config.VITE_API_URL + "/tradingview/streaming";
const channelToSubscription = new Map();

function handleStreamingData(UID: string, resolution: number, data: any) {
  const { id, p, t } = data;
  if (!id || !p || !t) {
    return;
  }
  // console.log(id, p, t, new Date(t * 1000).toJSON());

  const tradePrice = p;
  const tradeTime = t * 1000; // Multiplying by 1000 to get milliseconds
  const nomalizedTradeTime = tradeTime - (tradeTime % (resolution * 60 * 1000));

  const channelString = id;
  const subscriptionItem = channelToSubscription.get(channelString);

  if (!subscriptionItem) {
    return;
  }

  const lastDailyBar = subscriptionItem.lastDailyBar;

  // console.log(
  //   "Delta[" + id + "][" + UID + "]",
  //   "comming->" + dayjs(tradeTime).format("YYYY-MM-DD HH:mm:ss"),
  //   "N{" + dayjs(nomalizedTradeTime).format("YYYY-MM-DD HH:mm:ss") + "}",
  //   "|",
  //   "prev->" + dayjs(lastDailyBar.time).format("YYYY-MM-DD HH:mm:ss"),
  //   nomalizedTradeTime > lastDailyBar.time ? "[NEW]" : "[same]",
  //   `(${p})`
  // );

  let bar: any;
  if (nomalizedTradeTime > lastDailyBar.time) {
    bar = {
      time: nomalizedTradeTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
  } else if (nomalizedTradeTime === lastDailyBar.time) {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    };
  } else {
    return;
  }

  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler: any) => handler.callback(bar));
  channelToSubscription.set(channelString, subscriptionItem);
}

let globalSymbol = "";
let globalResolution = 1;
let globalReader: Map<
  string,
  ReadableStreamDefaultReader<Uint8Array> | undefined
> = new Map();

function startStreaming(
  retries = 3,
  delay = 3000,
  symbol: string,
  resolution: number
) {
  // Start a new reader
  globalSymbol = symbol;
  globalResolution = resolution;
  fetch(streamingUrl + `?symbol=${symbol}&resolution=${resolution}`)
    .then(response => {
      const reader = response.body?.getReader();

      globalReader.set(symbol + "_#_" + resolution, reader);
      streamData(
        symbol + "_#_" + resolution,
        resolution,
        reader,
        retries,
        delay
      );
    })
    .catch(error => {
      console.error(
        "[stream] Error fetching from the streaming endpoint:",
        error
      );
    });
}

function streamData(
  id: string,
  resolution: number,
  reader?: ReadableStreamDefaultReader<Uint8Array>,
  retries = 3,
  delay = 3000
) {
  reader
    ?.read()
    .then(({ value, done }) => {
      if (done) {
        console.error("[stream] Streaming ended.", id);
        return;
      }

      // Assuming the streaming data is separated by line breaks
      const dataStrings = new TextDecoder().decode(value).split("\n");

      dataStrings.forEach(dataString => {
        const trimmedDataString = dataString.trim();
        if (trimmedDataString) {
          try {
            const jsonData = JSON.parse(trimmedDataString);
            handleStreamingData(id, resolution, jsonData);
          } catch (e: any) {
            // console.error("Error parsing JSON:", e.message)
          }
        }
      });

      streamData(id, resolution, reader); // Continue processing the stream
      //setTimeout(() => streamData(id, resolution, reader), 2000); // Continue processing the stream
    })
    .catch(error => {
      console.error("[stream] Error reading from stream:", error);
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
    console.log(`[stream] Attempting to reconnect in ${delay}ms...`);
    setTimeout(() => {
      startStreaming(retriesLeft - 1, delay, symbol, resolution);
    }, delay);
  } else {
    console.error("[stream] Maximum reconnection attempts reached.");
  }
}

export function subscribeOnStream(
  symbolInfo: any,
  resolution: any,
  onRealtimeCallback: any,
  subscriberUID: any,
  onResetCacheNeededCallback: any,
  lastDailyBar: any
) {
  const channelString = symbolInfo.ticker;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  console.log(
    "[subscribeBars]: Subscribe to streaming. Channel:",
    channelString
  );
  console.log(
    "[subscribeBars]: \n",
    "=================================================================\n",
    "\n",
    "symbolInfo:",
    symbolInfo,
    "\n",
    "resolution:",
    resolution,
    "\n",
    "onRealtimeCallback:",
    !!onRealtimeCallback,
    "\n",
    "subscriberUID:",
    subscriberUID,
    "\n",
    "onResetCacheNeededCallback:",
    !!onResetCacheNeededCallback,
    "\n",
    "lastDailyBar:",
    lastDailyBar,
    "\n",
    "\n",
    "\n",
    "=================================================================\n"
  );

  // Start streaming when the first subscription is made
  startStreaming(3, 3000, channelString, resolution);
}

export function unsubscribeFromStream(subscriberUID: string) {
  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler: { id: string }) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // Unsubscribe from the channel if it is the last handler
      console.log(
        "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
        channelString
      );
      channelToSubscription.delete(channelString);
      break;
    }
  }
  // Cancel the previous reader
  console.log(
    "[unsubscribeBars]: Canceling reader for",
    subscriberUID,
    globalReader.get(subscriberUID)
  );
  globalReader.get(subscriberUID)?.cancel();
}
