/**
 * ProfileSetupForm Component
 *
 * Form for completing user profile after registration.
 * Includes name, username, description, social links, and avatar selection.
 */

import { useState, useCallback, useRef } from "react";
import Cropper, { Area } from "react-easy-crop";
import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ProfileSetupFormData } from "@/utils";
import { getCroppedImg } from "@/utils/cropImage";
import { ImagePlus, Youtube, Instagram, Check } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Predefined avatar options
const AVATAR_OPTIONS = [
  "/img/profile_pictures/1.avif",
  "/img/profile_pictures/2.avif",
  "/img/profile_pictures/3.avif",
  "/img/profile_pictures/4.avif",
  "/img/profile_pictures/5.avif",
  "/img/profile_pictures/6.avif",
  "/img/profile_pictures/7.avif",
  "/img/profile_pictures/8.avif",
];

interface ProfileSetupFormProps {
  onSubmit: () => void;
  register: UseFormRegister<ProfileSetupFormData>;
  errors: FieldErrors<ProfileSetupFormData>;
  isSubmitting: boolean;
  watch: UseFormWatch<ProfileSetupFormData>;
  setValue: UseFormSetValue<ProfileSetupFormData>;
}

export const ProfileSetupForm = ({
  errors,
  isSubmitting,
  onSubmit,
  register,
  watch,
  setValue,
}: ProfileSetupFormProps) => {
  const nameValue = watch("name") || "";
  const descriptionValue = watch("description") || "";
  const selectedAvatar = watch("avatar");

  // Cropper state
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setIsCropDialogOpen(true);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      });
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleCropCancel = useCallback(() => {
    setIsCropDialogOpen(false);
    setImageSrc(null);
  }, []);

  const handleCropApply = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setUploadedAvatar(croppedImage);
        setValue("avatar", croppedImage);
        setIsCropDialogOpen(false);
        setImageSrc(null);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  }, [imageSrc, croppedAreaPixels, setValue]);

  // Check if avatar is uploaded custom image (base64)
  const isUploadedAvatar = selectedAvatar?.startsWith("data:image");
  const isUploadSelected = isUploadedAvatar || selectedAvatar === "upload";

  return (
    <>
      <form className="space-y-5" onSubmit={onSubmit}>
        {/* Name field with counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="name" className="text-foreground text-sm font-normal">
              Имя
            </Label>
            <span className="text-muted-foreground text-xs">{nameValue.length}/50</span>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            {...register("name")}
            disabled={isSubmitting}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              errors.name && "border-destructive focus:border-destructive"
            )}
          />
          {errors.name && (
            <p className="text-destructive text-sm animate-fade-in">{errors.name?.message}</p>
          )}
        </div>

        {/* Username field */}
        <AuthInput
          label="Username"
          type="text"
          placeholder="username"
          {...register("username")}
          error={errors.username?.message}
          disabled={isSubmitting}
        />

        {/* Description field with counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-foreground text-sm font-normal">
              Описание{" "}
              <span className="text-muted-foreground font-normal">- необязательное поле</span>
            </Label>
            <span className="text-muted-foreground text-xs">{descriptionValue.length}/250</span>
          </div>
          <Textarea
            id="description"
            placeholder="Описание"
            {...register("description")}
            disabled={isSubmitting}
            rows={3}
            className={cn(
              "bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-0 focus:ring-offset-0 transition-colors rounded-lg resize-none",
              errors.description && "border-destructive focus:border-destructive"
            )}
          />
          {errors.description && (
            <p className="text-destructive text-sm animate-fade-in">{errors.description?.message}</p>
          )}
        </div>

        {/* Social links */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-normal">
            Добавьте ссылки на ваши аккаунты{" "}
            <span className="text-muted-foreground font-normal">- необязательное поле</span>
          </Label>

          {/* YouTube */}
          <div className="relative">
            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
            <input
              type="text"
              placeholder="https://www.youtube.com/@username"
              {...register("youtubeUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.youtubeUrl && "border-destructive focus:border-destructive"
              )}
            />
          </div>
          {errors.youtubeUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.youtubeUrl?.message}</p>
          )}

          {/* Instagram */}
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
            <input
              type="text"
              placeholder="https://www.instagram.com/@username"
              {...register("instagramUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.instagramUrl && "border-destructive focus:border-destructive"
              )}
            />
          </div>
          {errors.instagramUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.instagramUrl?.message}</p>
          )}

          {/* TikTok */}
          <div className="relative">
            <TikTokIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground" />
            <input
              type="text"
              placeholder="https://www.tiktok.com/@username"
              {...register("tiktokUrl")}
              disabled={isSubmitting}
              className={cn(
                "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                errors.tiktokUrl && "border-destructive focus:border-destructive"
              )}
            />
          </div>
          {errors.tiktokUrl && (
            <p className="text-destructive text-sm animate-fade-in">{errors.tiktokUrl?.message}</p>
          )}
        </div>

        {/* Avatar selection */}
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-normal">Добавьте аватара</Label>
          <div className="grid grid-cols-5 gap-3">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Upload button */}
            <button
              type="button"
              disabled={isSubmitting}
              className={cn(
                "w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors relative overflow-hidden",
                isUploadSelected
                  ? "border-accent border-solid"
                  : "border-border/50"
              )}
              onClick={handleUploadClick}
            >
              {/* Uploaded image background */}
              {uploadedAvatar && (
                <img
                  src={uploadedAvatar}
                  alt="Uploaded avatar"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {/* Overlay for selected uploaded avatar */}
              {isUploadSelected && uploadedAvatar && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
              )}
              
              {/* Default content when no uploaded image or not selected with image */}
              {(!uploadedAvatar || !isUploadSelected) && (
                <div className={cn(
                  "flex flex-col items-center justify-center z-10",
                  uploadedAvatar && "bg-black/50 absolute inset-0"
                )}>
                  <ImagePlus className={cn("h-5 w-5", uploadedAvatar && "text-white")} />
                  <span className={cn("text-[10px] mt-1", uploadedAvatar && "text-white")}>
                    Добавьте
                  </span>
                </div>
              )}
            </button>

            {/* Predefined avatars */}
            {AVATAR_OPTIONS.map((avatarUrl, index) => {
              const isSelected = selectedAvatar === avatarUrl;
              return (
                <button
                  key={index}
                  type="button"
                  disabled={isSubmitting}
                  className={cn(
                    "w-20 h-20 rounded-full overflow-hidden border-2 transition-colors relative",
                    isSelected
                      ? "border-accent"
                      : "border-transparent hover:border-accent/50"
                  )}
                  onClick={() => setValue("avatar", avatarUrl)}
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

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium rounded-lg mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>

      {/* Image Cropper Dialog */}
      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background border-secondary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Обрезать изображение</DialogTitle>
          </DialogHeader>
          
          <div className="relative w-full h-72 bg-secondary/30 rounded-lg overflow-hidden">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                classes={{
                  containerClassName: "rounded-lg",
                }}
              />
            )}
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCropCancel}
              className="px-8"
            >
              Отмена
            </Button>
            <Button
              type="button"
              onClick={handleCropApply}
              className="px-8"
            >
              Применить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
