import {
  createMarginAccount,
  getAccountsByOwner,
} from "../utils/queryPositions";
import { errorAlert, successAlert } from "../utils/alerts";
import { MarginAccountInfo } from "../../proto-codecs/codegen/sphx/marginacc/margin_account";
import { create } from "zustand";
import { useEffect } from "react";

const STATUS = {
  READY: "READY",
  LOADING: "LOADING",
  ERROR: "ERROR",
  CREATING: "CREATING",
};

type MarginAccountState = {
  owner: string | null | undefined;
  marginAccounts: MarginAccountInfo[];
  selectedIndex: number;
  status: string;

  setOwner: (owner: string | null | undefined) => void;
  setSelectedIndex: (selectedIndex: number) => void;
  setStatus: (status: string) => void;

  getSelectedAccount: () => MarginAccountInfo | undefined;
  getSelectedAddress: () => string | undefined;
  getSelectedIndex: () => number;

  getAccounts: () => void;
  createAccount: () => void;
};

export const useMarginAccount = (owner: string | null | undefined) => {
  const store = useMarginAccountStore();
  const { setOwner } = store;

  useEffect(() => {
    setOwner(owner);
  }, [owner, setOwner]);

  return {
    ...store,
    isReady: store.status === STATUS.READY,
    isLoading: store.status === STATUS.LOADING,
    isError: store.status === STATUS.ERROR,
    isCreating: store.status === STATUS.CREATING,
    selectedAccount: store.getSelectedAccount(),
    selectedAddress: store.getSelectedAddress(),
    selectedIndex: store.getSelectedIndex(),
  };
};

export const useMarginAccountStore = create<MarginAccountState>((set, get) => ({
  owner: null,
  marginAccounts: [],
  selectedIndex: 0,
  status: STATUS.READY,

  // Setters
  setOwner: (owner: string | null | undefined) => {
    const currentOwner = get().owner;
    set({ owner });
    if (!owner) {
      set({
        owner: null,
        status: STATUS.READY,
        marginAccounts: [],
        selectedIndex: 0,
      });
    }
    if (owner && owner !== currentOwner) {
      get().getAccounts();
    }
  },
  setSelectedIndex: (selectedIndex: number) => {
    set({
      selectedIndex,
    });
  },
  setStatus: (status: string) => {
    set({ status });
  },

  // Getters
  getSelectedAccount: () => {
    return get().marginAccounts[get().selectedIndex];
  },
  getSelectedAddress: () => {
    return get().marginAccounts[get().selectedIndex]?.address;
  },
  getSelectedIndex: () => {
    return get().selectedIndex;
  },

  // Actions
  getAccounts: async () => {
    const owner = get().owner;
    if (!owner) {
      return;
    }

    set({ status: STATUS.LOADING });
    try {
      const response = await getAccountsByOwner(owner);
      set({
        marginAccounts: response.marginAccounts,
        status: STATUS.READY,
      });
    } catch {
      set({
        marginAccounts: [],
        status: STATUS.ERROR,
      });
    }
  },
  createAccount: async () => {
    const owner = get().owner;
    if (!owner) {
      return;
    }
    try {
      set({ status: STATUS.CREATING });
      const ids = get().marginAccounts.map(ma => ma?.id?.number || 0);
      const nextMarginAccountNumber = Math.max(...ids, 0) + 1;
      const response = await createMarginAccount(
        owner,
        nextMarginAccountNumber
      );

      if (response.code === 0) {
        successAlert("Margin account created successfully");
        set({ status: STATUS.READY });
      } else {
        errorAlert(getTextByCode(response.code));
        set({ status: STATUS.ERROR });
      }
    } catch (error) {
      console.log(error);
      errorAlert(getTextFromError((error as Error).message));
    } finally {
      get().getAccounts();
    }
  },
}));

//TODO: move this to translations
const getTextByCode = (code: number) => {
  switch (code) {
    case 9:
      return "Margin account already exists";
    default:
      return "Error creating margin account. Please try again";
  }
};

const getTextFromError = (message: string) => {
  if (
    message.includes("Send some tokens there before trying to query sequence")
  ) {
    return "Seems like you’re using new wallet. You must have at least 0.01 USDC for transaction fee";
  }

  return "Something went wrong. Please try again";
};
