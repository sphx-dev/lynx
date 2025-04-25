import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import { Button } from "./ButtonV2/Button";
import { MarginAccSelector } from "./MarginAccSelector";
import { useTranslation } from "react-i18next";

export const MarginAccButton = () => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { marginAccounts, createAccount, isSuccess } =
    useMarginAccount(address);

  if (!address || !isSuccess) {
    return null;
  }

  if (isSuccess && !marginAccounts.length) {
    return (
      <Button
        type="primary"
        option="filled"
        size="xsmall"
        onClick={createAccount}
      >
        {t("createMarginAccount")}
      </Button>
    );
  }

  if (isSuccess && marginAccounts.length > 0) {
    return <MarginAccSelector />;
  }
  return null;
};
