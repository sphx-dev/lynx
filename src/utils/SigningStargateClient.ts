import {
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate";
import { getChain } from "../config";
import { EncodeObject, Registry } from "@cosmjs/proto-signing";
import { registry as orderRegistry } from "../../proto-codecs/codegen/sphx/order/tx.registry";
import { registry as marginaccRegistry } from "../../proto-codecs/codegen/sphx/marginacc/tx.registry";
import { getOfflineSigner } from "./getOfflineSigner";
import { DENOMUSDC } from "@/constants";

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

/**
 * Generates a Stargate Signing Client without registry
 */
export async function getDefaultSigningStargateClient() {
  const offlineSigner = await getOfflineSigner();
  const signingClientOptions: SigningStargateClientOptions = {
    gasPrice: GasPrice.fromString("1" + DENOMUSDC),
  };

  const signingClient: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(
      getChain().rpc,
      offlineSigner,
      signingClientOptions
    );
  return signingClient;
}

async function getSigningStargateClient(registry: Registry) {
  const offlineSigner = await getOfflineSigner();
  const signingClientOptions: SigningStargateClientOptions = {
    gasPrice: GasPrice.fromString("1" + DENOMUSDC),
    registry: registry,
  };

  const signingClient: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(
      getChain().rpc,
      offlineSigner,
      signingClientOptions
    );
  return signingClient;
}

export const composeFee = async (
  client: SigningStargateClient,
  signingAddress: string,
  messages: EncodeObject[],
  memo?: string
): Promise<StdFee> => {
  const gasEstimation =
    1 * (await client.simulate(signingAddress, messages, memo));

  const gasString = Math.max(2 * gasEstimation, 200000).toFixed(0);

  console.log("Gas estimation:", gasEstimation, gasString);
  const fee = {
    amount: [{ denom: DENOMUSDC, amount: "100000" }],
    gas: gasString,
  };
  return fee;
};
