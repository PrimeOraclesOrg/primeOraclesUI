import { selectAuthProfile, useAppSelector } from "@/store";
import { UserAvatar } from "../UserAvatar/UserAvatar";

interface MyAvatarProps {
  className?: string;
}

export const MyAvatar = ({ className }: MyAvatarProps) => {
  const profile = useAppSelector(selectAuthProfile);

  return <UserAvatar className={className} avatarPath={profile.avatar_path} />;
};
