import { StatusBadge } from "@/components/StatusBadge";
import { mockOrders } from "@/data/transactions";

export function OrderHistory() {
  return (
    <div>
      <h3 className="text-xl font-medium italic mb-4">История заказов</h3>
      <div className="space-y-0">
        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2 border-b border-border">
          <span>Заголовок</span>
          <span>Статус</span>
          <span>Тип</span>
          <span>Сумма</span>
        </div>
        {mockOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-4 py-3 border-b border-border items-center">
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
  );
}
