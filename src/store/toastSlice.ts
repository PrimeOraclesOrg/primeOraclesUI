import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

const TOAST_LIMIT = 1;

export interface ToasterToast {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  open?: boolean;
  variant?: "default" | "destructive";
  onOpenChange?: (open: boolean) => void;
}

interface ToastState {
  toasts: ToasterToast[];
}

const initialState: ToastState = {
  toasts: [],
};

let toastCount = 0;

export function generateToastId(): string {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToasterToast>) => {
      state.toasts = [action.payload, ...state.toasts].slice(0, TOAST_LIMIT);
    },
    updateToast: (state, action: PayloadAction<Partial<ToasterToast> & { id: string }>) => {
      const index = state.toasts.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.toasts[index] = { ...state.toasts[index], ...action.payload };
      }
    },
    dismissToast: (state, action: PayloadAction<string | undefined>) => {
      const toastId = action.payload;
      state.toasts = state.toasts.map((t) =>
        t.id === toastId || toastId === undefined ? { ...t, open: false } : t
      );
    },
    removeToast: (state, action: PayloadAction<string | undefined>) => {
      const toastId = action.payload;
      if (toastId === undefined) {
        state.toasts = [];
      } else {
        state.toasts = state.toasts.filter((t) => t.id !== toastId);
      }
    },
  },
});

export const { addToast, updateToast, dismissToast, removeToast } = toastSlice.actions;

export const selectToasts = (state: { toast: ToastState }) => state.toast.toasts;

export default toastSlice.reducer;
