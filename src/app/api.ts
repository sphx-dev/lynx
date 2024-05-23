import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
import camelcaseKeys from "camelcase-keys";
import config from "../config";

const BASE_API = config.VITE_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });
const baseQueryWithCamelize: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions = {}) => {
  const result = await baseQueryWithRetry(args, api, extraOptions);
  if (result.data) {
    result.data = camelcaseKeys(result.data as Record<string, any>, { deep: true });
  }
  return result;
};
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "splitApi",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithCamelize,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["account"],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});
