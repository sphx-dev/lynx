import config from "@/config";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useMarkets } from "@/hooks/useMarkets";
import axios from "axios";
import { useQuery } from "react-query";

const BASE_API = config.VITE_API_URL;

export const useFundingRate = (from: number, to: number) => {
  console.log("[useFundingRate]", from, to);
  const { address, isConnected } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);
  const { selectedMarket } = useMarkets();
  const ticker = selectedMarket?.ticker;

  const { data } = useQuery({
    queryKey: ["funding", address, ticker, from, to],
    queryFn: async () => {
      console.log("[useFundingRate] Fetching funding data");

      const data = await fetchFundingRateLogs(
        selectedAddress!,
        ticker!,
        from,
        to
      );
      console.log(data);
      return data;
    },
    enabled: isConnected && !!address && !!ticker,
    staleTime: 1000 * 60 * 5,
  });

  return data;
};

export async function fetchFundingRateLogs(
  account_id: string,
  symbol: string,
  from: number,
  to: number
) {
  const URL = `${BASE_API}/other/funding_rate_logs?account_id=${account_id}&symbol=${symbol}&from=${from}&to=${to}`;

  try {
    axios.defaults.withCredentials = true;

    const response = await axios.get(URL, {
      withCredentials: true,
      headers: {
        "X-ACCOUNT-ID": account_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
