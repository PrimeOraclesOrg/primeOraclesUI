import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockSocialLinks } from "@/data/transactions";
import type { SocialLink } from "@/types";

export function BasicSettings() {
  const [name, setName] = useState("Lesha Maisak");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(mockSocialLinks);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Имя</label>
        <div className="relative">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card border-border pr-10"
          />
          <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Описание</label>
        <div className="relative">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            className="bg-card border-border min-h-[100px] pr-10"
          />
          <Pencil className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-3 block">Добавьте ссылки на ваши аккаунты</label>
        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <div key={link.platform} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm", link.color)}>
                {link.icon}
              </div>
              <Input
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index].url = e.target.value;
                  setSocialLinks(newLinks);
                }}
                className="flex-1 bg-transparent border-0 p-0 h-auto focus-visible:ring-0"
              />
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6">
        Сохранить
      </Button>
    </div>
  );
}
