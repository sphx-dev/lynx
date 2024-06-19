import Futures from "./pages/Futures";
import BaseTemplate from "./Layouts/BaseTemplate";
import Page404 from "./pages/404";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";

export const ROUTES = {
  futures: "futures",
  exchange: "exchange",
  leaderBoard: "leaderboard",
  referrals: "referrals",
  dashboard: "dashboard",
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
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];
