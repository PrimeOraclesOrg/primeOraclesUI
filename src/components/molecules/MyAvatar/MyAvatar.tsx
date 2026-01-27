import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useGetMyProfileQuery } from "@/store/usersApi";

interface MyAvatarProps {
  className?: string;
}

export const MyAvatar = ({ className }: MyAvatarProps) => {
  const { data: profile } = useGetMyProfileQuery();

  return <UserAvatar className={className} avatarPath={profile?.avatar_path} />;
};
