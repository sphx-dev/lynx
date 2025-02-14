import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { DepositForm } from "./DepositForm";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useBalance } from "../../hooks/useBalance";
import { sendTokens } from "../../utils/sendTokens";
import { AppWrapper } from "@/testing/AppWrapper";
import { PRECISION } from "@/constants";

vi.mock("../../hooks/useChainCosmoshub");
vi.mock("../../hooks/useMarginAccounts");
vi.mock("../../hooks/useBalance");
vi.mock("../../utils/sendTokens");
vi.mock("../../utils/alerts");

describe("DepositForm", () => {
  const mockAddress = "cosmos1address";
  const mockMarginAccount = {
    address: "cosmos1marginaccount",
    id: { number: 1 },
  };

  beforeEach(() => {
    (useChainCosmoshub as Mock).mockReturnValue({ address: mockAddress });
    (useMarginAccount as Mock).mockReturnValue({
      selectedAccount: mockMarginAccount,
      isSuccess: true,
    });
    (useBalance as Mock).mockImplementation((address, denom) => ({
      formatedAmount: address === mockAddress ? "1000" : "500",
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<DepositForm />, { wrapper: AppWrapper });
    expect(screen.getByText("Deposit to Margin Account")).toBeInTheDocument();
    expect(screen.getByTestId("deposit-form-wallet-balance").textContent).toBe(
      "1000"
    );
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Margin Account #1")).toBeInTheDocument();
    expect(screen.getByTestId("deposit-form-margin-balance").textContent).toBe(
      "500"
    );
  });

  it("handles form submission successfully", async () => {
    (sendTokens as Mock).mockResolvedValueOnce(undefined);
    render(<DepositForm />, { wrapper: AppWrapper });

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(sendTokens).toHaveBeenCalledWith(
        {
          from: mockAddress,
          to: mockMarginAccount.address,
          amount: 100 * PRECISION,
          denom: "usdc",
          memo: "Deposit to margin account",
        },
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  it("handles form submission error", async () => {
    const errorMessage = "Transaction failed";
    (sendTokens as Mock).mockImplementationOnce((_, __, onError) => {
      onError(errorMessage);
    });
    render(<DepositForm />, { wrapper: AppWrapper });

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
