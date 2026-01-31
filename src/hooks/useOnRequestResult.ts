import { useEffect, useRef } from "react";
import { toast } from "./useToast";

type ToastMessage = { title?: string; description?: string };

interface UseOnRequestResultParams {
  isSuccess: boolean;
  isError: boolean;
  successMessage?: ToastMessage;
  errorMessage?: ToastMessage;
  onSuccess?: () => void;
  onError?: () => void;
}

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

  useEffect(() => {
    successMessageRef.current = successMessage;
    errorMessageRef.current = errorMessage;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  /* Success listener */
  useEffect(() => {
    if (!isSuccess) return;

    const message = successMessageRef.current;
    if (message) {
      toast({
        title: "Успех",
        variant: "default",
        ...message,
      });
    }

    onSuccessRef.current?.();
  }, [isSuccess]);

  /* Error listener */
  useEffect(() => {
    if (!isError) return;

    const message = errorMessageRef.current;
    if (message) {
      toast({
        title: "Ошибка",
        variant: "destructive",
        ...message,
      });
    }

    onErrorRef.current?.();
  }, [isError]);
}
