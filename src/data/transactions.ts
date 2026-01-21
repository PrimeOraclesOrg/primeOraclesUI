import type { Transaction, Order, SocialLink } from "@/types";

export const mockSocialLinks: SocialLink[] = [
  {
    type: "youtube",
    link: "https://www.youtube.com/@LeshaMaisak",
  },
  {
    type: "instagram",
    link: "https://www.instagram.com/@Lesha.Im",
  },
  { type: "tiktok", link: "https://www.tiktok.com/@lesha.Im" },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 22.0,
    status: "pending",
    method: "Tether TRC20 - USDTT",
    address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe",
  },
  {
    id: "2",
    amount: 30.0,
    status: "deposit",
    method: "Tether TRC20 - USDTT",
    address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe",
  },
  {
    id: "3",
    amount: 15.0,
    status: "deposit",
    method: "Tether TRC20 - USDTT",
    address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe",
  },
  {
    id: "4",
    amount: 15.0,
    status: "withdrawn",
    method: "Tether TRC20 - USDTT",
    address: "TB1LXZhinQoqmQnRpSWMDM11P86DyNe",
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    title: "Mellstroy game",
    status: "completed",
    type: "Награда за контен",
    amount: 22.0,
  },
  { id: "2", title: "Торговый бот", status: "pending", type: "Маркетплейс", amount: 353.0 },
  { id: "3", title: "Трусы", status: "purchased", type: "Маркетплейс", amount: 5.0 },
];
