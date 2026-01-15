/**
 * ProfileSetupForm Component
 *
 * Form for completing user profile after registration.
 * Includes name, username, description, social links, and avatar selection.
 */

import { AuthInput } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/useToast";
import { completeProfile } from "@/services";
import { profileSetupSchema, ProfileSetupFormData } from "@/utils";
import { cn } from "@/lib/utils";
import { ImagePlus, Youtube, Instagram } from "lucide-react";
import { useCallback, useState } from "react";

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Predefined avatar options
const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=cat&backgroundColor=10b981",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=monkey&backgroundColor=f97316",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=owl&backgroundColor=eab308",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=fox&backgroundColor=f97316",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=panda&backgroundColor=3b82f6",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=tiger&backgroundColor=ef4444",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=lion&backgroundColor=eab308",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=koala&backgroundColor=a855f7",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=hamster&backgroundColor=22c55e",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=dog&backgroundColor=f97316",
];

interface ProfileSetupErrors {
  name?: string;
  username?: string;
  description?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  avatar?: string;
}

export const ProfileSetupForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState<ProfileSetupErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const formData: ProfileSetupFormData = {
        name,
        username,
        description,
        youtubeUrl,
        instagramUrl,
        tiktokUrl,
        avatar,
      };

      const result = profileSetupSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: ProfileSetupErrors = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof ProfileSetupErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await completeProfile({
          name: result.data.name,
          username: result.data.username,
          description: result.data.description,
          youtubeUrl: result.data.youtubeUrl,
          instagramUrl: result.data.instagramUrl,
          tiktokUrl: result.data.tiktokUrl,
          avatar: result.data.avatar,
        });

        if (error) {
          toast({
            title: "Ошибка сохранения",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Успешно",
            description: "Профиль успешно сохранён",
          });
          /* Close */
        }
      } catch {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка. Попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [name, username, description, youtubeUrl, instagramUrl, tiktokUrl, avatar]
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name field with counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="name" className="text-foreground text-sm font-normal">
            Имя
          </Label>
          <span className="text-muted-foreground text-xs">{name.length}/50</span>
        </div>
        <input
          id="name"
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 50))}
          disabled={isLoading}
          className={cn(
            "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            errors.name && "border-destructive focus:border-destructive"
          )}
        />
        {errors.name && <p className="text-destructive text-sm animate-fade-in">{errors.name}</p>}
      </div>

      {/* Username field */}
      <AuthInput
        label="Username"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        disabled={isLoading}
      />

      {/* Description field with counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description" className="text-foreground text-sm font-normal">
            Описание{" "}
            <span className="text-muted-foreground font-normal">- необязательное поле</span>
          </Label>
          <span className="text-muted-foreground text-xs">{description.length}/250</span>
        </div>
        <Textarea
          id="description"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 250))}
          disabled={isLoading}
          rows={3}
          className={cn(
            "bg-secondary/30 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-0 focus:ring-offset-0 transition-colors rounded-lg resize-none",
            errors.description && "border-destructive focus:border-destructive"
          )}
        />
        {errors.description && (
          <p className="text-destructive text-sm animate-fade-in">{errors.description}</p>
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
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            disabled={isLoading}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              errors.youtubeUrl && "border-destructive focus:border-destructive"
            )}
          />
        </div>
        {errors.youtubeUrl && (
          <p className="text-destructive text-sm animate-fade-in">{errors.youtubeUrl}</p>
        )}

        {/* Instagram */}
        <div className="relative">
          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
          <input
            type="text"
            placeholder="https://www.instagram.com/@username"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            disabled={isLoading}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              errors.instagramUrl && "border-destructive focus:border-destructive"
            )}
          />
        </div>
        {errors.instagramUrl && (
          <p className="text-destructive text-sm animate-fade-in">{errors.instagramUrl}</p>
        )}

        {/* TikTok */}
        <div className="relative">
          <TikTokIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground" />
          <input
            type="text"
            placeholder="https://www.tiktok.com/@username"
            value={tiktokUrl}
            onChange={(e) => setTiktokUrl(e.target.value)}
            disabled={isLoading}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-secondary/30 border-border/50 pl-10 pr-3 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              errors.tiktokUrl && "border-destructive focus:border-destructive"
            )}
          />
        </div>
        {errors.tiktokUrl && (
          <p className="text-destructive text-sm animate-fade-in">{errors.tiktokUrl}</p>
        )}
      </div>

      {/* Avatar selection */}
      <div className="space-y-3">
        <Label className="text-foreground text-sm font-normal">Добавьте аватара</Label>
        <div className="grid grid-cols-6 gap-3">
          {/* Upload button */}
          <button
            type="button"
            disabled={isLoading}
            className={cn(
              "w-12 h-12 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors",
              avatar === "upload" && "border-primary text-primary"
            )}
            onClick={() => setAvatar("upload")}
          >
            <ImagePlus className="h-5 w-5" />
          </button>

          {/* Predefined avatars */}
          {AVATAR_OPTIONS.map((avatarUrl, index) => (
            <button
              key={index}
              type="button"
              disabled={isLoading}
              className={cn(
                "w-12 h-12 rounded-full overflow-hidden border-2 transition-colors",
                avatar === avatarUrl
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50"
              )}
              onClick={() => setAvatar(avatarUrl)}
            >
              <img
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium rounded-lg mt-6"
        disabled={isLoading}
      >
        {isLoading ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};
