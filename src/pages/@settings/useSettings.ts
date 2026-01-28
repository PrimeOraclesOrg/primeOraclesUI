import { useOnRequestResult } from "@/hooks/useOnRequestResult";
import { useLogoutMutation } from "@/store/authApi";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useSettings = () => {
  const navigate = useNavigate();
  const [onLogout, { isError, isSuccess, error }] = useLogoutMutation();
  const { data: profile } = useGetMyProfileQuery();
  const { t } = useTranslation();

  useOnRequestResult({
    isError: isError,
    isSuccess: isSuccess,
    errorMessage: error ? t(`status:${error.code}`) : "",
    onSuccess: () => {
      navigate("/");
    },
  });

  return {
    onLogout,
    profile,
  };
};
