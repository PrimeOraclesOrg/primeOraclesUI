import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { RewardCard, ProductCard } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Reward, Product } from "@/types";
import { BrandLogo } from "@/components/atoms";

interface FeaturedReward {
  logo: string;
  name: string;
  rate: string;
  description: string;
  paidAmount: string;
  totalAmount: string;
  progress: number;
}

interface HomeTemplateProps {
  rewardsPreview: Reward[];
  productsPreview: Product[];
  onCreateClick: () => void;
}

export function HomeTemplate({
  rewardsPreview,
  productsPreview,
  onCreateClick,
}: HomeTemplateProps) {
  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-7xl lg:text-7xl font-bold text-primary tracking-wider mb-4 mt-8 lg:mt-20">
            PRIME ORACLES
          </h1>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Все необходимые инструменты для роста — в одном месте.
          </p>
        </div>

        {/* Featured Sections */}
        <div className="flex justify-center items-center gap-8 flex-col md:flex-row w-full">
          {/* Награда за контент preview */}
          <Link
            to="/rewards"
            className="relative bg-card aspect-[490/280] rounded-xl p-6 border-2 border-primary transition-colors group overflow-hidden max-w-[540px] w-full"
          >
            <strong className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10 flex justify-center items-center p-4 bg-black/60 font-[Oswald] text-2xl backdrop-blur-none transition-all duration-300 text-[--size-l] group-hover:backdrop-blur-sm">Награды за контент</strong>
            <img
                className="absolute left-0 top-0 block w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:-rotate-1"
                src="/img/preview/tasks_preview.png"
                alt="rewards preview"
              />
          </Link>

          {/* Маркетплейс preview */}
          <Link
            to="/marketplace"
            className="relative bg-card aspect-[490/280] rounded-xl p-6 border-2 border-primary transition-colors group overflow-hidden max-w-[540px] w-full"
          >
            <strong className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10 flex justify-center items-center p-4 bg-black/60 font-[Oswald] text-2xl backdrop-blur-none transition-all duration-300 text-[--size-l] group-hover:backdrop-blur-sm">Маркетплейс</strong>
            <img
              className="absolute left-0 top-0 block w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:-rotate-1"
              src="/img/preview/market_preview.png"
              alt="market preview"
            />
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-10 md:mb-16 mt-8">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 md:px-8 py-3"
            onClick={onCreateClick}
          >
            Создать компанию
          </Button>
        </div>

        {/* Content Rewards Info Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">Награды за контент</h2>
        <div className="md:grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 mb-10 md:mb-16 flex flex-col max-w-[1280px] w-full bg-card p-4 rounded-xl items-center">
          <div className="md:col-span-2 h-full flex flex-col justify-center">
            <BrandLogo className="text-primary mb-4" />
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
          </div>
          {rewardsPreview.map((reward, i) => (
            <RewardCard key={i} reward={reward} />
          ))}
        </div>

        {/* Marketplace Section */}
        <div className="mb-10 md:mb-16 flex flex-col items-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">
            Маркетплейс
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 w-full max-w-6xl">
            {productsPreview.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center max-w-4xl mx-auto text-xl">
          <p className="leading-relaxed">
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
