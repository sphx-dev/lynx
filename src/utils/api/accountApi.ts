import { api } from "../../app/api";
import { Account, Position } from "../../types/order";

const BASE_URL = "/accounts";

export interface AccountResponse {
  account: Account;
  positions: Position[];
}

export const accountApi = api.injectEndpoints({
  endpoints: build => ({
    getAccount: build.query<AccountResponse, void>({
      query: () => `${BASE_URL}/current/positions`,
      providesTags: ["account"],
      transformResponse: ({ account, positions }: AccountResponse) => ({
        account: {
          ...account,
          closedOrders: account.closedOrders || [],
          openOrders: account.openOrders || [],
        },
        positions: positions || [],
      }),
    }),
  }),
});

export const { useGetAccountQuery } = accountApi;
