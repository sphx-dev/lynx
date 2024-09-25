import { useState } from "react";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useBalance } from "../../hooks/useBalance";
import { successAlert } from "../../utils/alerts";
import styled from "styled-components";
import Button from "../Button";
import { Input } from "../Input";

export const WithdrawForm = () => {
  const { address } = useChainCosmoshub();
  const { selectedAccount, isSuccess } = useMarginAccount(address);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { formatedAmount: addressBalance } = useBalance(address, "uusdc");
  const { formatedAmount: marginBalance } = useBalance(
    selectedAccount?.address,
    "uusdc"
  );

  const onSubmit = async () => {
    if (!address) return;
    if (!selectedAccount?.address) return;

    setIsSubmitting(true);
    setError("");
    try {
      await withdrawFromMarginAccount({
        from: selectedAccount?.address,
        to: address,
        amount: Number(withdrawAmount) * 1e6,
        onSuccess: () => {
          setIsSubmitting(false);
          setWithdrawAmount("");
          setError("");
          successAlert("Withdraw successful");
        },
        onError: (msg: string) => {
          setIsSubmitting(false);
          setError(msg);
        },
      });
    } catch (error) {
      setIsSubmitting(false);
      setError((error as Error).message);
    }
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Header>Withdraw From Margin Account</Header>
      <Title>Withdraw Amount</Title>
      <FormRow>
        <InputWrapper>
          <Input
            type="number"
            name="withdrawAmount"
            id="withdrawAmount"
            placeholder="0.00"
            value={withdrawAmount}
            onChange={e =>
              setWithdrawAmount((e.target as HTMLInputElement).value)
            }
            required
          />
        </InputWrapper>
      </FormRow>
      <Title>Margin Account</Title>
      <FormRow>
        <InputWrapper>
          <Input
            type="text"
            name="marginAccount"
            id="marginAccount"
            value={selectedAccount?.address}
            readOnly
          />
        </InputWrapper>
      </FormRow>

      <FormRow style={{ display: "flex", justifyContent: "space-between" }}>
        <Label>Available Balance:</Label>
        <Label>{marginBalance} USDC</Label>
      </FormRow>
      <FormRow style={{ display: "flex", justifyContent: "space-between" }}>
        <Label>Address Balance:</Label>
        <Label>{addressBalance} USDC</Label>
      </FormRow>
      <FormRow style={{ display: "flex", justifyContent: "space-around" }}>
        <Button type="submit" disabled={!isSuccess || isSubmitting}>
          {isSubmitting ? "Withdrawing..." : "Withdraw"}
        </Button>
      </FormRow>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

const Form = styled.form`
  ${({ theme }) => theme.fonts.typography.textMd}
  margin-bottom: 1rem;
  min-width: 400px;
`;

const Header = styled.h2`
  margin-bottom: 26px;
`;
const Title = styled.h3``;

const FormRow = styled.div`
  margin-bottom: 16px;
  margin-top: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  margin-top: 0.25rem;
  position: relative;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const ErrorMessage = styled.p`
  color: red;
`;

const withdrawFromMarginAccount = async ({
  from,
  to,
  amount,
  onSuccess,
  onError,
}: {
  from: string;
  to: string;
  amount: number;
  onSuccess: () => void;
  onError?: (msg: string) => void;
}) => {
  try {
    console.log({
      from: from,
      to: to,
      amount: amount,
    });

    onSuccess();
  } catch (error) {
    console.error("Error sending tokens:", error);
    if (onError) {
      onError((error as Error).message);
    }
  }
};
