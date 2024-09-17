import Futures from "./pages/Futures";
import BaseTemplate from "./Layouts/BaseTemplate";
import Page404 from "./pages/404";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import MarginAccountsPage from "./pages/MarginAccounts";
import MarketsPage from "./pages/Markets";

export const ROUTES = {
  futures: "futures",
  exchange: "exchange",
  leaderBoard: "leaderboard",
  referrals: "referrals",
  dashboard: "dashboard",
  marginAccounts: "accounts",
  markets: "markets",
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
