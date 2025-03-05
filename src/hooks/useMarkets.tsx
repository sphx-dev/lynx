import { create } from "zustand";
import { Market } from "../../proto-codecs/codegen/sphx/order/market";
import { getAllMarkets } from "../utils/queryMarkets";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { marketPriority, marketsIcons } from "@/constants/marketsIcons";

export const useMarkets = () => {
  const { markets, selectedMarket, setMarkets, setMarketId } =
    useMarketsStore();

  const { data } = useQuery("markets", getAllMarkets, { staleTime: Infinity });
  useEffect(() => {
    let m: Market[] = [];
    if (data?.markets) {
      m = data.markets.toSorted((a, b) => {
        return (
          (marketPriority[b?.ticker] ?? 0) - (marketPriority[a?.ticker] ?? 0)
        );
      });
    }
    setMarkets(m);
  }, [data, setMarkets]);

  const { icon } = useMemo(() => {
    if (selectedMarket?.ticker)
      if (selectedMarket?.ticker in marketsIcons) {
        return marketsIcons[selectedMarket?.ticker];
      }
    return marketsIcons["default"];
  }, [selectedMarket]);

  window.marketId = selectedMarket?.id || 0n;

  let selectedMarketMeta: any = {};
  if (selectedMarket?.ticker) {
    selectedMarketMeta = MARKETS_META[selectedMarket?.ticker] || {};
  }

  return {
    markets,
    selectedMarket,
    selectedMarketId: selectedMarket?.id,
    symbol: selectedMarket?.ticker,
    icon,
    setMarkets,
    setMarketId,
    minimumVolume: selectedMarketMeta?.minimumVolume || 0,
    pricePerContract: selectedMarketMeta?.pricePerContract || 1,
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
  selectedMarketId: getLocalStorageSelectedMarket(),
  selectedMarket: null,
  setMarkets: (markets: Market[]) => {
    if (equal(get().markets, markets)) return;

    const isSelectedMarketInMarkets = markets.some(
      m => m.id === get().selectedMarketId
    );
    const selectedId = isSelectedMarketInMarkets
      ? get().selectedMarketId
      : markets[0]?.id || 0n;

    setLocalStorageSelectedMarket(selectedId);
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
      setLocalStorageSelectedMarket(id);
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

const MARKETS_META: Record<string, any> = {
  "BTCUSDC.P": {
    minimumVolume: 0,
    pricePerContract: 1,
  },
  "ETHUSDC.P": {
    minimumVolume: 0,
    pricePerContract: 1,
  },
  "WTXUSDC.P": {
    minimumVolume: 0.1,
    pricePerContract: 10,
  },
};

function getLocalStorageSelectedMarket() {
  let strMarket = localStorage.getItem("selectedMarket") ?? 0;
  try {
    return BigInt(strMarket);
  } catch (e) {
    return BigInt(0);
  }
}

function setLocalStorageSelectedMarket(id: bigint) {
  localStorage.setItem("selectedMarket", id.toString());
}
