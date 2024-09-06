import React, { useMemo } from "react";
import { Button } from ".";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "./Button";

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
          size={size}
          style={{ textAlign: "center" }}
          as="a"
          href={GET_KEPLR_URL}
          target="_blank"
          title={t("getKeplrMessage")}
        >
          {t("getKeplrButton")}
        </Button>
      );
    }

    // if (!hasChain) {
    //   return (
    //     <Button size={size} onClick={() => addChain()}>
    //       Add Chain
    //     </Button>
    //   );
    // }

    return (
      <>
        <Button size={size} onClick={() => addChain()}>
          Add Chain
        </Button>
        {!isConnected ? (
          <Button
            variant="primary"
            size={size}
            {...props}
            onClick={() => connect()}
          >
            {text ?? t("connect")}
          </Button>
        ) : (
          <Button
            data-test="disconnect-button"
            variant="secondary"
            size={size}
            {...props}
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
