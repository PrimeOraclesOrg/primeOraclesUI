import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ConfirmCodeHelpPopupContentProps {
  codeMode: "sign-up" | "recovery";
}

export const ConfirmCodeHelpPopupContent = ({ codeMode }: ConfirmCodeHelpPopupContentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Если сообщение не пришло в течении 2-3 минут:
        </DialogTitle>
      </DialogHeader>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mt-4">
        <li>Попробуйте отправить код снова</li>
        <li>Проверьте папку спам</li>
        <li>Проверьте правильно ли вы ввели э-почту</li>
        {codeMode === "sign-up" && (
          <li>Почта может быть уже зарегестрирована, попробуйте войти в систему</li>
        )}
      </ul>
    </>
  );
};
