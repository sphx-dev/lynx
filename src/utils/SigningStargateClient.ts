import {
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate";
import { getChain } from "../config";
import { Registry } from "@cosmjs/proto-signing";
import { registry as orderRegistry } from "../../proto-codecs/codegen/sphx/order/tx.registry";
import { registry as marginaccRegistry } from "../../proto-codecs/codegen/sphx/marginacc/tx.registry";

let orderClient: SigningStargateClient | undefined;

export async function getSigningStargateOrderClient(): Promise<SigningStargateClient> {
  if (!orderClient) {
    const registry = new Registry(orderRegistry);
    orderClient = await getSigningStargateClient(registry);
  }
  return orderClient;
}

let marginClient: SigningStargateClient | undefined;

export async function getSigningStargateMarginAccountClient(): Promise<SigningStargateClient> {
  if (!marginClient) {
    const registry = new Registry(marginaccRegistry);
    marginClient = await getSigningStargateClient(registry);
  }
  return marginClient;
}

async function getSigningStargateClient(registry: Registry) {
  if (window.getOfflineSigner) {
    const offlineSigner = window.getOfflineSigner(getChain().chainId);
    const signingClientOptions: SigningStargateClientOptions = {
      gasPrice: GasPrice.fromString("1uusdc"),
      registry: registry,
    };

    const signingClient: SigningStargateClient =
      await SigningStargateClient.connectWithSigner(
        getChain().rpc,
        offlineSigner,
        signingClientOptions
      );
    return signingClient;
  } else {
    throw Error('No method "getOfflineSigner" available');
  }
}

export const composeFee = (): StdFee => {
  const fee = {
    amount: [{ denom: "uusdc", amount: "100000" }],
    gas: "200000",
  };
  return fee;
};
