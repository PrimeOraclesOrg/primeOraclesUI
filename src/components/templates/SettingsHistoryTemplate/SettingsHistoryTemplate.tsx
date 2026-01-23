import { StatusBadge } from "@/components/atoms";
import { Order } from "@/types";
import { SettingsLayout } from "../SettingsLayout/SettingsLayout";

interface SettingsHistoryTemplateProps {
  name: string;
  username: string;
  orders: Array<Order>;
  onLogout: () => void;
  onTabChange: (tab: string) => void;
}

export const SettingsHistoryTemplate = ({
  orders,
  name,
  username,
  onLogout,
  onTabChange,
}: SettingsHistoryTemplateProps) => {
  return (
    <SettingsLayout
      activeTab="history"
      name={name}
      username={username}
      onLogout={onLogout}
      onTabChange={onTabChange}
    >
      <div>
        <h3 className="text-xl font-medium italic mb-4">История заказов</h3>
        <div className="space-y-0">
          <div className="grid grid-cols-4 text-sm text-muted-foreground py-2 border-b border-border">
            <span>Заголовок</span>
            <span>Статус</span>
            <span>Тип</span>
            <span>Сумма</span>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-4 py-3 border-b border-border items-center"
            >
              <span>{order.title}</span>
              <span>
                <StatusBadge status={order.status} type="order" />
              </span>
              <span className="text-muted-foreground">{order.type}</span>
              <span>$ {order.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
};
