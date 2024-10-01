import { create } from "zustand";
import { Market } from "../../proto-codecs/codegen/sphx/order/market";
import { getAllMarkets } from "../utils/queryMarkets";
import { useEffect, useMemo } from "react";
import { mockFutures } from "../constants/mock";
import { useQuery } from "react-query";

export const useMarkets = () => {
  const { markets, selectedMarket, setMarkets, setMarketId } =
    useMarketsStore();

  const { data } = useQuery("markets", getAllMarkets, { staleTime: Infinity });
  useEffect(() => {
    setMarkets(data?.markets ?? []);
  }, [data, setMarkets]);

  // TODO: use real data
  const { symbol, icon } = useMemo(() => {
    const mock = mockFutures.find(m => {
      return m?.symbol?.startsWith(selectedMarket?.baseAsset ?? "");
    });
    return { symbol: mock?.symbol ?? "", icon: mock?.icon ?? "" };
  }, [selectedMarket]);

  return {
    markets,
    selectedMarket,
    selectedMarketId: selectedMarket?.id,
    symbol,
    icon,
    setMarkets,
    setMarketId,
  };
};

type MarketsStore = {
  markets: Market[];
  selectedMarketId: bigint;
  selectedMarket: Market | null;
  setMarkets: (markets: Market[]) => void;
  setMarketId: (id: bigint) => void;
};

const useMarketsStore = create<MarketsStore>((set, get) => ({
  markets: [],
  selectedMarketId: 0n,
  selectedMarket: null,
  setMarkets: (markets: Market[]) => {
    if (equal(get().markets, markets)) return;

    const selectedId =
      get().selectedMarketId === 0n ? markets[0]?.id : get().selectedMarketId;

    set({
      markets,
      selectedMarketId: selectedId,
      selectedMarket: markets.find(m => m.id === selectedId),
    });
  },
  setMarketId: id => {
    const selectedMarket = get().markets.find(market => market.id === id);
    if (selectedMarket) {
      set({ selectedMarketId: id, selectedMarket });
    }
  },
}));

const equal = (a: Market[], b: Market[]) => {
  if (a.length === 0 && b.length === 0) return true;
  if (a.length !== b.length) return false;
  return a.every(
    (m, i) =>
      m.id === b[i]?.id &&
      m.ticker === b[i]?.ticker &&
      m.status === b[i]?.status &&
      m.baseAsset === b[i]?.baseAsset &&
      m.quoteAsset === b[i]?.quoteAsset
  );
};
