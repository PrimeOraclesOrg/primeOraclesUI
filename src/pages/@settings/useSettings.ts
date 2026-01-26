import { signOut } from "@/services";
import { selectAuthProfile, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";

export const useSettings = () => {
  const navigate = useNavigate();
  const profile = useAppSelector(selectAuthProfile);

  const onLogout = async () => {
    await signOut();
    navigate("/");
  };

  return {
    onLogout,
    profile,
  };
};
