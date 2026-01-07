import { closeAuthModal, openAuthModal, selectAuthModal, useAppDispatch, useAppSelector } from "@/store";
import { useCallback } from "react";

export const useAuthModal = () => {
  const dispatch = useAppDispatch();
  const authModalState = useAppSelector(selectAuthModal);

  const open = useCallback(() => {
    dispatch(openAuthModal());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(closeAuthModal());
  }, [dispatch]);

  return {
    ...authModalState,
    open,
    close,
  };
};
