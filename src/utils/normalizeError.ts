import { AuthError, FunctionsFetchError, PostgrestError } from "@supabase/supabase-js";
import { ServiceResult } from "@/types";

export const normalizeError = (error: AuthError | PostgrestError): ServiceResult<null> => {
  if (error instanceof AuthError) {
    return {
      data: null,
      error: {
        code: error.code ?? "unexpected_error",
        message: error.message ?? "Unexpected error",
      },
    };
  }

  return {
    data: null,
    error: {
      code: error.hint ?? error.code ?? "unexpected_error",
      message: error.details ?? "Unexpected error",
    },
  };
};

export const normalizeAsyncError = async (
  error: FunctionsFetchError | AuthError | PostgrestError
): Promise<ServiceResult<null>> => {
  if (error instanceof FunctionsFetchError) {
    return {
      data: null,
      error: {
        code: (await error.context?.json())?.error ?? "unexpected_error",
        message: error.message ?? "Unexpected error",
      },
    };
  }

  return normalizeError(error);
};
