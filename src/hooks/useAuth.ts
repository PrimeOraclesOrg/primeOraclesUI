import { selectAuthUser, useAppSelector } from "@/store";

export const useAuth = () => {
  const user = useAppSelector(selectAuthUser);

  return {
    user,
  };
};
