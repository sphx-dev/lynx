import { act, render, screen, waitFor } from "@testing-library/react";
import "../i18n";
import Futures from "./Futures";
import { vi } from "vitest";
import { DENOMUSDC } from "@/constants";
import { AppWrapper } from "@/testing/AppWrapper";

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

vi.mock("../utils/queryMarkets", async () => {
  return {
    getAllMarkets: async () => {
      return {
        markets: [
          {
            id: 1,
            ticker: "BTCUSDT.P",
            status: 1,
            baseAsset: "BTC",
            quoteAsset: "USDT",
          },
        ],
      };
    },
  };
});

//getPerpetualPositionsByAddress
vi.mock("../utils/queryPerpetualPositions", async () => {
  return {
    PAGE_SIZE: 10n,
    getPerpetualPositionsByAddress: async () => {
      return {
        positions: [
          {
            id: "1",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "",
            entryPrice: "",
            leverage: BigInt(0),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
        ],
        pagination: {
          total: 1n,
        },
      };
    },
  };
});

// src/utils/queryMarginAccounts.ts
vi.mock("../utils/queryMarginAccounts", async () => {
  return {
    createMarginAccount: async () => {
      return {
        code: 0,
      };
    },
    getAccountsByOwner: async () => {
      return {
        marginAccounts: [
          {
            id: 1,
            address: "sphx1",
            number: 1,
            created: new Date(),
          },
        ],
      };
    },
  };
});

// src/utils/getBalance.ts
vi.mock("../utils/getBalance", async () => {
  return {
    getBalance: async () => {
      return {
        denom: DENOMUSDC,
        amount: "100",
      };
    },
  };
});

test("Futures page render properly", async () => {
  // mock for render charting library
  global.URL.createObjectURL = vi.fn(() => "https://demo_feed.tradingview.com");
  render(<Futures />, { wrapper: AppWrapper });
  const button = screen.getByText("Connect");
  expect(button).toBeTruthy();

  const table = screen.getByText("Positions");
  expect(table).toBeTruthy();

  //order input renders correctly
  const longTab = screen.getByText("LONG");
  const shortTab = await screen.findByText("SHORT");

  expect(longTab).toBeTruthy();
  expect(shortTab).toBeTruthy();

  const mainConnectButton = screen.getByText("CONNECT WALLET");
  expect(mainConnectButton).toBeTruthy();

  // section with order book and trades tab renders. additionally trades tab in the table renders
  const orderBookTab = screen.getByText("Order book");
  expect(orderBookTab).toBeTruthy();
  const tradesTab = screen.getAllByText("Trades");
  expect(tradesTab).toHaveLength(1);

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
