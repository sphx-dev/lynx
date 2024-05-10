import { Response, SuccessResult, Error } from "../types/api";
export const handleApiCall = <T>(
  res: Response<T>,
  onError: (error: Error) => void,
  onSuccess?: (res: SuccessResult<T>) => void
) => {
  if ("error" in res) {
    onError(res as Error);
    return;
  }
  if (onSuccess && "data" in res) {
    onSuccess(res);
  }
};
