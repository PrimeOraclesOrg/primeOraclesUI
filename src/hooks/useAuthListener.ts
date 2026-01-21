import { getUserProfile, onAuthStateChange } from "@/services";
import {
  clearUser,
  selectAuthIsProfileFetching,
  selectAuthProfile,
  selectAuthUser,
  setUser,
  useAppDispatch,
} from "@/store";
import { clearProfile, setProfile } from "@/store/authSlice";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isUserFetching = useSelector(selectAuthIsProfileFetching);
  const isProfileFetching = useSelector(selectAuthIsProfileFetching);
  const profile = useSelector(selectAuthProfile);
  const user = useSelector(selectAuthUser);

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

  useEffect(() => {
    if (isUserFetching && isProfileFetching) return;

    if (!profile?.is_profile_completed && user && location.pathname !== "/profile-setup")
      navigate("/profile-setup");
  }, [profile, user, location, navigate, isUserFetching, isProfileFetching]);
};
