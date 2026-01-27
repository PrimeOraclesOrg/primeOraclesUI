import { useLogoutMutation } from "@/store/authApi";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { useNavigate } from "react-router-dom";

export const useSettings = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data: profile } = useGetMyProfileQuery();

  const onLogout = async () => {
    navigate("/");
    await logout();
  };

  return {
    onLogout,
    profile,
  };
};
