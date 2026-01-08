import {
  AuthView,
  closeAuthModal,
  openAuthModal,
  selectAuthModal,
  setAuthModalView,
  useAppDispatch,
  useAppSelector,
} from "@/store";
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

  const setView = useCallback(
    (view: AuthView) => {
      dispatch(setAuthModalView(view));
    },
    [dispatch]
  );

  return {
    ...authModalState,
    open,
    close,
    setView,
  };
};
