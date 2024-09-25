import { useQuery } from "react-query";
import { useChainCosmoshub } from "./useChainCosmoshub";
import {
  getPerpetualPositionsByAddress,
  PAGE_SIZE,
} from "@/utils/queryPerpetualPositions";
import { useMarginAccount } from "./useMarginAccounts";

export const usePositions = (page: number = 0) => {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const result = useQuery(
    ["positions", address],
    async () => {
      const response = await getPerpetualPositionsByAddress(selectedAddress!, {
        offset: BigInt(page) * PAGE_SIZE,
        limit: PAGE_SIZE,
      });
      return response;
    },
    {
      enabled: !!selectedAddress && !!address,
      // TODO: set a longer stale time and invalidate query from WebSocket
      staleTime: 0, //60 * 60 * 1000,
    }
  );

  return result;
};
