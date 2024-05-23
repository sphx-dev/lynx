import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { AsyncThunkAction, SerializedError } from "@reduxjs/toolkit";

export interface Error {
  error: FetchBaseQueryError;
}

export type Response<T> =
  | { data: T }
  | { error: FetchBaseQueryError | SerializedError }
  | AsyncThunkAction<any, any, any>;

export interface SuccessResult<T> {
  data: T;
}
