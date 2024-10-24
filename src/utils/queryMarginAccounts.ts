import { StargateClient } from "@cosmjs/stargate";
import { getChain } from "../config";
import { createRPCQueryClient } from "../../proto-codecs/codegen/sphx/rpc.query";
import { sphx } from "../../proto-codecs";
import {
  composeFee,
  getSigningStargateMarginAccountClient,
} from "./SigningStargateClient";

let client: StargateClient | null = null;

export const getStargateClient = async (): Promise<StargateClient> => {
  if (!client) {
    client = await StargateClient.connect(getChain().rpc);
  }
  return client;
};

export const getMarginAccountInfoByAddress = async (address: string) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request = { address: address };

  const response = await queryClient.sphx.marginacc.marginAccountInfo(request);

  return response;
};

export const createMarginAccount = async ({
  address,
  number = 0,
  memo = "",
}: {
  address: string;
  number: number;
  memo: string;
}) => {
  const message =
    sphx.marginacc.MessageComposer.withTypeUrl.createMarginAccount({
      owner: address,
      number: number,
    });

  const signingClient = await getSigningStargateMarginAccountClient();
  const txResponse = await signingClient.signAndBroadcast(
    address,
    [message],
    composeFee(),
    memo
  );

  return txResponse;
};

export const getAccountsByOwner = async (address: string) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request = { owner: address };

  const response = await queryClient.sphx.marginacc.marginAccountsByOwner(
    request
  );

  return response;
};

export const getMarketInfo = async (id: bigint) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const response = await queryClient.sphx.order.market({ id: id });
  console.log(response);

  return response;
};

// Unused TODO: removed if not needed in UI
export const getExecutionAuthority = async (id: number) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const executionAuthorityResponse =
    await queryClient.sphx.order.executionAuthority({});
  console.log(executionAuthorityResponse);

  return executionAuthorityResponse;
};
