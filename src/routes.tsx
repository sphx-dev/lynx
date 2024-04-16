import Futures from "./pages/Futures"
import BaseTemplate from "./Layouts/BaseTemplate"
import Page404 from "./pages/404"

export const ROUTES = {
  futures: "futures",
  exchange: "exchange",
  leaderBoard: "leaderboard",
  referrals: "referrals",
}

export const routes = [
  {
    path: "",
    element: <BaseTemplate />,
    children: [
      {
        path: ROUTES.futures,
        element: <Futures />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]
