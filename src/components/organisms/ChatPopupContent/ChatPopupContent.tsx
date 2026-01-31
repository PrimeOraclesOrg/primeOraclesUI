import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePopup } from "@/hooks/usePopup";
import { MessageCircle } from "lucide-react";

export const ChatPopupContent = () => {
  const { closePopup } = usePopup();

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 sm:p-2.5">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <p className="text-foreground text-sm sm:text-base pt-0.5 leading-snug">
          Связаться с продавцом можно только после покупки товара.
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Чат с продавцом откроется сразу после оформления заказа.
          <br />
          Оплата будет заморожена на{" "}
          <strong className="font-semibold text-foreground"> 24 часа</strong> для вашей
          безопасности.
          <br />
          Если что-то пойдет не так -{" "}
          <span className="font-medium text-primary">деньги автоматически вернутся</span> на баланс
          аккаунта.
        </p>
      </div>
      <Separator />
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Это защищает от мошенничества и переводов на сторонние площадки.
      </p>
      <Button
        variant="outline"
        className="w-full min-h-11 sm:min-h-10 py-3 sm:py-2"
        onClick={closePopup}
      >
        Закрыть
      </Button>
    </div>
  );
};
