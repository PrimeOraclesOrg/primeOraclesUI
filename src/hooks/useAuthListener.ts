import { onAuthStateChange } from "@/services";
import { useAppDispatch } from "@/store";
import { authApi, useLogoutMutation } from "@/store/authApi";
import { useEffect } from "react";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const [_, { isLoading }] = useLogoutMutation({
    fixedCacheKey: "shared-logout-state",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && !isLoading) {
        dispatch(authApi.util.invalidateTags(["AuthUser", "User"]));
      }
    });

    return () => unsubscribe();
  }, [dispatch, isLoading]);
};
