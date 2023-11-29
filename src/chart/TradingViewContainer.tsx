import { useEffect, useRef } from "react"
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
} from "../charting_library"
import { TVChartContainer } from "./style"
import * as React from "react"

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"]
  interval: ChartingLibraryWidgetOptions["interval"]

  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string
  libraryPath: ChartingLibraryWidgetOptions["library_path"]
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"]
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"]
  clientId: ChartingLibraryWidgetOptions["client_id"]
  userId: ChartingLibraryWidgetOptions["user_id"]
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"]
  autosize: ChartingLibraryWidgetOptions["autosize"]
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"]
  container: ChartingLibraryWidgetOptions["container"]
}

const getLanguageFromURL = (): LanguageCode | null => {
  const regex = new RegExp("[\\?&]lang=([^&#]*)")
  const results = regex.exec(location.search)
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, " ")) as LanguageCode)
}

const configurationData = {
  supports_search: true,
  supports_group_request: false,
  supports_marks: true,
  supports_timescale_marks: true,
  supports_time: true,
  exchanges: [
    { value: "", name: "All Exchanges", desc: "" },
    { value: "NasdaqNM", name: "NasdaqNM", desc: "NasdaqNM" },
    { value: "NYSE", name: "NYSE", desc: "NYSE" },
  ],
  symbols_types: [
    { name: "All types", value: "" },
    { name: "Stock", value: "stock" },
    { name: "Index", value: "index" },
  ],
  supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
}

export const TradingViewContainer = () => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>

  const defaultProps: Omit<ChartContainerProps, "container"> = {
    symbol: "EBIX",
    interval: "D" as ResolutionString,
    datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  }

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: defaultProps.symbol as string,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl,
      ),
      interval:
        defaultProps.interval as ChartingLibraryWidgetOptions["interval"],
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath as string,

      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        // "header_widget",
        // "pricescale_currency",
      ],
      enabled_features: ["study_templates"],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      theme: "dark",
      onChartReady: (callback: any) => {
        setTimeout(() => callback(configurationData))
      },
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton()
        button.setAttribute("title", "Click to show a notification popup")
        button.classList.add("apply-common-tooltip")
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!")
            },
          }),
        )
        button.innerHTML = "Check API"
      })
    })

    return () => {
      tvWidget.remove()
    }
  })

  return (
    <TVChartContainer ref={chartContainerRef} className={"TVChartContainer"} />
  )
}
