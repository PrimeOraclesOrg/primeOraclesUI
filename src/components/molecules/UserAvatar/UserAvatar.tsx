import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarPath: string;
  className?: string;
}

export const UserAvatar = ({ avatarPath, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={`${storageUrlBase}/${avatarPath}`} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
