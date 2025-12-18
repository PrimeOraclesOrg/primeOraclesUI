import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { RatingStars } from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import productCrypto from "@/assets/product-crypto.jpg";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
  {
    id: "2",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
  {
    id: "3",
    author: "Михаил Грибенюк",
    rating: 5,
    text: "Отличное приложение, жаль, что я до сих пор не до конца его понимаю, но я разберусь в нем лучше.",
    date: "1 День назад",
  },
];

const faqs = [
  { id: "1", question: "Вопрос 1", answer: "Ответ на первый вопрос будет здесь." },
  { id: "2", question: "Вопрос 2", answer: "Ответ на второй вопрос будет здесь." },
  { id: "3", question: "Вопрос 3", answer: "Ответ на третий вопрос будет здесь." },
];

const ratingDistribution = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data
  const product = {
    id,
    title: "Закрытый клуб предпринимателей",
    subtitle: "Феномен КОФЕМАНИИ",
    description: "Описание продукта будет здесь. Это подробная информация о том, что входит в данный продукт и какие преимущества вы получите при покупке.",
    image: productCrypto,
    price: 100,
    author: {
      name: "Михаил Грибенюк",
      avatar: undefined,
    },
    rating: 4.67,
    reviewCount: 51,
    memberCount: 271,
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mb-6 bg-primary/10 px-3 py-1.5 rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад
        </button>

        {/* Product Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Product Image */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-card">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="relative -mt-20 p-4">
                <div className="text-primary font-bold italic text-lg">{product.subtitle}</div>
                <div className="text-foreground text-xs uppercase tracking-wider mt-1">
                  ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">М</span>
                  </div>
                  <span className="text-foreground font-medium">{product.author.name}</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <RatingStars rating={product.rating} size="md" />
                  <span className="text-primary">({product.reviewCount})</span>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity w-full lg:w-auto px-8">
                Купить за {product.price}$
              </Button>
              <span className="text-sm text-muted-foreground">
                Присоединяйтесь к {product.memberCount} участнику
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Отзывы</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Rating Summary */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <RatingStars rating={product.rating} size="lg" showNumber={false} />
                <span className="text-lg font-semibold text-foreground">
                  {product.rating.toFixed(2)} из 5
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {product.reviewCount} Всего отзывов
              </p>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-16">
                      {item.stars} {item.stars === 1 ? "Звезда" : item.stars < 5 ? "Звезды" : "Звезд"}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="flex-1 space-y-4">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="surface-card p-4 animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium">М</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{review.author}</div>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            Часто задаваемые вопросы:
          </h2>

          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border">
                <AccordionTrigger className="text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </MainLayout>
  );
}
