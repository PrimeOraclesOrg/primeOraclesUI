import { onAuthStateChange } from "@/services";
import { clearUser, setUser, store } from "@/store";
import { useEffect } from "react";

export const useAuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChange((_event, session) => {
      if (session?.user) {
        store.dispatch(setUser(session.user));
      } else {
        store.dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);
};
