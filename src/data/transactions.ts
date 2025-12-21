import type { Transaction, Order, SocialLink } from "@/types";

export const mockSocialLinks: SocialLink[] = [
  { platform: "youtube", url: "https://www.youtube.com/@LeshaMaisak", icon: "▶", color: "bg-red-600" },
  { platform: "instagram", url: "https://www.instagram.com/@Lesha.Im", icon: "◎", color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" },
  { platform: "tiktok", url: "https://www.tiktok.com/@lesha.Im", icon: "♪", color: "bg-black" },
];

export const mockTransactions: Transaction[] = [
  { id: "1", amount: 22.00, status: "pending", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "2", amount: 30.00, status: "deposit", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "3", amount: 15.00, status: "deposit", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
  { id: "4", amount: 15.00, status: "withdrawn", method: "Tether TRC20 - USDTT", address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe" },
];

export const mockOrders: Order[] = [
  { id: "1", title: "Mellstroy game", status: "completed", type: "Награда за контен", amount: 22.00 },
  { id: "2", title: "Торговый бот", status: "pending", type: "Маркетплейс", amount: 353.00 },
  { id: "3", title: "Трусы", status: "purchased", type: "Маркетплейс", amount: 5.00 },
];
