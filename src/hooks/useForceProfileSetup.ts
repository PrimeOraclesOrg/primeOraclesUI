import { useGetAuthUserQuery } from "@/store/authApi";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useForceProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profile } = useGetMyProfileQuery();
  const { data: user } = useGetAuthUserQuery();

  useEffect(() => {
    if (!profile) return;

    if (!profile?.is_profile_completed && user && location.pathname !== "/profile-setup") {
      navigate("/profile-setup");
    }
  }, [profile, user, location, navigate]);
};
