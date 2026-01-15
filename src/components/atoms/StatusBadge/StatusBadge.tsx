import { cn } from "@/utils/helpers";
import type { TransactionStatus, OrderStatus } from "@/types";

type StatusType = "transaction" | "order";

interface StatusBadgeProps {
  status: TransactionStatus | OrderStatus;
  type: StatusType;
}

const transactionStyles: Record<TransactionStatus, string> = {
  pending: "border-yellow-500 text-yellow-500",
  deposit: "border-green-500 text-green-500",
  withdrawn: "border-blue-500 text-blue-500",
};

const transactionLabels: Record<TransactionStatus, string> = {
  pending: "Ожидание",
  deposit: "Пополнение",
  withdrawn: "Выведено",
};

const orderStyles: Record<OrderStatus, string> = {
  completed: "border-green-500 text-green-500",
  pending: "border-yellow-500 text-yellow-500",
  purchased: "border-primary text-primary",
};

const orderLabels: Record<OrderStatus, string> = {
  completed: "Выполнено",
  pending: "Ожидает подтверждения",
  purchased: "Покупка",
};

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const styles =
    type === "transaction"
      ? transactionStyles[status as TransactionStatus]
      : orderStyles[status as OrderStatus];

  const label =
    type === "transaction"
      ? transactionLabels[status as TransactionStatus]
      : orderLabels[status as OrderStatus];

  return <span className={cn("px-3 py-1 rounded-full border text-xs", styles)}>{label}</span>;
}
