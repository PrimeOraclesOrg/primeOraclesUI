import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { selectAuthProfile, useAppSelector } from "@/store";
import { User } from "lucide-react";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const profile = useAppSelector(selectAuthProfile);

  return (
    <Avatar className={className}>
      <AvatarImage src={`${storageUrlBase}/${profile.avatar_path}`} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
