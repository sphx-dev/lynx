import { AppWrapper } from "@/testing/AppWrapper";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";

beforeEach(() => {
  vi.doMock("@/utils/queryMarginAccounts", async () => {
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

  vi.doMock("@/utils/queryMarkets", async () => {
    return {
      getAllMarkets: async () => {
        return {
          markets: [
            {
              id: 1n,
              ticker: "BTCUSDC.P",
              status: 1,
              baseAsset: "BTC",
              quoteAsset: "USDC",
            },
            {
              id: 2n,
              ticker: "ETHUSDC.P",
              status: 1,
              baseAsset: "ETH",
              quoteAsset: "USDC",
            },
          ],
        };
      },
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules(); // Reset the module cache after each test
  vi.resetAllMocks();
});

test("Renders empty table in Positions section", async () => {
  vi.doMock("@/hooks/usePositions", () => ({
    usePositions: () => ({
      data: {
        positions: [],
        pagination: {
          nextKey: Uint8Array.from([]),
          total: 0n,
        },
      },
    }),
  }));

  const { default: Positions } = await import("./Positions");

  render(<Positions />, { wrapper: AppWrapper });
  act(() => {
    // Connect wallet
    screen.getByTestId("connect-test-button").click();
  });

  await screen.findByTestId("perpetual-positions-table-empty");
  const content = screen.getByTestId("perpetual-positions-table-empty");
  expect(content).toBeTruthy();
});

test("Render Positions section properly", async () => {
  vi.doMock("@/hooks/usePositions", () => ({
    usePositions: () => ({
      data: {
        positions: [
          {
            id: "1",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "1000",
            entryPrice: "59000000000",
            leverage: BigInt(1),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
        ],
        pagination: {
          nextKey: Uint8Array.from([]),
          total: 1n,
        },
      },
    }),
  }));

  const { default: Positions } = await import("./Positions");

  render(<Positions />, { wrapper: AppWrapper });
  act(() => {
    // Connect wallet
    screen.getByTestId("connect-test-button").click();
  });

  await waitFor(
    () => {
      expect(screen.getByTestId("perpetual-positions-table")).toBeTruthy();
    },
    { timeout: 5000 }
  );
  await screen.findByTestId("perpetual-positions-table");
  const table = screen.getByTestId("perpetual-positions-table");

  expect(table).toBeTruthy();
  expect(table.innerHTML).toMatchSnapshot();
});

test("Closes position by Market", async () => {
  vi.doMock("@/hooks/usePositions", () => ({
    usePositions: () => ({
      data: {
        positions: [
          {
            id: "1",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "1000",
            entryPrice: "59000000000",
            leverage: BigInt(1),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
          {
            id: "2",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "10000",
            entryPrice: "2300000000",
            leverage: BigInt(1),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
        ],
        pagination: {
          nextKey: Uint8Array.from([]),
          total: 2n,
        },
      },
    }),
  }));

  const useCreateOrderReturn = {
    placeMarketOrder: vi.fn(),
    marketStatus: { status: "success", isLoading: false },
  };
  useCreateOrderReturn.placeMarketOrder.mockImplementation(async () => {
    return {
      code: 0,
    };
  });
  vi.doMock("@/hooks/useOrders", () => ({
    useCreateOrder: () => useCreateOrderReturn,
  }));
  const spy = vi.spyOn(useCreateOrderReturn, "placeMarketOrder");

  const { default: Positions } = await import("./Positions");

  render(<Positions />, { wrapper: AppWrapper });
  act(() => {
    // Connect wallet
    screen.getByTestId("connect-test-button").click();
  });

  await waitFor(
    () => {
      expect(screen.getByTestId("perpetual-positions-table")).toBeTruthy();
    },
    { timeout: 5000 }
  );
  await screen.findByTestId("perpetual-positions-table");
  const table = screen.getByTestId("perpetual-positions-table");

  expect(table).toBeTruthy();

  const closePositionButton = screen.getByTestId("close-position-market-0");
  act(() => {
    closePositionButton.click();
  });
  // console.log(table.innerHTML);

  await screen.findByTestId("modal-content");
  const modal = screen.getByTestId("modal-content");
  const input = within(modal).getByPlaceholderText("Qty");
  const submitButton = within(modal).getByText("Confirm");

  await userEvent.clear(input);
  await userEvent.type(input, "0.00025");

  act(() => {
    submitButton.click();
  });

  await waitFor(() => {
    expect(spy).toHaveBeenCalledTimes(1);
  });

  expect(spy.mock.calls[0][0]).toMatchObject(
    expect.objectContaining({
      address: "sphx1ce0nzfm5a0j5yg48xz88qr430caaxdrsysh08z",
      leverage: 1n,
      marginAccountAddress: "sphx1123456789",
      marketId: 1n,
      orderId: expect.any(BigInt),
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
      quantity: 250n,
      side: 1,
    })
  );
});

test("Closes position by Limit", async () => {
  vi.doMock("@/hooks/usePositions", () => ({
    usePositions: () => ({
      data: {
        positions: [
          {
            id: "1",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "1000",
            entryPrice: "59000000000",
            leverage: BigInt(1),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
          {
            id: "2",
            marginAccount: "sphx1123456789",
            marketId: BigInt(1),
            size: "10000",
            entryPrice: "2300000000",
            leverage: BigInt(1),
            entryTime: BigInt(0),
            side: 0,
            tpOrderId: { marginAccountAddress: "", number: BigInt(0) },
            slOrderId: { marginAccountAddress: "", number: BigInt(0) },
            status: 0,
          },
        ],
        pagination: {
          nextKey: Uint8Array.from([]),
          total: 2n,
        },
      },
    }),
  }));

  const useCreateOrderReturn = {
    placeLimitOrder: vi.fn(),
    limitStatus: { status: "success", isLoading: false },
  };
  useCreateOrderReturn.placeLimitOrder.mockImplementation(async () => {
    return {
      code: 0,
    };
  });
  vi.doMock("@/hooks/useOrders", () => ({
    useCreateOrder: () => useCreateOrderReturn,
  }));
  const spy = vi.spyOn(useCreateOrderReturn, "placeLimitOrder");

  const { default: Positions } = await import("./Positions");

  render(<Positions />, { wrapper: AppWrapper });
  act(() => {
    // Connect wallet
    screen.getByTestId("connect-test-button").click();
  });

  await waitFor(
    () => {
      expect(screen.getByTestId("perpetual-positions-table")).toBeTruthy();
    },
    { timeout: 5000 }
  );
  await screen.findByTestId("perpetual-positions-table");
  const table = screen.getByTestId("perpetual-positions-table");

  expect(table).toBeTruthy();

  const closePositionButton = screen.getByTestId("close-position-limit-0");
  act(() => {
    closePositionButton.click();
  });

  await screen.findByTestId("modal-content");
  const modal = screen.getByTestId("modal-content");

  // const inputPrize = screen.getByQuerySelector('input[name="price"]');
  // const inputSize = screen.getByQuerySelector('input[name="size"]');
  const inputPrize = within(modal).getByTestId("input-price");
  const inputSize = within(modal).getByTestId("input-size");
  const submitButton = within(modal).getByText("Confirm");

  await userEvent.clear(inputPrize);
  await userEvent.type(inputPrize, "59500");
  await userEvent.clear(inputSize);
  await userEvent.type(inputSize, "0.0025");
  act(() => {
    submitButton.click();
  });

  await waitFor(() => {
    expect(spy).toHaveBeenCalledTimes(1);
  });

  expect(spy.mock.calls[0][0]).toMatchObject(
    expect.objectContaining({
      address: "sphx1ce0nzfm5a0j5yg48xz88qr430caaxdrsysh08z",
      leverage: 1n,
      marginAccountAddress: "sphx1123456789",
      marketId: 1n,
      orderId: expect.any(BigInt),
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
      quantity: 2500n,
      side: 1,
    })
  );
});
