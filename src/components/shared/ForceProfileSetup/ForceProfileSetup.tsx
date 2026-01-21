import { LoadingScreen } from "@/components/atoms";
import { selectAuthIsProfileFetching, selectAuthProfile } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ForceProfileSetup = () => {
  const isFetching = useSelector(selectAuthIsProfileFetching);
  const profile = useSelector(selectAuthProfile);
  const location = useLocation();

  if (isFetching) return <LoadingScreen />;
  if (!profile) return;

  if (!profile?.is_profile_completed && location.pathname !== "/profile-setup")
    return <Navigate to={"/profile-setup"} />;
};
