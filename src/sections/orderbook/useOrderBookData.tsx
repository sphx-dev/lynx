import config from "@/config";
import { useQuery } from "react-query";

const BASE_API = config.VITE_API_URL;

export const useOrderBookData = ({
  ticker,
}: {
  ticker: string | undefined;
}) => {
  const response = useQuery({
    queryKey: ["orderBook", ticker],
    queryFn: async () => {
      const res = await fetch(`${BASE_API}/orderbook/?ticker=${ticker}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    refetchInterval: 2000,

    enabled: !!ticker,
  });

  return response;
};
