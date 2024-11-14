import { render, screen, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import PendingOrders from "./PendingOrders";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useCancelOrder, useOrders } from "../../hooks/useOrders";
import { useMarkets } from "../../hooks/useMarkets";
import { OrderSide } from "proto-codecs/codegen/sphx/order/order";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { AppWrapper } from "@/testing/AppWrapper";

vi.mock("../../hooks/useChainCosmoshub", () => ({
  useChainCosmoshub: vi.fn(),
}));

vi.mock("../../hooks/useMarginAccounts", () => ({
  useMarginAccount: vi.fn(),
}));

vi.mock("../../hooks/useOrders", () => ({
  useOrders: vi.fn(),
  useCancelOrder: vi.fn(),
}));

vi.mock("../../hooks/useMarkets", () => ({
  useMarkets: vi.fn(),
}));

describe("PendingOrders", () => {
  const mockUseChainCosmoshub = useChainCosmoshub as Mock;
  const mockUseMarginAccount = useMarginAccount as Mock;
  const mockUseOrders = useOrders as Mock;
  const mockUseCancelOrder = useCancelOrder as Mock;
  const mockUseMarkets = useMarkets as Mock;

  beforeEach(() => {
    vi.useFakeTimers();
    mockUseChainCosmoshub.mockReturnValue({ address: "test-address" });
    mockUseMarginAccount.mockReturnValue({
      selectedAddress: "test-selected-address",
    });
    mockUseOrders.mockReturnValue({
      orders: [
        {
          marketId: "1",
          //   timestamp: "1633024800",
          timestamp:
            new Date(
              new Date("2021-10-01").getTime() -
                new Date("2021-10-01").getTimezoneOffset() * 60 * 1000
            ).getTime() /
              1000 +
            "",
          quantity: "1000000",
          price: "500000",
          leverage: "10",
          side: OrderSide.ORDER_SIDE_BUY,
          status: OrderStatus.ORDER_STATUS_OPEN,
          id: {
            number: "1",
            marginAccountAddress: "test-margin-account-address",
          },
        },
      ],
      totalOrders: 1,
      pageSize: 10,
    });
    const cancelOrder = vi.fn();
    cancelOrder.mockReturnValue(new Promise(() => {}));
    mockUseCancelOrder.mockReturnValue({ cancelOrder: cancelOrder });
    mockUseMarkets.mockReturnValue({
      markets: [{ id: "1", baseAsset: "BTC", quoteAsset: "USD" }],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<PendingOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("Market")).toBeInTheDocument();
  });

  it("displays 'No Orders yet' when there are no orders", () => {
    mockUseOrders.mockReturnValueOnce({
      orders: [],
      totalOrders: 0,
      pageSize: 10,
    });
    render(<PendingOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("No Orders yet")).toBeInTheDocument();
  });

  it("renders orders correctly", () => {
    let date = new Date("2024-10-01");
    // this line sets the timezone to UTC
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    vi.setSystemTime(date);

    render(<PendingOrders />, { wrapper: AppWrapper });
    expect(screen.getByText("BTC/USD")).toBeInTheDocument();
    expect(screen.getByText("2021-10-01")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("0.50")).toBeInTheDocument();
    expect(screen.getByText("x10")).toBeInTheDocument();
    expect(screen.getByText("buy")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("calls cancelOrder when cancel button is clicked", async () => {
    const { cancelOrder } = mockUseCancelOrder();
    render(<PendingOrders />, { wrapper: AppWrapper });
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(cancelOrder).toHaveBeenCalled();
  });

  //   it("disables cancel button when order is being cancelled", async () => {
  //     render(<PendingOrders />, { wrapper: AppWrapper });
  //     const cancelButton = screen.getByText("Cancel");
  //     fireEvent.click(cancelButton);
  //     await waitFor(() => {
  //       expect(cancelButton).toBeDisabled();
  //     });
  //   });
});
