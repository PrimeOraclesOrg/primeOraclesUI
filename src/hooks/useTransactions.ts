import { mockTransactions, mockOrders, mockSocialLinks } from "@/data/transactions";

export function useTransactions() {
  return {
    transactions: mockTransactions,
    isLoading: false,
    error: null,
  };
}

export function useOrders() {
  return {
    orders: mockOrders,
    isLoading: false,
    error: null,
  };
}

export function useSocialLinks() {
  return {
    socialLinks: mockSocialLinks,
    isLoading: false,
    error: null,
  };
}
