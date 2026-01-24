import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { usePopup } from "@/hooks/usePopup";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface LogoutPopupContentProps {
  logout: () => void;
}

export const LogoutPopupContent = ({ logout }: LogoutPopupContentProps) => {
  const { closePopup } = usePopup();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Выход из аккаунта</DialogTitle>
        <DialogDescription>Вы уверены что хотите выйти из аккаунта?</DialogDescription>
      </DialogHeader>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={closePopup}>
          Не выходить
        </Button>
        <Button variant="destructive" onClick={logout}>
          Выйти
        </Button>
      </div>
    </>
  );
};
