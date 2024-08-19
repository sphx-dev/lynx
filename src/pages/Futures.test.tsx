import { act, render, screen, waitFor } from "@testing-library/react";
import "../i18n";
import jest from "jest-mock";
import { Provider } from "react-redux";
import { store } from "../state/store";
import Futures from "./Futures";
import { ThemeProvider } from "styled-components";
import { themes } from "../theme";
import { GrazProvider } from "graz";
import { cosmoshub } from "../App";
import { MockKeplr } from "@keplr-wallet/provider-mock";

// mockGetters(MockKeplr);

// function mockGetters(prototype: {}) {
//   const descs = Object.getOwnPropertyDescriptors(prototype);
//   for (const [key, desc] of Object.entries(descs)) {
//     if (desc.get) {
//       vi.spyOn(prototype, key, "get").mockImplementation(() => {
//         console.log("Has been called:", prototype);
//       });
//     }
//   }
// }

const WalletExtensionMock = new MockKeplr(
  async () => {
    return new Uint8Array(0);
  },
  [
    {
      chainId: cosmoshub.chainId,
      bech32Config: { bech32PrefixAccAddr: "cosmos" },
    },
  ],
  "diary match wagon soccer worth planet sea stumble thought post easily want"
);

declare global {
  var keplr: any;
}

globalThis.keplr = WalletExtensionMock;

const Wrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <GrazProvider
        grazOptions={{
          chains: [cosmoshub],
        }}
      >
        <ThemeProvider theme={themes["dark"]}>{children}</ThemeProvider>
      </GrazProvider>
    </Provider>
  );
};
test("Futures page render properly", async () => {
  // mock for render charting library
  global.URL.createObjectURL = jest.fn(
    () => "https://demo_feed.tradingview.com"
  );
  render(<Futures />, { wrapper: Wrapper });
  const button = screen.getByText("Connect");
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
  act(() => {
    button.click();
  });

  await waitFor(
    () => {
      return expect(screen.queryByText("Connect")).toBeFalsy();
    },
    {
      timeout: 100,
    }
  );

  // TODO: header test
  /*await waitFor(
    () => {
      console.log(
        "Button DISCONNECT ->",
        screen.queryByTestId("disconnect-button")
      );
      return expect(screen.queryByTestId("disconnect-button")).toBeTruthy();
    },
    {
      timeout: 100,
    }
  );*/

  // expect(screen.queryByTestId("dissconnect-button")).toBeTruthy();

  // modal opens with a little delay. so we need async query here
  // await screen.findByText("Connect a Wallet");
  // const closeButton = await screen.findByLabelText("Close");
  // closeButton.click();
  // await waitFor(() =>
  //   expect(screen.queryByText("Connect a Wallet")).toBeFalsy()
  // );
});
