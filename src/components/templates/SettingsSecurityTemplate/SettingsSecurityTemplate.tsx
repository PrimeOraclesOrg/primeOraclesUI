import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { SettingsLayout } from "../SettingsLayout/SettingsLayout";

interface SettingsSecurityTemplateProps {
  name: string;
  username: string;
  onLogout: () => void;
  onPasswordChangeClick: () => void;
  isSending: boolean;
}

export const SettingsSecurityTemplate = ({
  name,
  username,
  onLogout,
  onPasswordChangeClick,
  isSending,
}: SettingsSecurityTemplateProps) => {
  return (
    <SettingsLayout activeTab="security" name={name} username={username} onLogout={onLogout}>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Защитите свою учетную запись, запросив проверочный код при входе в систему.
        </p>

        <div className="bg-card border border-primary/30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Двухфакторная аутентификация ( Рекомендуется )</p>
              <p className="text-sm text-muted-foreground">
                Получите код через приложение-аутентификатор.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Подключить 2FA
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Пароль</p>
            <p className="text-sm text-muted-foreground">
              Вы можете изменить пароль в любой момент
            </p>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onPasswordChangeClick}
            disabled={isSending}
          >
            {isSending ? "Отправляем код..." : "Изменить пароль"}
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
};
