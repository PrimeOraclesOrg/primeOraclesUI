import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarPath: string;
  size?: "10" | "16";
}

export const UserAvatar = ({ avatarPath, size = "10" }: UserAvatarProps) => {
  return (
    <Avatar className={`w-${size} h-${size}`}>
      <AvatarImage src={`${storageUrlBase}/${avatarPath}`} />
      <AvatarFallback>
        <User className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  );
};
