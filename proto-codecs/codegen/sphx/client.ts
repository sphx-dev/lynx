//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as sphxMarginaccTxRegistry from "./marginacc/tx.registry";
import * as sphxOrderTxRegistry from "./order/tx.registry";
import * as sphxMarginaccTxAmino from "./marginacc/tx.amino";
import * as sphxOrderTxAmino from "./order/tx.amino";
export const sphxAminoConverters = {
  ...sphxMarginaccTxAmino.AminoConverter,
  ...sphxOrderTxAmino.AminoConverter
};
export const sphxProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...sphxMarginaccTxRegistry.registry, ...sphxOrderTxRegistry.registry];
export const getSigningSphxClientOptions = ({
  defaultTypes = defaultRegistryTypes
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...sphxProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...sphxAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningSphxClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningSphxClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: registry as any,
    aminoTypes
  });
  return client;
};