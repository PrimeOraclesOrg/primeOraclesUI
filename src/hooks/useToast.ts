import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToast,
  updateToast,
  dismissToast,
  removeToast,
  selectToasts,
  generateToastId,
  type ToasterToast,
} from "@/store/toastSlice";

const TOAST_REMOVE_DELAY = 1000000;

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

type ToastInput = Omit<ToasterToast, "id">;

export function useToast() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  const scheduleRemoval = useCallback(
    (toastId: string) => {
      if (toastTimeouts.has(toastId)) return;

      const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch(removeToast(toastId));
      }, TOAST_REMOVE_DELAY);

      toastTimeouts.set(toastId, timeout);
    },
    [dispatch]
  );

  const dismiss = useCallback(
    (toastId?: string) => {
      dispatch(dismissToast(toastId));
      if (toastId) {
        scheduleRemoval(toastId);
      } else {
        toasts.forEach((t) => scheduleRemoval(t.id));
      }
    },
    [dispatch, scheduleRemoval, toasts]
  );

  const toast = useCallback(
    (props: ToastInput) => {
      const id = generateToastId();

      const update = (updateProps: Partial<ToasterToast>) =>
        dispatch(updateToast({ ...updateProps, id }));

      const dismissThis = () => dismiss(id);

      dispatch(
        addToast({
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismissThis();
          },
        })
      );

      return { id, dismiss: dismissThis, update };
    },
    [dispatch, dismiss]
  );

  return {
    toasts,
    toast,
    dismiss,
  };
}

// Standalone toast function for use outside React components
let storeDispatch: typeof import("@/store/store").store.dispatch | null = null;

export function setToastDispatch(dispatch: typeof storeDispatch) {
  storeDispatch = dispatch;
}

export function toast(props: ToastInput) {
  if (!storeDispatch) {
    console.warn("Toast dispatch not initialized. Use useToast hook instead.");
    return { id: "", dismiss: () => {}, update: () => {} };
  }

  const id = generateToastId();

  const dismiss = () => {
    storeDispatch!(dismissToast(id));
    setTimeout(() => {
      storeDispatch!(removeToast(id));
    }, TOAST_REMOVE_DELAY);
  };

  const update = (updateProps: Partial<ToasterToast>) =>
    storeDispatch!(updateToast({ ...updateProps, id }));

  storeDispatch(
    addToast({
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    })
  );

  return { id, dismiss, update };
}

export type { ToasterToast };
