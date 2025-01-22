import { render, screen, waitFor } from "@testing-library/react";
import Trades from "./Trades";
import { AppWrapper } from "@/testing/AppWrapper";
import { tradesWS } from "../../../mocks/handlers";

describe("Trades Component", () => {
  it("renders 'No data' when there are no trades", async () => {
    render(<Trades />, { wrapper: AppWrapper });
    await waitFor(() => screen.getByText("No data"), { timeout: 5000 });
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("renders trade items when there are trades", async () => {
    render(<Trades />, { wrapper: AppWrapper });

    await waitFor(() => screen.getByText("No data"), { timeout: 5000 });

    tradesWS.broadcast(
      JSON.stringify({
        message_type: "done",
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
