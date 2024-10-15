import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import ClosedOrders from "./ClosedOrders";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useOrders } from "@/hooks/useOrders";
import { useMarkets } from "@/hooks/useMarkets";
import dayjs from "dayjs";
import { AppWrapper } from "@/testing/AppWrapper";

// Mock hooks
vi.mock("@/hooks/useChainCosmoshub", () => ({
  useChainCosmoshub: vi.fn(),
}));
vi.mock("@/hooks/useMarginAccounts", () => ({
  useMarginAccount: vi.fn(),
}));
vi.mock("@/hooks/useOrders", () => ({
  useOrders: vi.fn(),
}));
vi.mock("@/hooks/useMarkets", () => ({
  useMarkets: vi.fn(),
}));

describe("ClosedOrders", () => {
  beforeEach(() => {
    (useChainCosmoshub as Mock).mockReturnValue({ address: "test-address" });
    (useMarginAccount as Mock).mockReturnValue({
      selectedAddress: "test-selected-address",
    });
    (useOrders as Mock).mockReturnValue({
      orders: [
        {
          marketId: "1",
          timestamp: dayjs().subtract(2, "days").unix(),
          quantity: 1000000,
          price: 5000000,
          leverage: 2,
          side: 1,
          status: 4,
        },
      ],
      totalOrders: 1,
      pageSize: 10,
    });
    (useMarkets as Mock).mockReturnValue({
      markets: [{ id: "1", baseAsset: "BTC", quoteAsset: "USD" }],
    });
  });

  it("renders without crashing", () => {
    render(<ClosedOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("Market")).toBeInTheDocument();
  });

  it("displays orders correctly", () => {
    render(<ClosedOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("BTC/USD")).toBeInTheDocument();
    expect(
      screen.getByText(dayjs().subtract(2, "days").format("YYYY-MM-DD"))
    ).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5.00")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();
    expect(screen.getByText("buy")).toBeInTheDocument();
    expect(screen.getByText("Canceled")).toBeInTheDocument();
  });

  it("displays placeholder when no orders", () => {
    (useOrders as Mock).mockReturnValue({
      orders: [],
      totalOrders: 0,
      pageSize: 10,
    });
    render(<ClosedOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("No Orders yet")).toBeInTheDocument();
  });
});
