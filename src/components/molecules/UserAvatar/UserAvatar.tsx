import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { storageUrlBase } from "@/data";
import { selectAuthProfile } from "@/store";
import { User } from "lucide-react";
import { useSelector } from "react-redux";

export const UserAvatar = () => {
  const profile = useSelector(selectAuthProfile);

  return (
    <Avatar>
      <AvatarImage src={`${storageUrlBase}/${profile?.avatar_path}`} />
      <AvatarFallback>
        <User className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  );
};
