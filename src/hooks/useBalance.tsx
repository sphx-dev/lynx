import { getBalance } from "../utils/getBalance";
import { formatCoin } from "../utils/formatCoin";
import { useQueries, useQuery } from "react-query";

export const useBalance = (
  address: string | undefined | null,
  denom = "uusdc"
) => {
  const { data } = useQuery(
    ["balance", address, denom],
    async () => {
      return getBalance(address!, denom).then(response => {
        return {
          amount: parseInt(response.amount),
          formatedAmount: formatCoin(Number(response.amount) / 1e6 || 0),
          denom: response.denom,
        };
      });
    },
    {
      enabled: !!address,
      staleTime: 1000 * 60 * 15,
    }
  );

  return {
    ...data,
  };
};

export const useBalances = (queries: { address: string; denom: string }[]) => {
  const results = useQueries(
    queries.map(query => ({
      queryKey: ["balance", query.address, query.denom],
      queryFn: async () => {
        return getBalance(query.address, query.denom).then(response => {
          return {
            amount: parseInt(response.amount),
            formatedAmount: formatCoin(Number(response.amount) / 1e6 || 0),
            denom: response.denom,
          };
        });
      },
      enabled: !!query.address,
      staleTime: 1000 * 60 * 15,
    }))
  );

  return {
    ...results,
    balances: results.map(result => result.data),
  };
};
