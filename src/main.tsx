import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import App from "./App"
import Header from "./Header"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header>
        <App />
      </Header>
    </Provider>
  </React.StrictMode>,
)
