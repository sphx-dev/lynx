import {
  createProtobufRpcClient,
  QueryClient,
  StargateClient,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { getChain } from "../../config";

export const getStargateClient = async (): Promise<StargateClient> => {
  const client: StargateClient = await StargateClient.connect(getChain().rpc);
  return client;
};

const getTendermintClient = async (): Promise<Tendermint34Client> => {
  const client: Tendermint34Client = await Tendermint34Client.connect(
    getChain().rpc
  );
  return client;
};

export const query = async () => {
  const tendermintClient = await getTendermintClient();

  const queryClient = new QueryClient(tendermintClient);

  const rpcClient = createProtobufRpcClient(queryClient);

  //TODO: finish implementation for query
  //const queryService = ;
  console.log("queryService", rpcClient);
};
