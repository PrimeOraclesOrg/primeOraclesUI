import {
  AuthCodeMode,
  AuthView,
  closeAuthModal,
  openAuthModal,
  selectAuthModal,
  setAuthModalCodeMode,
  setAuthModalEmail,
  setAuthModalView,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { useCallback } from "react";

export const useAuthModal = () => {
  const dispatch = useAppDispatch();
  const authModalState = useAppSelector(selectAuthModal);

  const open = useCallback(
    (view?: AuthView) => {
      dispatch(openAuthModal(view));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch(closeAuthModal());
  }, [dispatch]);

  const setView = useCallback(
    (view: AuthView) => {
      dispatch(setAuthModalView(view));
    },
    [dispatch]
  );

  const setCodeMode = useCallback(
    (mode: AuthCodeMode) => {
      dispatch(setAuthModalCodeMode(mode));
    },
    [dispatch]
  );

  const setEmail = useCallback(
    (email: string) => {
      dispatch(setAuthModalEmail(email));
    },
    [dispatch]
  );

  return {
    ...authModalState,
    open,
    close,
    setView,
    setCodeMode,
    setEmail,
  };
};
