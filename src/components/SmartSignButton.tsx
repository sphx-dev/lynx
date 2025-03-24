import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useCallback } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
// import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { GenericAuthorization } from "cosmjs-types/cosmos/authz/v1beta1/authz";
import { sphx } from "proto-codecs/codegen";
import { DENOMUSDC } from "@/constants";
import { getDefaultSigningStargateClient } from "@/utils/SigningStargateClient";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import config from "@/config";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const StyledStatus = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: var(--text-primary);
  color: var(--background-primary);
  padding: 2px 4px;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: default;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(5, 150, 105, 0.2);
    color: #6ee7b7;
  }
`;

export const useSmartSign = () => {
  const [isSmartSign, setIsSmartSign] = useLocalStorage("isSmartSign", false);
  const [smartSingExpiration, setSmartSignExpiration] = useLocalStorage(
    "smartSignExpiration",
    0
  );

  const { isAvailable, isLoading, error } = useSmartSignAvailable();

  return {
    smartSign: isSmartSign && smartSingExpiration > Date.now() && isAvailable,
    isSmartSign,
    setIsSmartSign,
    smartSingExpiration,
    setSmartSignExpiration,
    isLoading,
    error,
  };
};

export const useSmartSignAvailable = () => {
  let response = useQuery({
    queryKey: ["smartSignHealth"],
    queryFn: async () => {
      const response = await fetch(
        `${config.VITE_SMART_API_PROTOCOL}://${config.VITE_SMART_API_HOST}:${config.VITE_SMART_API_PORT}/healthcheck`
      );
      if (!response.ok) throw new Error("Health check failed");
      const data = await response.json();
      console.log("data", data);
      return data.status === "ok";
    },
    retry: 2,
    refetchInterval: 1000 * 60 * 10,
    staleTime: 60 * 1000,
    select: data => data,
  });

  return {
    isAvailable: response.data ?? false,
    isLoading: response.isLoading,
    error: response.error,
  };
};

export const SmartSignButton = ({
  as = ButtonWrapper,
}: {
  as?: React.ElementType;
}) => {
  const Component = as;
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const {
    isSmartSign,
    setIsSmartSign,
    smartSingExpiration,
    setSmartSignExpiration,
  } = useSmartSign();
  const { isAvailable, isLoading, error } = useSmartSignAvailable();

  const acceptSmartSign = useCallback(
    async (expirationDateInMs: number) => {
      setIsSmartSign(true);
      setSmartSignExpiration(expirationDateInMs);
    },
    [setIsSmartSign, setSmartSignExpiration]
  );

  if (!address || !address?.length || isLoading || error || !isAvailable) {
    return null;
  }

  if (isSmartSign && smartSingExpiration > Date.now()) {
    return <StyledStatus>{t("smartSignActive")}</StyledStatus>;
  }

  return (
    <Component
      onClick={async () => {
        const client = await getDefaultSigningStargateClient();
        const expirationDateInMs = Date.now() + 1000 * 60 * 60 * 24 * 365 * 100; // 100 years
        const response = await grantGenericAuthorization(
          client,
          address,
          config.EXECUTION_AUTHORITY,
          expirationDateInMs
        );
        console.log("response", response);
        if (response.code === 0) {
          acceptSmartSign(expirationDateInMs);
        } else {
          alert("Error activating Smart Sign");
        }
      }}
    >
      {t("activatesmartsign")}
    </Component>
  );
};

const ButtonWrapper = ({
  children,
  ...params
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <Button size="xs" {...params}>
      {children}
    </Button>
  );
};

async function grantGenericAuthorization(
  client: SigningStargateClient,
  granter: string,
  grantee: string,
  expirationDateInMs: number
) {
  const expiration = {
    seconds: BigInt(expirationDateInMs) / BigInt(1000),
    nanos: 0,
  };

  const msgPlaceOrder = composeMsgGrant(
    granter,
    grantee,
    sphx.order.MsgPlaceOrder.typeUrl,
    expiration
  );

  const msgCancelOrder = composeMsgGrant(
    granter,
    grantee,
    sphx.order.MsgCancelOrder.typeUrl,
    expiration
  );

  const fee = {
    amount: [{ denom: DENOMUSDC, amount: "5000" }],
    gas: "200000",
  };

  console.log("Signing and broadcasting grant message - INIT");
  let response = await client.signAndBroadcast(
    granter,
    [msgPlaceOrder, msgCancelOrder],
    fee,
    "Authorization for SmartSigning"
  );
  console.log("response ----->", response);
  console.log("Signing and broadcasting grant message - END");
  //   await sleep(2000);
  return response;
}
function composeMsgGrant(
  granter: string,
  grantee: string,
  msgTypeUrl: string,
  expiration: { seconds: bigint; nanos: number }
) {
  const authorization = {
    typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
    value: GenericAuthorization.encode(
      GenericAuthorization.fromPartial({
        msg: msgTypeUrl,
      })
    ).finish(),
  };

  return {
    typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
    value: {
      granter,
      grantee,
      grant: {
        authorization,
        expiration,
      },
    },
  };
}
