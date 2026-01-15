import { selectAuthIsFetching, selectAuthUser, useAppSelector } from "@/store";

export const useAuth = () => {
  const user = useAppSelector(selectAuthUser);
  const isAuthFetching = useAppSelector(selectAuthIsFetching);

  return {
    user,
    isAuthFetching,
  };
};
