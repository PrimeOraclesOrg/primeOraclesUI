import {
  selectAuth,
  useAppSelector,
} from "@/store";

export const useAuth = () => {
  const authState = useAppSelector(selectAuth);

  return {
    ...authState
  };
};
