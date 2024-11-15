import config from "@/config.js";
// Assuming you're working in a browser environment that supports fetch and ReadableStream
// const streamingUrl =
//   "https://benchmarks.pyth.network/v1/shims/tradingview/streaming";
// const streamingUrl = "https://api.non-prod.sphx.dev/tradingview/streaming";
const streamingUrl =
  window.location.protocol + config.VITE_API_URL + "/tradingview/streaming";
const channelToSubscription = new Map();

function handleStreamingData(data: any) {
  const { id, p, t } = data;

  const tradePrice = p;
  const tradeTime = t * 1000; // Multiplying by 1000 to get milliseconds

  const channelString = id;
  const subscriptionItem = channelToSubscription.get(channelString);

  if (!subscriptionItem) {
    return;
  }

  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
  // const nextDailyBarTime = getNextBarTime(lastDailyBar.time, globalResolution);
  // console.log("--------------tradeTime", new Date(tradeTime).toJSON());
  // console.log("----------LAST BAR TIME", new Date(lastDailyBar.time).toJSON());
  // console.log("----NEXT DAYLY BAR TIME", new Date(nextDailyBarTime).toJSON());

  let bar: any;
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
    // console.log("[stream] Generate new bar", bar);
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    };
    // console.log("[stream] Update the latest bar by price", tradePrice);
  }

  subscriptionItem.lastDailyBar = bar;

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler: any) => handler.callback(bar));
  channelToSubscription.set(channelString, subscriptionItem);
}

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
  fetch(streamingUrl + `?symbol=${symbol}&resolution=${resolution}`)
    .then((response) => {
      // console.log(response.body);
      const reader = response.body?.getReader();

      streamData(reader, retries, delay);
    })
    .catch((error) => {
      console.error(
        "[stream] Error fetching from the streaming endpoint:",
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
        console.error("[stream] Streaming ended.");
        return;
      }

      // Assuming the streaming data is separated by line breaks
      const dataStrings = new TextDecoder().decode(value).split("\n");
      // console.log("[stream] dataStrings:", dataStrings);
      dataStrings.forEach((dataString) => {
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

      streamData(reader); // Continue processing the stream
      //setTimeout(() => streamData(reader), 2000); // Continue processing the stream
    })
    .catch((error) => {
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

function getNextBarTime(barTime: any, resolution: number) {
  const date = new Date(barTime * 1000);
  date.setSeconds(date.getTime() + resolution * 1000);
  return date.getTime() / 1000;
}

function getNextDailyBarTime(barTime: any) {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
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
}
