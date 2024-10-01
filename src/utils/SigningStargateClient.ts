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

export const composeFee = (): StdFee => {
  const fee = {
    amount: [{ denom: DENOMUSDC, amount: "100000" }],
    gas: "200000",
  };
  return fee;
};
