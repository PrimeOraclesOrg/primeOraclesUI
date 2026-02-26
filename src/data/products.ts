import { HomeProduct } from "@/types";
import productCrypto from "@/assets/product-crypto.jpg";
import productWealth from "@/assets/product-wealth.jpg";
import productTradingBot from "@/assets/product-trading-bot.jpg";
import productSoftware from "@/assets/product-software.jpg";

export const homePageProducts: HomeProduct[] = [
  {
    id: "1",
    cover_url: productCrypto,
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%🚀",
    creator: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    comments_count: 145,
    price: 230.0,
  },
  {
    id: "2",
    cover_url: productTradingBot,
    title: "Продажа торгового бота на форексе",
    creator: { name: "The Haven Free" },
    rating: 4.1,
    comments_count: 521,
    price: 0,
  },
  {
    id: "3",
    cover_url: productSoftware,
    title: "Аренда Adobe Photoshop + AI",
    creator: { name: "Quavo Speaks" },
    rating: 5.0,
    comments_count: 19,
    price: 10.0,
  },
  {
    id: "5",
    cover_url: productWealth,
    title: "№1 комьюнити по торговле криптовалютой",
    creator: { name: "Wealth Group Credit Card Pay" },
    rating: 4.95,
    comments_count: 421,
    price: 0,
  },
];
