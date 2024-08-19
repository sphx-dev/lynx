import { useMemo } from "react";
import { Button } from ".";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "./Button";

type ConnectButtonProps = ButtonProps & {
  text?: string;
};

export const ConnectButton = ({ text, ...props }: ConnectButtonProps) => {
  const { connect, disconnect, isConnected, account } = useChainCosmoshub();
  const address = account?.bech32Address;

  const { t } = useTranslation();

  const addressDisplay = useMemo(() => {
    if (address) {
      return (
        address.substring(0, 10) +
        "..." +
        address.substring(address.length - 4, address.length)
      );
    }
    return t("disconnect");
  }, [address, t]);

  return (
    <>
      {!isConnected ? (
        <Button variant="primary" {...props} onClick={() => connect()}>
          {text ?? t("connect")}
        </Button>
      ) : (
        <Button
          data-test="disconnect-button"
          variant="secondary"
          {...props}
          onClick={() => disconnect()}
        >
          {addressDisplay}
        </Button>
      )}
    </>
  );
};
