import { StargateClient } from "@cosmjs/stargate";
import { getChain } from "../config";

export const getBalance = async (address: string, denom: string) => {
  const client = await StargateClient.connect(getChain().rpc);
  const balances = await client.getBalance(address, denom);

  return balances;
};

export const getBalances = async (address: string) => {
  const client = await StargateClient.connect(getChain().rpc);
  const balances = await client.getAllBalances(address);

  return balances;
};
