import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatar_path: string;
}

export const UserAvatar = ({ avatar_path }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={`${storageUrlBase}/${avatar_path}`} />
      <AvatarFallback>
        <User className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  );
};
