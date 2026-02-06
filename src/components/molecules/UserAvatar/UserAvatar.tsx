import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { cn } from "@/utils";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarPath: string;
  className?: string;
  size?: "10" | "16";
}

export const UserAvatar = ({ avatarPath, size = "10", className }: UserAvatarProps) => {
  return (
    <Avatar className={cn(`w-${size} h-${size}`, className)}>
      <AvatarImage src={`${storageUrlBase}/${avatarPath}`} />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
