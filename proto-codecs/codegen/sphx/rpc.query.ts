//@ts-nocheck
import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    sphx: {
      marginacc: (await import("./marginacc/query.rpc.Query")).createRpcQueryExtension(client),
      order: (await import("./order/query.rpc.Query")).createRpcQueryExtension(client)
    }
  };
};