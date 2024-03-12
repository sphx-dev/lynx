import React, { useState, useEffect, useMemo } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { avalanche, avalancheFuji } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { ThemeProvider } from "styled-components"

import { store } from "./state/store"
import { selectCurrentTheme } from "./state/preferences"
import App from "./App"
import Header from "./common/Header"
import { ThemeInterface, themes } from "./theme"
import { useAppSelector } from "./hooks"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@rainbow-me/rainbowkit/styles.css"

const { chains, publicClient } = configureChains(
  [avalanche, avalancheFuji],
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

const InnerApp: React.FC<any> = ({ pageProps: any }) => {
  const [isReady, setReady] = useState(true)

  const currentTheme = useAppSelector(selectCurrentTheme)
  // const theme = useMemo(() => themes[currentTheme], [currentTheme])
  const theme: ThemeInterface = themes["dark"]

  // useEffect(() => {
  //   setReady(true)
  // }, [])

  return isReady ? (
    <RainbowKitProvider
      modalSize="compact"
      chains={chains}
      theme={currentTheme === "dark" ? darkTheme() : lightTheme()}
    >
      <ThemeProvider theme={theme}>
        <Header />
        <App />
      </ThemeProvider>
    </RainbowKitProvider>
  ) : null
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <InnerApp />
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
)
