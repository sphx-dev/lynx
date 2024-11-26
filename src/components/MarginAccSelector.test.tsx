import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { MarginAccSelector } from "./MarginAccSelector";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import { useBalances } from "../hooks/useBalance";
import { AppWrapper } from "@/testing/AppWrapper";
import userEvent from "@testing-library/user-event";

vi.mock("../hooks/useChainCosmoshub", () => ({
  useChainCosmoshub: vi.fn(),
}));

const mockSetSelectedIndex = vi.fn();
vi.mock("../hooks/useMarginAccounts", () => ({
  useMarginAccount: vi.fn(),
}));
vi.mock("../hooks/useBalance", () => ({
  useBalances: vi.fn(),
}));

const modalMocks = vi.hoisted(() => {
  const openModal = vi.fn();
  return {
    useModalStore: () => {
      return {
        openModal: openModal,
      };
    },
  };
});

vi.mock("./Modal/Modal", () => ({
  useModalStore: modalMocks.useModalStore,
}));

describe("MarginAccSelector", () => {
  beforeEach(() => {
    (useChainCosmoshub as Mock).mockReturnValue({
      address: "test-address",
    });
    (useMarginAccount as Mock).mockReturnValue({
      marginAccounts: [
        { id: { number: 1 }, address: "account-1" },
        { id: { number: 2 }, address: "account-2" },
      ],
      selectedAccount: { id: { number: 1 }, address: "account-1" },
      setSelectedIndex: mockSetSelectedIndex,
      selectedIndex: 0,
    });
    (useBalances as Mock).mockReturnValue({
      balances: [{ amount: 1000000 }, { amount: 2000000 }],
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders the selected account button", () => {
    render(<MarginAccSelector size="sm" />, { wrapper: AppWrapper });
    expect(screen.getByText("Account #1")).toBeInTheDocument();
  });

  test("toggles the dropdown menu on button click", () => {
    render(<MarginAccSelector size="sm" />, { wrapper: AppWrapper });
    const button = screen.getByText("Account #1");
    fireEvent.click(button);
    expect(screen.getByText("Account #1 (1 USD)")).toBeInTheDocument();
    expect(screen.getByText("Account #2 (2 USD)")).toBeInTheDocument();
  });

  test("selects an account from the dropdown menu", () => {
    render(<MarginAccSelector size="sm" />, {
      wrapper: AppWrapper,
    });
    const button = screen.getByText("Account #1");
    fireEvent.click(button);
    const account2 = screen.getByText("Account #2 (2 USD)");

    fireEvent.click(account2);
    expect(mockSetSelectedIndex).toHaveBeenCalledWith(1);
  });

  test("opens the deposit modal", async () => {
    render(<MarginAccSelector size="sm" />, { wrapper: AppWrapper });

    const button = screen.getByText("Account #1");
    await userEvent.click(button);

    const depositButton = screen.getByText("Deposit");
    await userEvent.click(depositButton);

    const openModal = modalMocks.useModalStore().openModal;
    expect(openModal).toHaveBeenCalledWith("DEPOSIT");
  });

  test("opens the withdraw modal", () => {
    render(<MarginAccSelector size="sm" />, { wrapper: AppWrapper });

    const button = screen.getByText("Account #1");
    fireEvent.click(button);

    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);

    const openModal = modalMocks.useModalStore().openModal;
    expect(openModal).toHaveBeenCalledWith("WITHDRAW");
  });
});
