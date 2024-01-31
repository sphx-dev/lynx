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
import HeaderTwo from "./sections/HeaderTwo"
import { themes } from "./theme"
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
  const [isReady, setReady] = useState(false)

  const currentTheme = useAppSelector(selectCurrentTheme)
  // const theme = useMemo(() => themes[currentTheme], [currentTheme])
  const theme: any = themes["dark"]
  console.log(theme)

  useEffect(() => {
    setReady(true)
  }, [])

  return isReady ? (
    <RainbowKitProvider
      chains={chains}
      theme={currentTheme === "dark" ? darkTheme() : lightTheme()}
    >
      <ThemeProvider theme={theme}>
        <HeaderTwo />
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
