import { onAuthStateChange } from "@/services";
import { useAppDispatch } from "@/store";
import { authApi } from "@/store/authApi";
import { useEffect } from "react";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        dispatch(authApi.util.invalidateTags(["AuthUser", "User"]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
