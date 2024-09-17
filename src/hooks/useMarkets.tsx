import { create } from "zustand";
import { Market } from "../../proto-codecs/codegen/sphx/order/market";
import { getAllMarkets } from "../utils/queryMarkets";
import { useEffect, useMemo } from "react";
import { mockFutures } from "../constants/mock";

export const useMarkets = () => {
  const { markets, selectedMarket, setMarkets, setMarketId } =
    useMarketsStore();
  useEffect(() => {
    if (markets.length > 0) return;

    getAllMarkets().then(response => {
      setMarkets(response.markets);
    });
  }, [markets, setMarkets]);

  // TODO: use real data
  const { symbol, icon } = useMemo(() => {
    const mock = mockFutures.find(m => {
      return m?.symbol?.startsWith(selectedMarket?.baseAsset || "");
    });
    return { symbol: mock?.symbol || "", icon: mock?.icon || "" };
  }, [selectedMarket]);

  return { markets, selectedMarket, symbol, icon, setMarkets, setMarketId };
};

type MarketsStore = {
  markets: Market[];
  selectMarketId: number;
  selectedMarket: Market | null;
  setMarkets: (markets: Market[]) => void;
  setMarketId: (id: number) => void;
};

const useMarketsStore = create<MarketsStore>((set, get) => ({
  markets: [],
  selectMarketId: 0,
  selectedMarket: null,
  setMarkets: (markets: Market[]) => {
    const selectedId =
      get().selectMarketId === 0 ? markets[0].id : get().selectMarketId;
    set({
      markets,
      selectMarketId: selectedId,
      selectedMarket: markets.find(m => m.id === selectedId),
    });
  },
  setMarketId: id => {
    const selectedMarket = get().markets.find(market => market.id === id);
    if (selectedMarket) {
      set({ selectMarketId: id, selectedMarket });
    }
  },
}));
