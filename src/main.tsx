import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import "./i18n"

import { store } from "./state/store"
import App from "./App"
import "./index.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import "@rainbow-me/rainbowkit/styles.css"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
