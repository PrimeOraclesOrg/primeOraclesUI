import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { RewardCard, ProductCard, FAQAccordion } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import type { Reward, Product } from "@/types";
import { SpotLightShape } from "@/assets/graphics/SpotLightShape";
import { SpotLightShoeShape } from "@/assets/graphics/SpotLightShoeShape";
import { SpotLightDiskShape } from "@/assets/graphics/SpotLightDiskShape";
import { ArrowRight } from "lucide-react";

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
        <div className="flex items-center relative mb-36 gap-6 min-[720px]:mt-20 z-[1] w-full max-w-screen-2xl min-[720px]:flex-row flex-col">
          <div className="w-max max-w-full z-10">
            <h1 className="flex min-[720px]:flex-col gap-x-4 flex-wrap items-start text-6xl min-[280px]:text-7xl xl:text-8xl min-[1660px]:text-[120px] font-Bebas_Neue text-light-accent tracking-wider mb-4">
              <span>PRIME</span>
              <span className="min-[1660px]:text-[130px]">ORACLES</span>
            </h1>
            <p className="text-foreground font-Russo_One text-sm min-[440px]:text-md sm:text-lg xl:text-xl min-[1660px]:text-2xl opacity-75">
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
            className="min-[1300px]:w-full min-w-0 max-w-[min(900px,100%)] right-0 -z-10 flex-1 min-[900px]:static lg:absolute w-[480px] -top-24 min-[1220px]:static min-[720px]:absolute"
            src="/img/illustrations/home_hero_cover.avif"
            alt="Hero cover"
          />

          {/* Graphics */}
          <img
            className="absolute bottom-0 translate-y-8 left-0 -z-20"
            src="/img/illustrations/hero_graphics.avif"
            alt="Hero graphics"
          />

          <SpotLightShape className="text-accent absolute right-[25vw] max-w-[28vw] w-[400px] h-[400px] top-1/2 -translate-y-1/2 pointer-events-none blur-[128px] opacity-60 -z-20" />
          <SpotLightShoeShape className="text-white absolute right-0 max-w-[25vw] top-1/2 -translate-y-[calc(50%-8em)] pointer-events-none blur-[128px] opacity-20 -z-20" />
        </div>

        {/* Content Rewards Info Section */}
        <div className="md:grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2 mb-10 md:mb-16 flex flex-col max-w-[1280px] w-full bg-card px-4 sm:px-6 py-4 rounded-xl items-center shadow-inner-glass">
          <div className="md:col-span-2 h-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-light-accent my-4">
              Награды за контент
            </h2>
            <p className="sm:text-lg text-foreground leading-relaxed mb-6 font-Roboto mr-6">
              Это маркетинговый инструмент, который связывает ваш бренд с создателями контента — Они
              создают контент, публикуют его в своих социальных сетях, а вы платите им за просмотры
            </p>
            <p className="text-muted-foreground font-Roboto">
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

        <div className="mb-10 relative">
          <h2 className="text-4xl font-bold text-center">
            Запускайте и монетизируйте{" "}
            <span className="text-accent">
              любой
              <br />
              цифровой продукт
            </span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mt-4">
            От веб-приложений и автоматизаций до обучающих программ и закрытых
            <br />
            комьюнити — всё в одном месте
          </p>
          <SpotLightDiskShape className="text-white blur-[128px] opacity-5 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
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
                question: "Как начать зарабатывать на контенте?",
                answer: "Ответ 1",
              },
              {
                position: 2,
                question: "Какие способы оплаты поддерживаются?",
                answer: "Ответ 2",
              },
              {
                position: 3,
                question: "Как продать свой продукт на маркетплейсе?",
                answer: "Ответ 3",
              },
              {
                position: 4,
                question: "Есть ли комиссия платформы?",
                answer: "Ответ 4",
              },
            ]}
          />
        </div>

        {/* Income banner */}
        <section className="relative flex flex-col items-center rounded-sm md:flex-row bg-gradient-to-br from-[#5E25BC] via-[#7B3FD4] to-[#5E25BC] z-[1] max-w-[1496px] w-full py-8 px-2 overflow-hidden">
          <img
            className="w-[185px] h-[185px] xl:w-[400px] xl:h-[400px] object-contain sm:w-[259px] sm:h-[259px] transition-transform md:-translate-x-10 md:translate-y-8"
            src="/img/illustrations/hand_cash.avif"
            alt="hand with cash"
            width={400}
            height={400}
          />

          <div className="flex flex-col items-start p-4 md:p-0 gap-5">
            <h2 className="font-[Oswald] text-3xl xl:text-4xl 2xl:text-5xl font-medium text-white">
              Наша миссия — обеспечить каждому доход
            </h2>
            <p className="opacity-70 sm:text-xl">
              Присоединяйтесь к тысячам пользователей, которые уже
              <br />
              зарабатывают
            </p>
            <Button className="px-4 py-6 mt-2 font-semibold bg-primary text-lg [&_svg]:size-8">
              Присоединиться <ArrowRight strokeWidth={1} />
            </Button>
          </div>

          <SpotLightShape className="absolute text-light-accent blur-2xl -z-10 left-1/2 opacity-25" />
        </section>
      </div>
    </MainLayout>
  );
}
