import React from "react"
import "./App.css"
import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { useAppSelector } from "./hooks"
import { selectCurrentTheme } from "./state/preferences"
import { ThemeInterface, themes } from "./theme"
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { ThemeProvider } from "styled-components"
import Header from "./components/Header"
import Footer from "./sections/footer"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { avalanche, avalancheFuji } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

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

function App() {
  const content = useRoutes(routes)
  const currentTheme = useAppSelector(selectCurrentTheme)
  const theme: ThemeInterface = themes["dark"]

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={currentTheme === "dark" ? darkTheme() : lightTheme()}
      >
        <ThemeProvider theme={theme}>
          <Header />
          {content}
          <Footer />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
