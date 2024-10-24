import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import Button, { ButtonProps } from "./Button";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import { MarginAccSelector } from "./MarginAccSelector";
import { useTranslation } from "react-i18next";

export const MarginAccButton = ({
  size,
  ...props
}: ButtonProps & { size: string }) => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { marginAccounts, createAccount, isSuccess } =
    useMarginAccount(address);

  if (!address || !isSuccess) {
    return null;
  }

  if (isSuccess && !marginAccounts.length) {
    return (
      <Button size={size} onClick={createAccount}>
        {t("createMarginAccount")}
      </Button>
    );
  }

  if (isSuccess && marginAccounts.length > 0) {
    return <MarginAccSelector size={size} {...props} />;
  }
  return null;
};
