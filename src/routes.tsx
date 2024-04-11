import Container from "react-bootstrap/Container"
import Futures from "./pages/Futures"
import BaseTemplate from "./Layouts/BaseTemplate"
import Page404 from "./pages/404"

const ROUTES = {
  features: "futures",
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
        path: ROUTES.features,
        element: <Futures />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]
