import { getChain } from "@/config";
import { StdSignature } from "@keplr-wallet/types";

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

export async function signArbitrary(
  signer: string,
  data: string | Uint8Array
): Promise<StdSignature> {
  let signArbitrary;
  if (window?.keplr?.signArbitrary) {
    // https://docs.keplr.app/api/guide/sign-arbitrary
    signArbitrary = window.keplr.signArbitrary;
  } else if (window?.leap?.signArbitrary) {
    // https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference#request-signature-for-arbitrary-message
    signArbitrary = window.leap.signArbitrary;
  } else {
    throw Error('No method "signArbitrary" available');
  }

  return signArbitrary(getChain().chainId, signer, data);
}
