import type { Product } from "@/types";

import productCrypto from "@/assets/product-crypto.jpg";
import productWealth from "@/assets/product-wealth.jpg";
import productTradingBot from "@/assets/product-trading-bot.jpg";
import productSoftware from "@/assets/product-software.jpg";

export const productCategories = ["Все", "Софты/боты", "Сообщества", "Обучения", "Цифровые материалы"];

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "№1 комьюнити по торговле криптовалютой",
    image: productWealth,
    price: "free",
    author: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    reviewCount: 421,
    category: "Сообщества",
  },
  {
    id: "2",
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%",
    image: productCrypto,
    price: 230,
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    category: "Обучения",
  },
  {
    id: "3",
    title: "Продажа торгового бота на форексе",
    image: productTradingBot,
    price: "free",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    category: "Софты/боты",
  },
  {
    id: "4",
    title: "Аренда Adobe Photoshop +",
    image: productSoftware,
    price: 10,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Цифровые материалы",
  },
  {
    id: "5",
    title: "№1 комьюнити по торговле криптовалютой",
    image: productWealth,
    price: "free",
    author: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    reviewCount: 421,
    category: "Сообщества",
  },
  {
    id: "6",
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%",
    image: productCrypto,
    price: 230,
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    category: "Обучения",
  },
  {
    id: "7",
    title: "Продажа торгового бота на форексе",
    image: productTradingBot,
    price: "free",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    category: "Софты/боты",
  },
  {
    id: "8",
    title: "Аренда Adobe Photoshop +",
    image: productSoftware,
    price: 10,
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    category: "Цифровые материалы",
  },
];

// Products for home page
export const homePageProducts: Product[] = [
  {
    id: "1",
    image: productCrypto,
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%🚀",
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    price: 230.0,
    category: "Крипто",
  },
  {
    id: "2",
    image: productTradingBot,
    title: "Продажа торгового бота на форексе",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    price: "free",
    category: "Торговля",
  },
  {
    id: "3",
    image: productSoftware,
    title: "Аренда Adobe Photoshop + AI",
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    price: 10.0,
    category: "Софт",
  },
  {
    id: "5",
    title: "№1 комьюнити по торговле криптовалютой",
    image: productWealth,
    price: "free",
    author: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    reviewCount: 421,
    category: "Сообщества",
  },
];
