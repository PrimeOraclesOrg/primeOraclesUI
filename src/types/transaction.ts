export type TransactionStatus = "pending" | "deposit" | "withdrawn";

export interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
  method: string;
  address: string;
}

export type OrderStatus = "completed" | "pending" | "purchased";

export interface Order {
  id: string;
  title: string;
  status: OrderStatus;
  type: string;
  amount: number;
}
