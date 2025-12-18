import { MainLayout } from "@/components/MainLayout";
import { RewardCard } from "@/components/RewardCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import productCrypto from "@/assets/product-crypto.jpg";
import productTradingBot from "@/assets/product-trading-bot.jpg";
import productSoftware from "@/assets/product-software.jpg";

const featuredRewards = [
  {
    logo: "С",
    name: "Стив Хоук",
    rate: "$2.50/1K",
    description: "Делайте нарезки с моего подкаста.",
    paidAmount: "1,395.5$",
    totalAmount: "3,000$",
    progress: 43,
    category: "Личный бренд",
    type: "Клип",
    views: "213,023",
    socialNetworks: ["instagram", "youtube", "tiktok", "vk"],
  },
  {
    logo: "А",
    name: "Александр Соколов...",
    rate: "$2.00/1K",
    description: "Создавайте мотивационные ролики с участ...",
    paidAmount: "6,795.5$",
    totalAmount: "10,000$",
    progress: 78,
    category: "Личный бренд",
    type: "Клип",
    views: "1,513,023",
    socialNetworks: ["instagram", "youtube"],
  },
];

const bottomRewards = [
  {
    logo: "E",
    name: "Eleps",
    rate: "$2.50/1K",
    description: "Нарезки со стримов и видео на ютубе",
    paidAmount: "32,795.5$",
    totalAmount: "50,000$",
    progress: 65,
    category: "Категория",
    type: "Тип",
    views: "",
    socialNetworks: ["instagram", "youtube", "tiktok"],
  },
  {
    logo: "А",
    name: "Александр Соколов...",
    rate: "$2.00/1K",
    description: "Создавайте мотивационные ролики с участ...",
    paidAmount: "6,795.5$",
    totalAmount: "10,000$",
    progress: 78,
    category: "Категория",
    type: "Тип",
    views: "",
    socialNetworks: ["instagram", "youtube"],
  },
  {
    logo: "Q",
    name: "Quaks Nod",
    rate: "$2.50/1K",
    description: "Делайте обзоры на наше приложение и полу..",
    paidAmount: "29,795.5$",
    totalAmount: "30,000$",
    progress: 78,
    category: "Категория",
    type: "Тип",
    views: "",
    socialNetworks: ["instagram", "youtube"],
  },
];

const sideReward = {
  logo: "U",
  name: "Unblox Game",
  rate: "$3.50/1K",
  description: "Получайте деньги за просмотры вирусного конт...",
  paidAmount: "43,795.5$",
  totalAmount: "50,000$",
  progress: 88,
  category: "Личный бренд",
  type: "UGS",
  views: "12,513,023",
  socialNetworks: ["instagram", "youtube", "tiktok"],
};

const marketplaceProducts = [
  {
    id: "1",
    image: productCrypto,
    title: "Криптовалютная торговая стратегия, которая работает с Точность 98%🚀",
    author: { name: "Crypto Auto Pump Signals Pro" },
    rating: 5.0,
    reviewCount: 145,
    price: 230.0 as number | "free",
    category: "Крипто",
  },
  {
    id: "2",
    image: productTradingBot,
    title: "Продажа торгового бота на форексе",
    author: { name: "The Haven Free" },
    rating: 4.1,
    reviewCount: 521,
    price: "free" as number | "free",
    category: "Торговля",
  },
  {
    id: "3",
    image: productSoftware,
    title: "Аренда Adobe Photoshop + AI",
    author: { name: "Quavo Speaks" },
    rating: 5.0,
    reviewCount: 19,
    price: 10.0 as number | "free",
    category: "Софт",
  },
];

export default function Home() {
  return (
    <MainLayout>
      <div className="p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary tracking-wider mb-4">
            PRIME ORACLES
          </h1>
          <p className="text-muted-foreground text-lg">
            Все необходимые инструменты для роста — в одном месте.
          </p>
        </div>

        {/* Featured Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Награда за контент preview */}
          <Link
            to="/rewards"
            className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors group overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
              {featuredRewards.map((reward, i) => (
                <div
                  key={i}
                  className="bg-background/50 border border-border rounded-lg p-3 text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                        {reward.logo}
                      </div>
                      <span className="font-medium text-foreground truncate text-xs">
                        {reward.name}
                      </span>
                    </div>
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
                      {reward.rate}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[10px] mb-2 line-clamp-1">
                    {reward.description}
                  </p>
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>
                      Выплачено {reward.paidAmount} из {reward.totalAmount}
                    </span>
                    <span>{reward.progress}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${reward.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="relative z-10 text-center">
              <h3 className="text-xl font-bold text-foreground">
                Награда за контент
              </h3>
            </div>
          </Link>

          {/* Маркетплейс preview */}
          <Link
            to="/marketplace"
            className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors group overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
              {marketplaceProducts.slice(0, 2).map((product, i) => (
                <div
                  key={i}
                  className="bg-background/50 border border-border rounded-lg overflow-hidden"
                >
                  <div className="h-20 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-foreground line-clamp-2 mb-1">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="text-primary">★</span>
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            <div className="relative z-10 text-center">
              <h3 className="text-xl font-bold text-foreground">Маркетплейс</h3>
            </div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
          >
            Создать компанию
          </Button>
        </div>

        {/* Content Rewards Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              <span className="text-primary font-semibold">
                Награды за контент
              </span>
              — это маркетинговый инструмент, который связывает ваш бренд с
              создателями контента — Они создают контент, публикуют его в своих
              социальных сетях, а вы платите им за просмотры
            </p>
            <p className="text-muted-foreground">
              Но только после того, как одобрите их публикацию.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {bottomRewards.map((reward, i) => (
                <RewardCard key={i} {...reward} />
              ))}
            </div>
          </div>
          <div>
            <RewardCard {...sideReward} />
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Маркетплейс
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketplaceProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            Prime Oracles — место, где можно запустить и монетизировать любой
            цифровой продукт: от веб-приложений и автоматизаций до обучающих
            программ и закрытых комьюнити.
            <br />
            Всё — в одном удобном интерфейсе.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
