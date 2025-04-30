import { useState } from "react";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { Input } from "../Input";
import styled from "styled-components";
import Divider from "../Divider";
import { useBalance } from "../../hooks/useBalance";
import { sendTokens } from "../../utils/sendTokens";
import { successAlert } from "../../utils/alerts";
import { DENOMUSDC, PRECISION } from "@/constants";
import { Button } from "../ButtonV2/Button";

async function depositToMarginAccount({
  address,
  marginAccountAddress,
  amount,
  onSuccess,
  onError,
}: {
  address: string;
  marginAccountAddress: string;
  amount: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  try {
    // Deposit to margin account
    console.log(
      `Deposit to margin account, from: ${address}, to: ${marginAccountAddress}, amount: ${amount}`
    );
    await sendTokens(
      {
        from: address,
        to: marginAccountAddress,
        amount,
        denom: DENOMUSDC,
        memo: "Deposit to margin account",
      },
      onSuccess,
      onError
    );
  } catch (error) {
    onError((error as Error)?.message);
  }
}

export const DepositForm = () => {
  const { address } = useChainCosmoshub();
  const { selectedAccount, isSuccess } = useMarginAccount(address);
  const [depositAmount, setDepositAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { formatedAmount: addressBalance, amount: addressBalanceAmount } =
    useBalance(address, DENOMUSDC);
  const { formatedAmount: marginBalance, amount: marginBalanceAmount } =
    useBalance(selectedAccount?.address, DENOMUSDC);

  const onSubmit = async () => {
    if (!address) return;
    if (!selectedAccount?.address) return;

    setIsSubmitting(true);
    setError("");
    try {
      await depositToMarginAccount({
        address,
        marginAccountAddress: selectedAccount?.address,
        amount: Number(depositAmount) * PRECISION,
        onSuccess: () => {
          setIsSubmitting(false);
          setDepositAmount("");
          setError("");
          successAlert("Deposit successful");
        },
        onError: msg => {
          setIsSubmitting(false);
          setError(msg);
        },
      });
    } catch (error) {
      setIsSubmitting(false);
      setError((error as Error)?.message);
    }
  };

  if (!isSuccess) {
    return null;
  }

  return (
    <Container>
      <Header>Deposit to Margin Account</Header>
      <Divider />
      <FormRow>
        <label>
          Availabe balance:{" "}
          <span
            data-testid="deposit-form-wallet-balance"
            data-amount={addressBalanceAmount}
          >
            {addressBalance}
          </span>{" "}
          USD
        </label>
      </FormRow>
      <Divider />
      <FormRow>
        <label htmlFor="deposit-form-input-amount">Amount</label>
        <Input
          id="deposit-form-input-amount"
          type="number"
          placeholder="0.00"
          value={depositAmount}
          onChange={e => {
            const value = (e.target as HTMLInputElement).value;
            setDepositAmount(value);
          }}
        />
      </FormRow>
      <FormRow>
        <label>Margin Account #{selectedAccount?.id?.number} </label>

        <StyledLabel title={selectedAccount?.address}>
          {reduceAddress(selectedAccount?.address)}
        </StyledLabel>
        <label>
          Balance:{" "}
          <span
            data-testid="deposit-form-margin-balance"
            data-amount={marginBalanceAmount}
          >
            {marginBalance}
          </span>{" "}
          USD
        </label>
      </FormRow>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormRow style={{ justifyContent: "space-around" }}>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </FormRow>
    </Container>
  );
};

const Container = styled.div`
  font-family: var(--text-md-font-family);
  font-size: var(--text-md-font-size);
  font-weight: var(--text-md-font-weight);
  line-height: var(--text-md-line-height);
`;

const Header = styled.h2`
  margin-bottom: 26px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 8px;
  gap: 8px;
`;

const StyledLabel = styled.label`
  color: var(--text-secondary-link);
  &.active {
    color: var(--text-primary);
  }
  text-transform: uppercase;
  text-decoration: none;
`;

const reduceAddress = (address: string = "") =>
  `${address.slice(0, 8)}...${address.slice(-4)}`;
