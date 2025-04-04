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

  console.log("signArbitrary((((((((", getChain().chainId, signer, data);
  return signArbitrary(getChain().chainId, signer, data);
}

export async function verifyArbitrary(
  signer: string,
  data: string | Uint8Array,
  signature: StdSignature
): Promise<StdSignature> {
  let verifyArbitrary;
  if (window?.keplr?.verifyArbitrary) {
    // https://docs.keplr.app/api/guide/sign-arbitrary
    verifyArbitrary = window.keplr.verifyArbitrary;
  } else if (window?.leap?.verifyArbitrary) {
    // https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference#request-signature-for-arbitrary-message
    verifyArbitrary = window.leap.verifyArbitrary;
  } else {
    throw Error('No method "verifyArbitrary" available');
  }

  console.log(
    "verifyArbitrary((((((((",
    getChain().chainId,
    signer,
    data,
    signature
  );
  // chainId: string,
  // signer: string,
  // data: string | Uint8Array,
  // signature: StdSignature
  return verifyArbitrary(getChain().chainId, signer, data, signature);
}
