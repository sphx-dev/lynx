import { useAccount, useConnect, useDisconnect, WalletType } from "graz";

// export const useChainCosmoshub = () => useChain("cosmoshub");
export const useChainCosmoshub = () => {
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return {
    connect: () =>
      connect({ chainId: "cosmoshub-4", walletType: WalletType.KEPLR }),
    disconnect,
    status,
    account,
    isConnected,
  };
};
