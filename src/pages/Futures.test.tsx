import { render, screen, waitFor } from "@testing-library/react";
import "../i18n";
import React from "react";
import jest from "jest-mock";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { WagmiConfig } from "wagmi";
import Futures from "./Futures";
import { ThemeProvider } from "styled-components";
import { ThemeInterface, themes } from "../theme";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chains, wagmiConfig } from "../App";
import { useAppSelector } from "../hooks";
import { selectCurrentTheme } from "../state/preferences";
const AppWrapper = ({ children }: any) => {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const theme: ThemeInterface = themes["dark"];
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={currentTheme === "dark" ? darkTheme() : lightTheme()}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

const Wrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <AppWrapper>{children}</AppWrapper>
    </Provider>
  );
};
test("Futures page render properly", async () => {
  // mock for render charting library
  global.URL.createObjectURL = jest.fn(
    () => "https://demo_feed.tradingview.com"
  );
  render(<Futures />, { wrapper: Wrapper });
  const button = screen.getByText("CONNECT");
  expect(button).toBeInTheDocument();

  const table = screen.getByText("Positions");
  expect(table).toBeInTheDocument();

  //order input renders correctly
  const longTab = screen.getByText("LONG");
  const shortTab = await screen.findByText("SHORT");

  expect(longTab).toBeInTheDocument();
  expect(shortTab).toBeInTheDocument();

  const mainConnectButton = screen.getByText("CONNECT WALLET");
  expect(mainConnectButton).toBeInTheDocument();

  // section with order book and trades tab renders. additionally trades tab in the table renders
  const orderBookTab = screen.getByText("Order book");
  expect(orderBookTab).toBeInTheDocument();
  const tradesTab = screen.getAllByText("Trades");
  expect(tradesTab).toHaveLength(2);

  // Click on connect button opens wallet modal and close button closes the modal
  button.click();
  // modal opens with a little delay. so we need async query here
  await screen.findByText("Connect a Wallet");
  const closeButton = await screen.findByLabelText("Close");
  closeButton.click();
  await waitFor(() =>
    expect(screen.queryByText("Connect a Wallet")).toBeFalsy()
  );
});
