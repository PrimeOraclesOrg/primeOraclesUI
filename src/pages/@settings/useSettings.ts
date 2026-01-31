import { useOnRequestResult } from "@/hooks/useOnRequestResult";
import { useLogoutMutation } from "@/store/authApi";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useSettings = () => {
  const navigate = useNavigate();
  const [onLogout, { isError, isSuccess, error }] = useLogoutMutation({
    fixedCacheKey: "shared-logout-state",
  });
  const { data: profile } = useGetMyProfileQuery();
  const { t } = useTranslation();

  useOnRequestResult({
    isError,
    isSuccess,
    errorMessage: error ? { title: t(`status:${error.code}`) } : undefined,
    onSuccess: () => navigate("/"),
  });

  return {
    onLogout,
    profile,
  };
};
