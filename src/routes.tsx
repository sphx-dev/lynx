import Futures from "./pages/Futures";
import BaseTemplate from "./ui/Layouts/BaseTemplate";
import Page404 from "./pages/404";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import MarginAccountsPage from "./pages/MarginAccounts";
import MarketsPage from "./pages/Markets";
import { Funding } from "./pages/DashboardSections/Funding";
import { Orders } from "./pages/DashboardSections/Orders";
import { Transfers } from "./pages/DashboardSections/Transfers";
import { Faucet } from "./pages/DashboardSections/Faucet";

export const ROUTES = {
  futures: "futures",
  exchange: "exchange",
  leaderBoard: "leaderboard",
  referrals: "referrals",
  dashboard: "dashboard",
  marginAccounts: "accounts",
  markets: "markets",
  dashboardFunding: "funding",
  dashboardOrders: "orders",
  dashboardTransfers: "transfers",
  dashboardFaucet: "faucet",
};

export const routes = [
  {
    path: "",
    element: <BaseTemplate />,
    children: [
      {
        path: "/",
        element: <Navigate to={ROUTES.exchange} />,
      },
      {
        path: ROUTES.dashboard,
        element: <Dashboard />,
        children: [
          { path: ROUTES.dashboardFunding, element: <Funding /> },
          { path: ROUTES.dashboardOrders, element: <Orders /> },
          { path: ROUTES.dashboardTransfers, element: <Transfers /> },
          { path: ROUTES.dashboardFaucet, element: <Faucet /> },
        ],
      },
      {
        path: ROUTES.exchange,
        element: <Futures />,
      },
      {
        path: ROUTES.marginAccounts,
        element: <MarginAccountsPage />,
      },
      {
        path: ROUTES.markets,
        element: <MarketsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];
