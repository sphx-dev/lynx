import { getChain } from "@/config";

export async function getOfflineSigner() {
  let offlineSigner;
  if (window?.getOfflineSigner) {
    // Keplr extension injects the offline signer
    offlineSigner = window.getOfflineSigner(getChain().chainId);
  } else if (window?.leap?.getOfflineSigner) {
    // Leap Wallet injects the offline signer
    offlineSigner = window?.leap?.getOfflineSigner(getChain().chainId);
  } else {
    throw Error('No method "getOfflineSigner" available');
  }
  return offlineSigner;
}
