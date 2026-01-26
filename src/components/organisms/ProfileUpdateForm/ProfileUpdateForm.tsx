import { TikTokIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, profileSetupMaxLenghtLimits } from "@/utils";
import { UpdateProfileFormData } from "@/utils/validators/updateProfile";
import { Check, ImagePlus, Instagram, Pencil, Youtube } from "lucide-react";
import { useCallback, useRef } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ImageCrop } from "../ImageCrop/ImageCrop";

interface ProfileUpdateFormProps {
  onSubmit: () => void;
  register: UseFormRegister<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
  watch: UseFormWatch<UpdateProfileFormData>;
  setValue: UseFormSetValue<UpdateProfileFormData>;
  isSubmitting: boolean;
  defaultAvatars: Array<string>;
  wasDataChanged: boolean;
}

export const ProfileUpdateForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  defaultAvatars,
  watch,
  setValue,
  wasDataChanged,
}: ProfileUpdateFormProps) => {
  const selectedAvatar = watch("selectedAvatar");
  const uploadedAvatar = watch("uploadedAvatar");
  const nameValue = watch("name");
  const descriptionValue = watch("description");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const unSelectAvatar = useCallback(() => {
    setValue("selectedAvatar", "", { shouldDirty: true });
    setValue("uploadedAvatar", "", { shouldDirty: true });
  }, [setValue]);

  const handleUploadClick = useCallback(() => {
    if (uploadedAvatar) {
      unSelectAvatar();
      return;
    }
    fileInputRef.current?.click();
  }, [uploadedAvatar, unSelectAvatar]);

  const setUploadedAvatar = (avatar: string) => {
    setValue("selectedAvatar", "", { shouldDirty: true });
    setValue("uploadedAvatar", avatar, { shouldDirty: true });
  };

  const selectAvatar = (avatar: string) => {
    if (selectedAvatar === avatar) {
      unSelectAvatar();
      return;
    }
    setValue("selectedAvatar", avatar, { shouldDirty: true });
    setValue("uploadedAvatar", "", { shouldDirty: true });
  };

  const isUploadedAvatar = !selectedAvatar && uploadedAvatar;

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground mb-2 block">Аватар</label>
        <div className="grid grid-cols-[repeat(auto-fit,80px)] gap-3 justify-center">
          {/* Upload button */}
          <button
            type="button"
            disabled={isSubmitting}
            className={cn(
              "w-20 h-20 rounded-full outline outline-3 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:outline-accent/50 hover:text-accent transition-colors relative overflow-hidden",
              isUploadedAvatar ? "outline-accent" : "outline-transparent hover:outline-accent/50"
            )}
            onClick={handleUploadClick}
          >
            {/* Uploaded image background */}
            {isUploadedAvatar && (
              <img
                src={uploadedAvatar}
                alt="Uploaded avatar"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Overlay for selected uploaded avatar */}
            {isUploadedAvatar && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}

            {/* Default content when no uploaded image or not selected with image */}
            {!isUploadedAvatar && (
              <div
                className={cn(
                  "flex flex-col items-center justify-center z-10",
                  !isUploadedAvatar && "bg-black/50 absolute inset-0"
                )}
              >
                <ImagePlus className={cn("h-5 w-5", !isUploadedAvatar && "text-white")} />
                <span className={cn("text-[10px] mt-1", !isUploadedAvatar && "text-white")}>
                  Добавить
                </span>
              </div>
            )}
          </button>

          {/* Predefined avatars */}
          {defaultAvatars.map((avatarUrl, index) => {
            const isSelected = selectedAvatar === `${index + 1}`;
            return (
              <button
                key={index}
                type="button"
                disabled={isSubmitting}
                className={cn(
                  "w-20 h-20 rounded-full overflow-hidden outline outline-3 transition-colors relative",
                  isSelected ? "outline-accent" : "outline-transparent hover:outline-accent/50"
                )}
                onClick={() => selectAvatar(`${index + 1}`)}
              >
                <img
                  src={avatarUrl}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Selection overlay with checkmark */}
                {isSelected && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <ImageCrop
        fileInputRef={fileInputRef}
        setUploadedImage={setUploadedAvatar}
        cropShape="round"
      />

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground mb-2 block">Имя</label>
          <span className="text-muted-foreground text-xs">
            {nameValue.length}/{profileSetupMaxLenghtLimits.name}
          </span>
        </div>
        <div className="relative">
          <Input
            {...register("name")}
            disabled={isSubmitting}
            className="bg-card border-border pr-10"
          />
          <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        {errors.name && (
          <p className="text-destructive text-sm animate-fade-in">{errors.name?.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground mb-2 block">Описание</label>
          <span className="text-muted-foreground text-xs">
            {descriptionValue.length}/{profileSetupMaxLenghtLimits.description}
          </span>
        </div>
        <div className="relative">
          <Textarea
            {...register("description")}
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
        disabled={isSubmitting || !wasDataChanged}
      >
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};
