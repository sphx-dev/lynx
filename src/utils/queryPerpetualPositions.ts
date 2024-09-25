import { createRPCQueryClient } from "../../proto-codecs/codegen/sphx/rpc.query";
import { getChain } from "../config";

export const getPerpetualPositionsByAddress = async (address: string) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request = { address: address };

  const response = await queryClient.sphx.order.perpPositionForAccount(request);

  return response;
};
