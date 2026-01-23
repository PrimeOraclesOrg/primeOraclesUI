import { TikTokIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";
import { Instagram, Pencil, Youtube } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProfileUpdateFormProps {
  onSubmit: () => void;
  register: UseFormRegister<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
}

export const ProfileUpdateForm = ({ onSubmit, register, errors }: ProfileUpdateFormProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Имя</label>
        <div className="relative">
          <Input {...register("name")} className="bg-card border-border pr-10" />
          <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        {errors.name && (
          <p className="text-destructive text-sm animate-fade-in">{errors.name?.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Описание</label>
        <div className="relative">
          <Textarea
            {...register("description")}
            placeholder="Описание"
            className="bg-card border-border min-h-[100px] pr-10"
          />
          <Pencil className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        </div>
        {errors.description && (
          <p className="text-destructive text-sm animate-fade-in">{errors.description?.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-3 block">
          Добавьте ссылки на ваши аккаунты
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-red-600"
              )}
            >
              <Youtube />
            </div>
            <Input
              {...register("youtubeUrl")}
              placeholder="https://www.youtube.com/@username"
              className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
            />
          </div>
          {errors.youtubeUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.youtubeUrl?.message}</p>
          )}

          <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
              )}
            >
              <Instagram />
            </div>
            <Input
              {...register("instagramUrl")}
              placeholder="https://www.instagram.com/@username"
              className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
            />
          </div>
          {errors.instagramUrl && (
            <p className="text-destructive text-sm animate-fade-in">
              {errors.instagramUrl?.message}
            </p>
          )}

          <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm bg-black"
              )}
            >
              <TikTokIcon />
            </div>
            <Input
              {...register("tiktokUrl")}
              placeholder="https://www.tiktok.com/@username"
              className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
            />
          </div>
          {errors.tiktokUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.tiktokUrl?.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6"
      >
        Сохранить
      </Button>
    </form>
  );
};
