import { getBalance } from "../utils/getBalance";
import { formatCoin } from "../utils/formatCoin";
import { createStore } from "zustand";
import { useEffect, useState } from "react";

export const useBalance = (
  address: string | undefined | null,
  denom = "uusdc"
) => {
  const store = balancesStore.getState();
  const [balance, setBalance] = useState<Balance | null>(null);

  useEffect(() => {
    (async () => {
      if (!address) return;

      const freshBalance = await store.getBalance(address, denom);
      setBalance(freshBalance);
    })();
  }, [address, denom, store, store.balances, setBalance]);

  return {
    amount: balance?.amount,
    formatedAmount: formatCoin(Number(balance?.amount) / 1e6 || 0),
    denom: balance?.denom,
    markBalanceAsStale: () => markBalanceAsStale(address || "", denom),
  };
};

export const useBalances = (balances: { address: string; denom: string }[]) => {
  const store = balancesStore.getState();
  const [balanceList, setBalanceList] = useState<(Balance | null)[]>([]);

  useEffect(() => {
    (async () => {
      if (!balances.length) return;
      let freshBalances = [];
      for (let i = 0; i < balances.length; i++) {
        freshBalances[i] = await store.getBalance(
          balances[i].address,
          balances[i].denom
        );
      }
      setBalanceList(freshBalances);
    })();
  }, [balances, store]);

  return {
    balances: balanceList,
  };
};

type Balance = {
  address: string;
  amount: number;
  denom: string;
  isStale: boolean;
};

export const markBalanceAsStale = (address: string, denom: string) => {
  const store = balancesStore.getState();
  store.markBalanceStale(address, denom);
};

type BalancesStore = {
  balances: Balance[];
  getBalance: (address: string, denom: string) => Promise<Balance | null>;
  setBalance: (balance: Balance) => void;
  markBalanceStale: (address: string, denom: string) => void;
};

const balancesStore = createStore<BalancesStore>((set, get) => ({
  balances: [] as Balance[],
  getBalance: async (address: string, denom: string) => {
    if (!address || !denom) return null;
    const balance = get().balances.find(
      (balance: Balance) =>
        balance.address === address && balance.denom === denom
    );
    if (!balance || balance.isStale) {
      const currentBalance = await getBalance(address, denom);

      get().setBalance({
        address,
        amount: parseInt(currentBalance.amount),
        denom,
        isStale: false,
      });
      return {
        address,
        amount: parseInt(currentBalance.amount),
        denom,
        isStale: false,
      } as Balance;
    } else {
      return { amount: balance.amount, denom: balance.denom } as Balance;
    }
  },
  setBalance: ({
    address,
    amount,
    denom,
  }: {
    address: string;
    amount: number;
    denom: string;
  }) => {
    set(state => {
      const balanceExists = state.balances.find(
        b => b.address === address && b.denom === denom
      );
      return {
        balances: balanceExists
          ? state.balances.map((b: Balance) =>
              b.address === address && b.denom === denom
                ? { ...b, address, amount, denom, isStale: false }
                : b
            )
          : [
              ...state.balances,
              {
                address,
                amount,
                denom,
                isStale: false,
              },
            ],
      };
    });
  },
  markBalanceStale: (address: string, denom: string) => {
    set(state => ({
      balances: state.balances.map((balance: Balance) =>
        balance.address === address && balance.denom === denom
          ? { ...balance, isStale: true }
          : balance
      ),
    }));
  },
}));
