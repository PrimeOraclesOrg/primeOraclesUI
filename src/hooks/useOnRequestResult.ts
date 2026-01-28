import { useEffect, useRef } from "react";
import { toast } from "./useToast";

type ToastMessage = string | { title: string; description: string };

interface UseOnRequestResultParams {
  isSuccess: boolean;
  isError: boolean;
  successMessage?: ToastMessage;
  errorMessage?: ToastMessage;
  onSuccess?: () => void;
  onError?: () => void;
}

const sendToast = (message: ToastMessage, isErrorMessage: boolean = true) => {
  if (typeof message === "string") {
    toast({
      title: isErrorMessage ? "Ошибка" : "Успех",
      description: message,
      variant: isErrorMessage ? "destructive" : "default",
    });
    return;
  }

  toast({
    ...message,
    variant: isErrorMessage ? "destructive" : "default",
  });
};

export function useOnRequestResult({
  isSuccess,
  isError,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: UseOnRequestResultParams) {
  const successMessageRef = useRef(successMessage);
  const onSuccessRef = useRef(onSuccess);
  const errorMessageRef = useRef(errorMessage);
  const onErrorRef = useRef(onError);

  successMessageRef.current = successMessage;
  errorMessageRef.current = errorMessage;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;
  /* Success listener */
  useEffect(() => {
    if (!isSuccess) return;

    const message = successMessageRef.current;
    if (message) {
      sendToast(message, false);
    }

    onSuccessRef.current?.();
  }, [isSuccess]);
  /* Error listener */
  useEffect(() => {
    if (!isError) return;

    const message = errorMessageRef.current;
    if (message) {
      sendToast(message);
    }

    onErrorRef.current?.();
  }, [isError]);
}
