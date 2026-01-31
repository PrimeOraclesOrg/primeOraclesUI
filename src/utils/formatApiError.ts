import { ApiError } from "@/types";

export function formatApiError(error?: ApiError): ApiError | null {
  if (!error) return null;

  return {
    code: error.code,
    message: error.message,
  };
}
