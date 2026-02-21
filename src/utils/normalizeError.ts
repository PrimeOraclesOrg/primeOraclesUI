import {
  AuthError,
  FunctionsFetchError,
  FunctionsHttpError,
  PostgrestError,
} from "@supabase/supabase-js";
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
  error: FunctionsFetchError | FunctionsHttpError | AuthError | PostgrestError
): Promise<ServiceResult<null>> => {
  if (error instanceof FunctionsFetchError || error instanceof FunctionsHttpError) {
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
