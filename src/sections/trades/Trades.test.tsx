import { render, screen, waitFor } from "@testing-library/react";
import Trades from "./Trades";
import { AppWrapper } from "@/testing/AppWrapper";
import { tradesWS } from "../../../mocks/handlers";
import { useTradesWebsocket } from "./useTradesWebsocket";
import { useMarkets } from "@/hooks/useMarkets";
import { Mock } from "vitest";

const TradesWrapperTest = () => {
  useTradesWebsocket();
  return <Trades />;
};

vi.mock("@/hooks/useMarkets", () => ({
  useMarkets: vi.fn(),
}));

describe("Trades Component", () => {
  beforeEach(() => {
    (useMarkets as Mock).mockReturnValue({
      symbol: "BTCUSDC.P",
      markets: [{ id: "1", baseAsset: "BTC", quoteAsset: "USD" }],
    });
  });

  it("renders 'No data' when there are no trades", async () => {
    render(<TradesWrapperTest />, { wrapper: AppWrapper });
    await waitFor(() => screen.getByText("No data"), { timeout: 5000 });
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders trade items when there are trades", async () => {
    render(<TradesWrapperTest />, {
      wrapper: AppWrapper,
    });

    await waitFor(() => screen.getByText("No data"), { timeout: 5000 });

    tradesWS.broadcast(
      JSON.stringify({
        message_type: "done",
        symbol: "BTCUSDC.P",
        body: JSON.stringify({
          id: "1",
          price: "100",
          quantity: "2",
          timestamp: "2023-01-01T12:35:00Z",
          side: "buy",
        }),
      })
    );

    await waitFor(() => screen.getByText("$100.00"), { timeout: 5000 });

    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();

    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("12:35:00")).toBeInTheDocument();
  });
});
