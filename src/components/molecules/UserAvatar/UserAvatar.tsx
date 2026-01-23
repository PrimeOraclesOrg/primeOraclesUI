import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { selectAuthProfile } from "@/store";
import { User } from "lucide-react";
import { useSelector } from "react-redux";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const profile = useSelector(selectAuthProfile);

  return (
    <Avatar className={className}>
      <AvatarImage src={`${storageUrlBase}/${profile?.avatar_path}`} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
