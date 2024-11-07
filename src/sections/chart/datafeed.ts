import config from "@/config.js";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming.js";

// const API_ENDPOINT = "https://benchmarks.pyth.network/v1/shims/tradingview";
// TODO: configure the tradingview URL based on the environment
// const API_ENDPOINT = "https://api.non-prod.sphx.dev/tradingview";
const API_ENDPOINT =
  window.location.protocol + config.VITE_API_URL + "/tradingview";

console.log("API_ENDPOINT", API_ENDPOINT);
console.log("API_ENDPOINT", API_ENDPOINT);
console.log("API_ENDPOINT", API_ENDPOINT);
console.log("API_ENDPOINT", API_ENDPOINT);

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map();

const datafeed = {
  onReady: (callback: any) => {
    console.log("[onReady]: Method call");
    fetch(`${API_ENDPOINT}/config`).then(response => {
      response.json().then(configurationData => {
        setTimeout(() => callback(configurationData));
      });
    });
  },
  searchSymbols: (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any
  ) => {
    console.log("[searchSymbols]: Method call");
    fetch(`${API_ENDPOINT}/search?query=${userInput}`).then(response => {
      response.json().then(data => {
        onResultReadyCallback(data);
      });
    });
  },
  // TODO use static config when price API ready
  resolveSymbol: (
    symbolName: any,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    fetch(`${API_ENDPOINT}/symbols?symbol=${symbolName}`).then(response => {
      response
        .json()
        .then(symbolInfo => {
          onSymbolResolvedCallback(symbolInfo);
        })
        .catch(error => {
          console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
          onResolveErrorCallback("Cannot resolve symbol");
        });
    });
  },
  getBars: (
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any,
    onErrorCallback: any
  ) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
    const lastYear = new Date(to * 1000);
    // max date range is 10 month
    lastYear.setMonth(lastYear.getMonth() - 10);

    const lastYearUnixSeconds = Math.floor(lastYear.getTime() / 1000);
    const fetchFrom = Math.max(from, lastYearUnixSeconds);
    fetch(
      `${API_ENDPOINT}/history?symbol=${symbolInfo.ticker}&from=${fetchFrom}&to=${periodParams.to}&resolution=${resolution}`
    ).then(response => {
      console.log("no stream", response.body);
      response
        .json()
        .then(data => {
          if (data.t.length === 0) {
            onHistoryCallback([], { noData: true });
            return;
          }
          const bars = [];
          for (let i = 0; i < data.t.length; ++i) {
            bars.push({
              time: data.t[i] * 1000,
              low: data.l[i],
              high: data.h[i],
              open: data.o[i],
              close: data.c[i],
            });
          }
          if (firstDataRequest) {
            lastBarsCache.set(symbolInfo.ticker, {
              ...bars[bars.length - 1],
            });
          }
          onHistoryCallback(bars, { noData: false });
        })
        .catch(error => {
          console.log("[getBars]: Get error", error);
          onErrorCallback(error);
        });
    });
  },
  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscriberUID: string,
    onResetCacheNeededCallback: any
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.ticker)
    );
  },
  unsubscribeBars: (subscriberUID: string) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    unsubscribeFromStream(subscriberUID);
  },
};

export default datafeed;
