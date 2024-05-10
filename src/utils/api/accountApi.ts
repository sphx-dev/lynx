import { api } from "../../app/api";
import { Account } from "../../types/order";

const BASE_URL = "/accounts";

export interface AccountResponse {
  account: Account;
}

export const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query<AccountResponse, void>({
      query: () => `${BASE_URL}/current`,
      providesTags: ["account"],
      transformResponse: ({ account }: AccountResponse) => ({
        account: {
          ...account,
          closedOrders: account.closedOrders || [],
          openOrders: account.openOrders || [],
        },
      }),
    }),
  }),
});

export const { useGetAccountQuery } = accountApi;
