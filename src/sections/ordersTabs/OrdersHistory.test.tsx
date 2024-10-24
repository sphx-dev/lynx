import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, Mock } from "vitest";
import OrdersHistory from "./OrdersHistory";
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
    // Mock date
    vi.useFakeTimers();
    let date = new Date("2024-10-01");
    // this line sets the timezone to UTC
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    vi.setSystemTime(date);

    // Mock hooks
    (useChainCosmoshub as Mock).mockReturnValue({ address: "test-address" });
    (useMarginAccount as Mock).mockReturnValue({
      selectedAddress: "test-selected-address",
    });
    (useOrders as Mock).mockReturnValue({
      orders: [
        {
          marketId: "1",
          timestamp: dayjs("2024-10-01").subtract(2, "days").unix(),
          quantity: 1810000,
          price: 5000000,
          leverage: 2,
          side: 1,
          status: 4,
          orderType: 0,
        },
        {
          marketId: "1",
          timestamp: dayjs("2024-10-01").subtract(3, "days").unix(),
          quantity: 1100000,
          price: 4912000,
          leverage: 2,
          side: 1,
          status: 3,
          orderType: 1,
        },
        {
          marketId: "1",
          timestamp: dayjs("2024-10-01").subtract(3, "days").unix(),
          quantity: 1100000,
          price: 4112000,
          leverage: 2,
          side: 1,
          status: 3,
          orderType: 0,
        },
      ],
      totalOrders: 2,
      pageSize: 10,
    });
    (useMarkets as Mock).mockReturnValue({
      markets: [{ id: "1", baseAsset: "BTC", quoteAsset: "USD" }],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  test("renders without crashing", () => {
    const { container } = render(<OrdersHistory />, { wrapper: AppWrapper });

    expect(screen.getAllByText("Market").length).toBe(2);
    expect(screen.getAllByText("Limit").length).toBe(2);
    expect(container.querySelector("table")?.outerHTML).toMatchSnapshot();
  });

  test("displays orders correctly", () => {
    const { container } = render(<OrdersHistory />, { wrapper: AppWrapper });

    const rows = container.querySelectorAll("tr");

    expect(rows[1].querySelectorAll("td")[0].textContent).toBe("BTC/USD");
    expect(rows[1].querySelectorAll("td")[1].textContent).toBe("2024-09-29");
    expect(rows[1].querySelectorAll("td")[2].textContent).toBe("Limit");
    expect(rows[1].querySelectorAll("td")[3].textContent).toBe("1.81");
    expect(rows[1].querySelectorAll("td")[4].textContent).toBe("5.00");
    expect(rows[1].querySelectorAll("td")[5].textContent).toBe("x2");
    expect(rows[1].querySelectorAll("td")[6].textContent).toBe("buy");
    expect(rows[1].querySelectorAll("td")[7].textContent).toBe("Canceled");

    expect(rows[2].querySelectorAll("td")[0].textContent).toBe("BTC/USD");
    expect(rows[2].querySelectorAll("td")[1].textContent).toBe("2024-09-28");
    expect(rows[2].querySelectorAll("td")[2].textContent).toBe("Market");
    expect(rows[2].querySelectorAll("td")[3].textContent).toBe("1.1");
    expect(rows[2].querySelectorAll("td")[4].textContent).toBe("Market Price");
    expect(rows[2].querySelectorAll("td")[5].textContent).toBe("x2");
    expect(rows[2].querySelectorAll("td")[6].textContent).toBe("buy");
    expect(rows[2].querySelectorAll("td")[7].textContent).toBe("Filled");

    expect(rows[3].querySelectorAll("td")[0].textContent).toBe("BTC/USD");
    expect(rows[3].querySelectorAll("td")[1].textContent).toBe("2024-09-28");
    expect(rows[3].querySelectorAll("td")[2].textContent).toBe("Limit");
    expect(rows[3].querySelectorAll("td")[3].textContent).toBe("1.1");
    expect(rows[3].querySelectorAll("td")[4].textContent).toBe("4.11");
    expect(rows[3].querySelectorAll("td")[5].textContent).toBe("x2");
    expect(rows[3].querySelectorAll("td")[6].textContent).toBe("buy");
    expect(rows[3].querySelectorAll("td")[7].textContent).toBe("Filled");
  });

  test("displays placeholder when no orders", () => {
    (useOrders as Mock).mockReturnValue({
      orders: [],
      totalOrders: 0,
      pageSize: 10,
    });
    render(<OrdersHistory />, { wrapper: AppWrapper });
    expect(screen.getByText("No Orders yet")).toBeInTheDocument();
  });
});
