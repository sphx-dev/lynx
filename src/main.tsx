import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  arbitrum,
  avalanche,
  mainnet,
  polygon,
  optimism,
  goerli,
  optimismGoerli,
  base,
  zora,
} from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

import { store } from "./store"
import App from "./App"
import Header from "./sections/Header"
import HeaderTwo from "./sections/HeaderTwo"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@rainbow-me/rainbowkit/styles.css"

const chain = {
  optimism,
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  goerli,
  optimismGoerli,
  base,
  zora,
}

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {/* <Header /> */}
          <HeaderTwo />
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
)
