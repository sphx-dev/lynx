import { ChartingLibraryWidgetOptions } from "../../charting_library";

type Interval = ChartingLibraryWidgetOptions["interval"];

export const DEFAULT_INTERVAL = "1h" as Interval;
export const CHART_DEFAULT_OPTIONS: Partial<ChartingLibraryWidgetOptions> = {
  library_path: "/charting_library/",
  custom_css_url: "../tv-public.css",
  autosize: true,
  fullscreen: false,
  disabled_features: [
    "use_localstorage_for_settings",
    "header_symbol_search",
    "header_compare",
    "symbol_search_hot_key",
    "symbol_info",
    "go_to_date",
    "timeframes_toolbar",
  ],
  theme: "dark",
};
