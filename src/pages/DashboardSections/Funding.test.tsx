import { render, screen, waitFor } from "@testing-library/react";
import { Funding } from "./Funding";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
// import { useMarkets } from "@/hooks/useMarkets";
import { getAllMarkets } from "@/utils/queryMarkets";
import { fetchFundingRateLogs } from "./useFundingRate";
import { Mock, vi } from "vitest";
import { AppWrapper } from "@/testing/AppWrapper";

import { act } from "react";
// import { act } from "@testing-library/react";

vi.mock("@/hooks/useChainCosmoshub", () => ({
  useChainCosmoshub: vi.fn(),
}));

vi.mock("@/hooks/useMarginAccounts", () => ({
  useMarginAccount: vi.fn(),
}));

vi.mock("@/utils/queryMarkets", () => ({
  getAllMarkets: vi.fn(),
}));

vi.mock("./useFundingRate", () => ({
  fetchFundingRateLogs: vi.fn(),
}));

describe("Funding", () => {
  const address = "test-address";
  const selectedAddress = "selected-address";
  const markets = [
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
    },
  ];
  const isConnected = true;

  beforeEach(() => {
    (useChainCosmoshub as Mock).mockReturnValue({ address, isConnected });
    (useMarginAccount as Mock).mockReturnValue({ selectedAddress });
    (getAllMarkets as Mock).mockReturnValue({
      markets,
    });
    (fetchFundingRateLogs as Mock).mockResolvedValue([]);
    // screen.getByTestId("connect-test-button").click();
  });

  it("renders the Funding component", () => {
    act(() => {
      render(<Funding />, { wrapper: AppWrapper });
    });

    expect(screen.getByText("Funding Rate Logs")).toBeInTheDocument();
  });

  it("disables the Load button when required fields are missing", () => {
    (useChainCosmoshub as Mock).mockReturnValue({
      address: null,
      isConnected: false,
    });
    act(() => {
      render(<Funding />, { wrapper: AppWrapper });
    });
    expect(screen.getByText("Load")).toBeDisabled();
  });

  it("calls fetchFundingRateLogs on Load button click", async () => {
    (useChainCosmoshub as Mock).mockReturnValue({
      address: "sphx1test",
      isConnected: true,
    });

    (fetchFundingRateLogs as Mock).mockReturnValue([
      {
        id: 1,
        ticker: "BTCUSDC.P",
        size: 1.5,
        funding_rate: 0.0001,
        funding_amount: 0.00015,
        accumulated_funding: 0.00015,
        side: "buy",
        timestamp: "2021-09-01T12:35:00Z",
      },
    ]);

    act(() => {
      render(<Funding />, {
        wrapper: AppWrapper,
      });
    });

    expect(fetchFundingRateLogs).toHaveBeenCalledWith(
      selectedAddress,
      "BTCUSDC.P",
      expect.any(Number),
      expect.any(Number)
    );
  });

  it("displays a message when not connected", () => {
    (useChainCosmoshub as Mock).mockReturnValue({
      address,
      isConnected: false,
    });
    act(() => {
      render(<Funding />, { wrapper: AppWrapper });
    });
    expect(
      screen.getByText(
        "Connect wallet and select a margin account to view funding rate logs"
      )
    ).toBeInTheDocument();
  });

  it("displays the FundingRateTable when data is available", async () => {
    (useChainCosmoshub as Mock).mockReturnValue({
      address: "sphx1test",
      isConnected: true,
    });

    (fetchFundingRateLogs as Mock).mockReturnValue([
      {
        id: 1,
        ticker: "BTCUSDC.P",
        size: 1.5,
        funding_rate: 0.0001,
        funding_amount: 0.00015,
        accumulated_funding: 0.00015,
        side: "buy",
        timestamp: "2021-09-01T12:35:00Z",
      },
    ]);

    let renderResult: any;
    act(() => {
      renderResult = render(<Funding />, {
        wrapper: AppWrapper,
      });
    });
    const { container, getAllByText } = renderResult;

    await waitFor(() => {
      const elements = getAllByText("BTCUSD.P");
      // Two elements containing "BTCUSD.P" should be rendered
      // 1. SymbolSelector
      // 2. Table row
      expect(elements.length).toBe(2);
    });

    expect(getAllByText("BTCUSD.P")).toBeTruthy();
    expect(getAllByText("BTCUSD.P")[0]).toBeInTheDocument();

    expect(fetchFundingRateLogs).toHaveBeenCalledWith(
      selectedAddress,
      "BTCUSDC.P",
      expect.any(Number),
      expect.any(Number)
    );

    await waitFor(() =>
      expect(container.querySelector("tbody")).toBeInTheDocument()
    );

    expect(container.querySelector("table")?.innerHTML).toMatchSnapshot();
  });
});
