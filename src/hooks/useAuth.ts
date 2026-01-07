import { selectAuth, setIsAuthenticated, useAppDispatch, useAppSelector } from "@/store"
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const setAuthentication = useCallback((isAuthorized: boolean) => {
    dispatch(setIsAuthenticated(isAuthorized));
  }, [dispatch])

  return {
    ...authState,
    setAuthentication
  }
}