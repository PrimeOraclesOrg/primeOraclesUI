import { getUserProfile, onAuthStateChange } from "@/services";
import { clearUser, setUser, store } from "@/store";
import { clearProfile, setProfile } from "@/store/authSlice";
import { useCallback, useEffect } from "react";

export const useAuthListener = () => {
  const dispatch = store.dispatch;

  const fetchUserProfile = useCallback(async () => {
    const { data: profile, error } = await getUserProfile();
    if (error) return dispatch(clearProfile());
    if (profile) dispatch(setProfile(profile));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    fetchUserProfile();

    return () => unsubscribe();
  }, [fetchUserProfile, dispatch]);
};
