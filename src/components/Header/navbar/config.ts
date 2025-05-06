import config from "@/config";
import { ROUTES } from "../../../routes";

export const navLinks = [
  // {
  //   title: "Dashboard",
  //   path: ROUTES.dashboard,
  //   icon: null,
  // },
  {
    title: "Exchange",
    path: ROUTES.exchange,
    icon: null,
  },
  // {
  //   title: "Faucet",
  //   path: ROUTES.dashboard + "/" + ROUTES.dashboardFaucet,
  //   icon: null,
  // },
  // {
  //   title: "Station",
  //   path: config.VITE_STATION_URL,
  //   icon: null,
  //   target: "_blank",
  // },
  {
    title: "Explorer",
    path: config.VITE_EXPLORER_URL,
    icon: null,
    target: "_blank",
  },
];
