import {
  createMarginAccount,
  getAccountsByOwner,
} from "../utils/queryMarginAccounts";
import { MarginAccountInfo } from "proto-codecs/codegen/sphx/marginacc/margin_account";
import { create } from "zustand";
import { useCallback, useEffect } from "react";
import { errorAlert, successAlert } from "@/utils/alerts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

type MarginAccountState = {
  marginAccounts: MarginAccountInfo[];
  selectedIndex: number;

  setMarginAccounts: (marginAccounts: MarginAccountInfo[]) => void;
  setSelectedIndex: (selectedIndex: number) => void;

  getSelectedAccount: () => MarginAccountInfo | undefined;
  getSelectedAddress: () => string | undefined;
  getSelectedIndex: () => number;
};

export const useMarginAccount = (owner: string | null | undefined) => {
  const { t } = useTranslation();
  const store = useMarginAccountStore();
  const { setMarginAccounts } = store;

  const queryClient = useQueryClient();

  // Fetch margin accounts
  const { data, isLoading, isError, isIdle, isSuccess, status } = useQuery(
    ["marginAccounts", owner],
    () => {
      return getAccountsByOwner(owner!).then(response => {
        return response.marginAccounts;
      });
    },
    {
      enabled: !!owner,
      staleTime: 1000 * 60 * 60,
    }
  );
  useEffect(() => {
    if (data) {
      setMarginAccounts(data);
    }
  }, [data, setMarginAccounts]);

  // Mutation for creating margin account
  const mutation = useMutation(createMarginAccount);
  const createAccount = useCallback(() => {
    const ids = store.marginAccounts.map(ma => ma?.id?.number ?? 0);
    const nextMarginAccountNumber = Math.max(...ids, 0) + 1;
    return mutation.mutateAsync(
      {
        address: owner!,
        number: nextMarginAccountNumber,
        memo: t("createMarginAccount"),
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["marginAccounts", owner]);
        },
        onSuccess: response => {
          if (response.code === 0) {
            successAlert("Margin account created successfully");
          } else {
            errorAlert(getTextByCode(response.code));
          }
        },
        onError: error => {
          errorAlert(getTextFromError((error as Error).message));
        },
      }
    );
  }, [t, owner, mutation, store.marginAccounts, queryClient]);

  return {
    ...store,
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    selectedAccount: store.getSelectedAccount(),
    selectedAddress: store.getSelectedAddress(),
    selectedIndex: store.getSelectedIndex(),
    createAccount,
  };
};

export const useMarginAccountStore = create<MarginAccountState>((set, get) => ({
  marginAccounts: [],
  selectedIndex: 0,

  // Setters
  setMarginAccounts: (marginAccounts: MarginAccountInfo[]) => {
    set({
      marginAccounts,
    });
  },
  setSelectedIndex: (selectedIndex: number) => {
    set({
      selectedIndex,
    });
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
