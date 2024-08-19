import React, { PropsWithChildren } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ThemeInterface, themes } from "./theme";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./sections/footer";
import { Toaster } from "react-hot-toast";
import { useGetAccountQuery } from "./utils/api/accountApi";
import { useMediaQuery } from "react-responsive";
import OnlyDesktopMessage from "./components/OnlyDesktopMessage";
import { BREAK_POINTS } from "./constants";
import { GrazProvider } from "graz";
import { ChainInfo } from "@keplr-wallet/types";
// import { Bech32Address } from "@keplr-wallet/cosmos";
import { useChainCosmoshub } from "./hooks/useChainCosmoshub";

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

const AppInitializtion = ({ children }: PropsWithChildren) => {
  const { isConnected } = useChainCosmoshub();

  useGetAccountQuery(undefined, { skip: !isConnected });

  return children;
};

// https://github.com/chainapsis/keplr-wallet/blob/master/apps/mobile/src/config.ts
export const cosmoshub: ChainInfo = {
  rpc: "https://rpc-cosmoshub.keplr.app",
  rest: "https://lcd-cosmoshub.keplr.app",
  chainId: "cosmoshub-4",
  chainName: "Cosmos Hub",
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: "cosmos",
  },
  walletUrl: "https://wallet.keplr.app/chains/cosmos-hub",
  walletUrlForStaking: "https://wallet.keplr.app/chains/cosmos-hub",
  bip44: {
    coinType: 118,
  },
  // bech32Config: Bech32Address.defaultBech32Config("cosmos"),
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  features: ["ibc-transfer", "ibc-go"],
};

function App() {
  const content = useRoutes(routes);
  const theme: ThemeInterface = themes["dark"];

  return (
    <GrazProvider
      grazOptions={{
        chains: [cosmoshub],
      }}
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
    </GrazProvider>
  );
}

export default App;
