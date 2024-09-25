import { QueryPerpPositionForAccountRequest } from "proto-codecs/codegen/sphx/order/query";
import { createRPCQueryClient } from "../../proto-codecs/codegen/sphx/rpc.query";
import { getChain } from "../config";

export const PAGE_SIZE = 10n;
export const getPerpetualPositionsByAddress = async (
  address: string,
  pagination: { offset: bigint; limit: bigint }
) => {
  const queryClient = await createRPCQueryClient({
    rpcEndpoint: getChain().rpc,
  });

  const request: QueryPerpPositionForAccountRequest = {
    address: address,
    pagination: {
      key: Uint8Array.from([]),
      offset: pagination?.offset || 0n,
      limit: pagination.limit || PAGE_SIZE,
      countTotal: true,
      reverse: false,
    },
  };

  const response = await queryClient.sphx.order.perpPositionForAccount(request);

  return response;
};
