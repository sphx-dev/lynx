import React, { PropsWithChildren } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useAppSelector } from "./hooks";
import { selectCurrentTheme } from "./state/preferences";
import { ThemeInterface, themes } from "./theme";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./sections/footer";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Toaster } from "react-hot-toast";
import { useGetAccountQuery } from "./utils/api/accountApi";
import { useRainbowKitDarkTheme } from "./hooks/useRainbowKitDarkTheme";
import { useMediaQuery } from "react-responsive";
import OnlyDesktopMessage from "./components/OnlyDesktopMessage";
import { BREAK_POINTS } from "./constants";
import axios from "axios";
export const { chains, publicClient } = configureChains(
  [avalanche, avalancheFuji],
  [publicProvider()]
);

const Desktop = ({ children }: PropsWithChildren) => {
  const isDesktop = useMediaQuery({ minWidth: BREAK_POINTS.DESKTOP_MIN_WIDTH });
  return isDesktop ? children : null;
};

const AnotherDevices = ({ children }: PropsWithChildren) => {
  const isBelowDesktop = useMediaQuery({
    maxWidth: BREAK_POINTS.DESKTOP_MIN_WIDTH - 1,
  });
  return isBelowDesktop ? children : null;
};

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const AppInitializtion = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();

  useGetAccountQuery(undefined, { skip: !isConnected });

  return children;
};
function App() {
  const content = useRoutes(routes);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const theme: ThemeInterface = themes["dark"];

  const { rainbowDarkTheme } = useRainbowKitDarkTheme();

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={currentTheme === "dark" ? rainbowDarkTheme : lightTheme()}
      >
        <ThemeProvider theme={theme}>
          <AppInitializtion>
            <Desktop>
              <Header />
              {content}
              <Footer />
              <Toaster />
            </Desktop>
            <AnotherDevices>
              <OnlyDesktopMessage />
            </AnotherDevices>
          </AppInitializtion>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
