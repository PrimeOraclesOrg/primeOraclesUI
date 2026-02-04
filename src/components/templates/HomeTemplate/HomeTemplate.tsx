import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { RewardCard, ProductCard, FAQAccordion } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import type { Reward, Product } from "@/types";
import { BrandLogo } from "@/assets/icons";
import { SpotLight } from "@/assets/graphics/SpotLight";
import { SpotLightShoe } from "@/assets/graphics/SpotLightShoe";

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
      <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center overflow-hidden">
        {/* Hero Section */}
        <div className="flex items-center relative mb-36 gap-x-6 mt-32 z-[1] w-full max-w-screen-2xl">
          <div className="w-max z-10">
            <h1 className="flex flex-col items-start leading-[120px] text-[120px] font-Bebas_Neue text-light-accent tracking-wider mb-4">
              <span>PRIME</span>
              <span className="text-[130px]">ORACLES</span>
            </h1>
            <p className="text-base font-Russo_One md:text-2xl opacity-75">
              Зарабатывай на контенте и цифровых
              <br />
              продуктах без команды, без рисков и без
              <br />
              ручной возни
            </p>
            <Button
              variant="outline"
              className="mt-5 border-light-accent rounded-sm text-light-accent hover:bg-primary hover:text-primary-foreground px-6 text-lg font-bold py-3"
              onClick={onCreateClick}
            >
              Создать компанию
            </Button>
          </div>
          <img
            className="w-full h-full min-w-0 max-w-[950px] flex-1 scale z-10"
            src="/img/illustrations/home_hero_cover.avif"
            alt="Hero cover"
          />

          {/* Graphics */}
          <img
            className="absolute bottom-0 translate-y-8 left-0"
            src="/img/illustrations/hero_graphics.avif"
            alt="Hero graphics"
          />

          <SpotLight className="text-accent absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          <SpotLightShoe className="text-white absolute -right-96 top-1/2 -translate-y-[calc(50%-10em)] pointer-events-none" />
        </div>

        {/* Content Rewards Info Section */}
        <div className="md:grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 mb-10 md:mb-16 flex flex-col max-w-[1280px] w-full bg-card p-4 rounded-xl items-center inset-shadow-white">
          <div className="md:col-span-2 h-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-light-accent mb-4">
              Награды за контент
            </h2>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Это маркетинговый инструмент, который связывает ваш бренд с<br />
              создателями контента — Они создают контент, публикуют его в своих социальных сетях, а
              <br />
              вы платите им за просмотры
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
        <div className="text-center max-w-4xl mx-auto text-xl mb-10">
          <p className="leading-relaxed">
            Prime Oracles — место, где можно запустить и монетизировать любой цифровой продукт: от
            веб-приложений и автоматизаций до обучающих программ и закрытых комьюнити.
            <br />
            Всё — в одном удобном интерфейсе.
          </p>
        </div>

        {/* FAQ */}
        <div className="w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">
            Вопросы которые могут возникнуть:
          </h2>
          <FAQAccordion
            questions={[
              {
                position: 1,
                question: "Вопрос 1",
                answer: "Ответ 1",
              },
              {
                position: 2,
                question: "Вопрос 2",
                answer: "Ответ 2",
              },
              {
                position: 3,
                question: "Вопрос 3",
                answer: "Ответ 3",
              },
              {
                position: 4,
                question: "Вопрос 4",
                answer: "Ответ 4",
              },
              {
                position: 5,
                question: "Вопрос 5",
                answer: "Ответ 5",
              },
            ]}
          />
        </div>

        {/* Income banner */}
        <section className="relative flex flex-col items-center justify-evenly overflow-hidden rounded-sm bg-[#5E25BC] p-xl z-[1] sm:flex-row sm:p-0 min-h-[410px] w-full">
          <img
            className="absolute inset-0 h-full w-full object-cover z-[-1]"
            src="/img/bg/pattern_1.png"
            alt="background pattern"
            width={1440}
            height={410}
          />

          <img
            className="w-[185px] h-[185px] object-contain sm:w-[259px] sm:h-[259px] lg:w-[370px] lg:h-[370px] transition-transform"
            src="/img/illustrations/hand_cash.avif"
            alt="hand with cash"
            width={370}
            height={370}
          />

          <div className="flex flex-col items-center gap-xl text-center scale-75 sm:scale-70 lg:scale-100 transition-transform">
            <h2 className="font-[Oswald] text-3xl xl:text-5xl font-medium text-white mb-10">
              Наша миссия
              <br />
              обеспечить каждому доход
            </h2>
            <Button className="px-16 py-8 font-semibold bg-primary text-lg xl:text-xl">
              Присоединиться
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
