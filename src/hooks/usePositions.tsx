import { useQuery } from "react-query";
import { useChainCosmoshub } from "./useChainCosmoshub";
import {
  getPerpetualPositionsByAddress,
  PAGE_SIZE,
} from "@/utils/queryPerpetualPositions";
import { useMarginAccount } from "./useMarginAccounts";
import config from "@/config";

export const usePositions = (page: number = 0) => {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const result = useQuery(
    ["positions", address, selectedAddress, page],
    async () => {
      const response = await getPerpetualPositionsByAddress(selectedAddress!, {
        offset: BigInt(page) * PAGE_SIZE,
        limit: PAGE_SIZE,
      });
      return response;
    },
    {
      enabled: !!selectedAddress && !!address,
      staleTime: 1.5 * 60 * 1000,
    }
  );

  return result;
};

//
const queryPositionsByAccount = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, accountId] = queryKey;
  const response = await fetch(
    config.VITE_API_URL + `/positions/composed?account_id=${accountId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useQueryPositionsByAccount = (accountId: string | undefined) => {
  return useQuery(
    ["query-positions-composed", accountId],
    queryPositionsByAccount,
    {
      enabled: !!accountId,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 5000,
    }
  );
};
