import { MainLayout } from "@/components/MainLayout";
import { RewardCard } from "@/components/RewardCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetHomeRewardsQuery, useGetHomeProductsQuery } from "@/store";

export default function Home() {
  const { data: rewardsData } = useGetHomeRewardsQuery();
  const { data: marketplaceProducts = [] } = useGetHomeProductsQuery();

  const featuredRewards = rewardsData?.featuredRewards ?? [];
  const bottomRewards = rewardsData?.bottomRewards ?? [];
  const sideReward = rewardsData?.sideReward;

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-wider mb-4">
            PRIME ORACLES
          </h1>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Все необходимые инструменты для роста — в одном месте.
          </p>
        </div>

        {/* Featured Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
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
        <div className="flex justify-center mb-10 md:mb-16">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 md:px-8 py-3"
          >
            Создать компанию
          </Button>
        </div>

        {/* Content Rewards Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 md:mt-8">
              {bottomRewards.map((reward, i) => (
                <RewardCard key={i} {...reward} />
              ))}
            </div>
          </div>
          {sideReward && (
            <div className="lg:block hidden">
              <RewardCard {...sideReward} />
            </div>
          )}
        </div>

        {/* Marketplace Section */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">
            Маркетплейс
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
