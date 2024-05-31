import { useEffect, useRef } from "react";
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
} from "../../charting_library";
import { TVChartContainer } from "./style";
import * as React from "react";
import datafeed from "./datafeed";
import { CHART_DEFAULT_OPTIONS, DEFAULT_INTERVAL } from "./constants";
import { useAppSelector } from "../../hooks";
import { selectMarketId } from "../../state/futuresSlice";
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
  const marketId = useAppSelector(selectMarketId);
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      ...CHART_DEFAULT_OPTIONS,
      // FIXME use marketId when price API ready
      symbol: CHART_DEFAULT_OPTIONS.symbol,
      datafeed,
      overrides: {
        "paneProperties.backgroundGradientStartColor": "#0E2836",
        "paneProperties.backgroundGradientEndColor": "#0B202D",
        "scalesProperties.textColor": "#95FFF5",
      },
      container: chartContainerRef.current,
      locale: getLanguageFromURL() || "en",
      interval: DEFAULT_INTERVAL,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );
        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [chartContainerRef.current]);

  return (
    <TVChartContainer ref={chartContainerRef} className={"TVChartContainer"} />
  );
};
