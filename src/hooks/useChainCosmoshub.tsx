import {
  useAccount,
  useConnect,
  useDisconnect,
  // useStargateClient,
  WalletType,
} from "graz";
import { Keplr } from "@keplr-wallet/types";
import { getChain } from "../config";

// export const useChainCosmoshub = () => useChain("cosmoshub");
export const useChainCosmoshub = () => {
  const { connectAsync, status: connectionStatus, error } = useConnect();
  const {
    data: account,
    isConnected,
    status: accountStatus,
    reconnect,
  } = useAccount();
  const { disconnect } = useDisconnect();

  // TODO: use client to get sequence if needed for order creation
  // const { data: client } = useStargateClient();

  // (async () => {
  //   console.log("ACCOUNT", account);
  //   console.log("CLIENT", client);
  //   console.log("CLIENT seq", client?.getSequence);
  //   console.log(
  //     "CLIENT seq addr",
  //     await client?.getSequence(account?.bech32Address)
  //   );
  // })();

  if (error) {
    console.log("useConnect error", error);
  }

  return {
    addChain: async () => {
      try {
        const keplr: Keplr = window.keplr;
        await keplr.experimentalSuggestChain(getChain());
      } catch (e) {
        console.log("addChain ERR -------->", e);
      }
    },
    connect: async () => {
      try {
        await connectAsync({
          chainId: getChain().chainId,
          walletType: WalletType.KEPLR,
        });
      } catch (e) {
        console.log("-------->", e);
      }
    },
    reconnect,
    disconnect,
    connectionStatus,
    accountStatus,
    account,
    address: account?.bech32Address,
    isConnected,
  };
};
