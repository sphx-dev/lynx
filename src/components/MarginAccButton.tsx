import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import Button, { ButtonProps } from "./Button";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import { MarginAccSelector } from "./MarginAccSelector";

export const MarginAccButton = ({
  size,
  ...props
}: ButtonProps & { size: string }) => {
  const { address } = useChainCosmoshub();
  const { marginAccounts, createAccount, isSuccess } =
    useMarginAccount(address);

  if (!address || !isSuccess) {
    return null;
  }

  if (isSuccess && !marginAccounts.length) {
    return (
      <Button size={size} onClick={createAccount}>
        Create Margin Account
      </Button>
    );
  }

  if (isSuccess && marginAccounts.length > 0) {
    return <MarginAccSelector size={size} {...props} />;
  }
  return null;
};
