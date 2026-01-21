import { getUserProfile, onAuthStateChange } from "@/services";
import { clearUser, setUser, store } from "@/store";
import { clearProfile, setProfile } from "@/store/authSlice";
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

    (async () => {
      const { data: profile, error } = await getUserProfile();
      if (error) return store.dispatch(clearProfile());
      if (profile) store.dispatch(setProfile(profile));
    })();

    return () => unsubscribe();
  }, []);
};
