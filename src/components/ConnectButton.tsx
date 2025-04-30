import React, { useMemo } from "react";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "./ButtonV2/Button";

type ConnectButtonProps = ButtonProps & {
  text?: string;
};

const GET_KEPLR_URL = "https://www.keplr.app/get";

export const ConnectButton = React.memo(
  ({ text, size, ...props }: ConnectButtonProps) => {
    const { connect, disconnect, isConnected, account, addChain } =
      useChainCosmoshub();
    const address = account?.bech32Address;

    const { t } = useTranslation();

    const hasKeplr = !!window?.keplr;
    // const hasChain = (async () => {
    //   return await window.keplr.getChainInfosWithoutEndpoints();
    // })();
    // console.log(hasChain);

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

    if (!hasKeplr) {
      return (
        <Button
          type="primary"
          option="filled"
          size="xsmall"
          as="a"
          href={GET_KEPLR_URL}
          target="_blank"
          title={t("getKeplrMessage")}
        >
          {t("getKeplrButton")}
        </Button>
      );
    }

    return (
      <>
        <Button
          type="neutral"
          option="stroke"
          size="xxsmall"
          onClick={() => addChain()}
        >
          Add Chain
        </Button>
        {!isConnected ? (
          <Button
            {...props}
            type="primary"
            option="stroke"
            size="xxsmall"
            onClick={() => connect()}
          >
            {text ?? t("connect")}
          </Button>
        ) : (
          <Button
            {...props}
            data-testid="disconnect-button"
            type="neutral"
            option="stroke"
            size="xxsmall"
            onClick={() => {
              // TODO: add confirmation modal to add chain config to Keplr
              // addChain();
              disconnect();
            }}
          >
            {addressDisplay}
          </Button>
        )}
      </>
    );
  }
);
