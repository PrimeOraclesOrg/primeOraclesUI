import { StatusBadge } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { SettingsLayout } from "../SettingsLayout/SettingsLayout";

interface SettingsBalanceTemplateProps {
  balance: number;
  transactions: Array<Transaction>;
  name: string;
  username: string;
  onLogout: () => void;
}

export const SettingsBalanceTemplate = ({
  balance,
  transactions,
  name,
  username,
  onLogout,
}: SettingsBalanceTemplateProps) => {
  return (
    <SettingsLayout activeTab="balance" name={name} username={username} onLogout={onLogout}>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Доступный баланс</p>
          <p className="text-4xl font-bold mt-1">$ {balance.toFixed(2)}</p>
        </div>

        <div className="h-px bg-border" />

        <div className="flex gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Пополнить
          </Button>
          <Button variant="outline" className="border-border hover:bg-accent px-8">
            Вывести
          </Button>
        </div>

        <div>
          <h3 className="font-medium mb-4 border-b border-border pb-2">История</h3>
          <div className="space-y-0">
            <div className="grid grid-cols-3 text-sm text-muted-foreground py-2 border-b border-border">
              <span>Сумма</span>
              <span>Статус</span>
              <span>Отправлено</span>
            </div>
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-3 py-3 border-b border-border items-center"
              >
                <span>$ {tx.amount.toFixed(2)}</span>
                <span>
                  <StatusBadge status={tx.status} type="transaction" />
                </span>
                <div className="text-sm">
                  <p>{tx.method}</p>
                  <p className="text-muted-foreground text-xs truncate">{tx.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          * Prime Oracles — технологическая компания, а не банк. Платежные услуги предоставляются
          партнёрами Prime Oracles. Балансы Prime Oracles не застрахованы
        </p>
      </div>
    </SettingsLayout>
  );
};
