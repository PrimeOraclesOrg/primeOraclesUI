import type { WorkspaceProduct } from "@/types";

import productCrypto from "@/assets/product-crypto.jpg";
import productWealth from "@/assets/product-wealth.jpg";
import productTradingBot from "@/assets/product-trading-bot.jpg";
import productSoftware from "@/assets/product-software.jpg";

export type WorkspaceProductStatus = "active" | "archived";
export type WorkspaceSortOption = "date" | "name" | "price" | "rating" | "popularity";

export const workspaceStatusTabs = [
  { id: "all", label: "Все статусы" },
  { id: "active", label: "Активные" },
  { id: "archived", label: "В архиве" },
] as const;

export const workspaceSortOptions = [
  { id: "date", label: "Дата создания" },
  { id: "name", label: "Название" },
  { id: "price", label: "Цена" },
  { id: "rating", label: "Рейтинг" },
  { id: "popularity", label: "Популярность" },
] as const;

export const mockWorkspaceProducts: WorkspaceProduct[] = [
  {
    id: "1",
    title: "E-commerce Automation Suite",
    image: productCrypto,
    price: 75.0,
    author: { name: "Quavo Speaks" },
    rating: 4.8,
    reviewCount: 42,
    category: "Soft/Bot",
    status: "active",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Telegram Sneaker Bots / sneaker-parser",
    image: productTradingBot,
    price: 50.0,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Soft/Bot",
    status: "active",
    createdAt: "2025-01-10",
  },
  {
    id: "3",
    title: "All-in-One Analytics Dashboard",
    image: productSoftware,
    price: 10.0,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Цифровой материал",
    status: "archived",
    createdAt: "2024-12-20",
  },
  {
    id: "4",
    title: "Social Media Scheduler Pro",
    image: productWealth,
    price: 35.0,
    author: { name: "Quavo Speaks" },
    rating: 4.5,
    reviewCount: 28,
    category: "Курс",
    status: "active",
    createdAt: "2025-01-05",
  },
  {
    id: "5",
    title: "Crypto Trading Signals Bot",
    image: productCrypto,
    price: 120.0,
    author: { name: "Quavo Speaks" },
    rating: 4.9,
    reviewCount: 156,
    category: "Soft/Bot",
    status: "active",
    createdAt: "2025-01-20",
  },
  {
    id: "6",
    title: "NFT Collection Generator",
    image: productTradingBot,
    price: 45.0,
    author: { name: "Quavo Speaks" },
    rating: 4.2,
    reviewCount: 31,
    category: "Цифровой материал",
    status: "archived",
    createdAt: "2024-11-15",
  },
];
