import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarPath: string;
}

export const UserAvatar = ({ avatarPath }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={`${storageUrlBase}/${avatarPath}`} />
      <AvatarFallback>
        <User className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  );
};
