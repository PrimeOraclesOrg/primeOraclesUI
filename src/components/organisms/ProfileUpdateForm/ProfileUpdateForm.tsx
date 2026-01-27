import { TikTokIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
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
          <input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            {...register("name")}
            disabled={isSubmitting}
            className={cn(
              "flex h-12 w-full rounded-lg border-2 bg-secondary/30 border-border/50 px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              errors.name && "border-destructive focus:border-destructive"
            )}
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
            id="description"
            placeholder="Описание"
            {...register("description")}
            disabled={isSubmitting}
            rows={3}
            className={cn(
              "bg-secondary/30 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent transition-colors rounded-lg resize-y",
              errors.description && "border-destructive focus:border-destructive"
            )}
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
          <div className="relative">
            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
            <input
              type="text"
              placeholder="https://www.youtube.com/@username"
              {...register("youtubeUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border-2 bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.youtubeUrl && "border-destructive focus:border-destructive"
              )}
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          {errors.youtubeUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.youtubeUrl?.message}</p>
          )}

          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
            <input
              type="text"
              placeholder="https://www.instagram.com/@username"
              {...register("instagramUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border-2 bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.instagramUrl && "border-destructive focus:border-destructive"
              )}
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          {errors.instagramUrl && (
            <p className="text-destructive text-sm animate-fade-in">
              {errors.instagramUrl?.message}
            </p>
          )}

          <div className="relative">
            <TikTokIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground" />
            <input
              type="text"
              placeholder="https://www.tiktok.com/@username"
              {...register("tiktokUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border-2 bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.tiktokUrl && "border-destructive focus:border-destructive"
              )}
            />
            <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
