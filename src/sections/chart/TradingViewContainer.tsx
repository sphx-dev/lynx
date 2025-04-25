import * as React from "react";
import { useEffect, useRef } from "react";
import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  widget,
} from "../../charting_library";
import { TVChartContainer } from "./style";
import datafeed from "./datafeed";
import { CHART_DEFAULT_OPTIONS, DEFAULT_INTERVAL } from "./constants";
// import { useAppSelector } from "../../hooks";
// import { selectMarketId } from "../../state/futuresSlice";
import { useMarkets } from "../../hooks/useMarkets";

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];

  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  container: ChartingLibraryWidgetOptions["container"];
  custom_formaters: ChartingLibraryWidgetOptions["custom_formatters"];
}

const getLanguageFromURL = (): LanguageCode | null => {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  // eslint-disable-next-line no-restricted-globals
  const results = regex.exec(location.search);
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, " ")) as LanguageCode);
};

export const TradingViewContainer = () => {
  const { symbol } = useMarkets();
  // const marketId = selectedMarket?.baseAsset;
  const marketId = symbol;

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!marketId) {
      return;
    }
    const widgetOptions: ChartingLibraryWidgetOptions = {
      ...CHART_DEFAULT_OPTIONS,
      symbol: marketId,
      datafeed,
      // https://www.tradingview.com/charting-library-docs/latest/customization/overrides/chart-overrides/
      overrides: {
        "paneProperties.backgroundGradientStartColor": "#0e161b", //"#0E2836",
        "paneProperties.backgroundGradientEndColor": "#0e161b", //"#0B202D",
        "scalesProperties.textColor": "#95FFF5",
        "mainSeriesProperties.candleStyle.upColor": "#1fabad20",
        "mainSeriesProperties.candleStyle.downColor": "#fb374820",
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderUpColor": "#1fabad",
        "mainSeriesProperties.candleStyle.borderDownColor": "#fb3748",
      },
      container: chartContainerRef.current,
      locale: getLanguageFromURL() || "en",
      interval: DEFAULT_INTERVAL,
      custom_formatters: {
        priceFormatterFactory: (symbolInfo, minTick) => {
          return {
            format: (price, signPositive) => {
              let precision = 8;
              const integer = price.toString().split(".")?.[0];

              if (integer.length > 3) {
                precision = integer.length + 2;
              } else if (integer.length > 1) {
                precision = integer.length + 3;
              } else {
                precision = 4;
              }
              return price.toPrecision(precision);
            },
          };
        },
      },
    };

    const tvWidget = new widget(widgetOptions);
    return () => {
      tvWidget.remove();
    };
  }, [marketId]);

  return (
    <TVChartContainer ref={chartContainerRef} className={"TVChartContainer"} />
  );
};
