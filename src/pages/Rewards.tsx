import { MainLayout } from "@/components/MainLayout";
import { RewardCard } from "@/components/RewardCard";
import { Button } from "@/components/ui/button";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const rewardsData = [
  {
    logo: "M",
    name: "Mellstroy game",
    rate: "$3.50/1K",
    description: "Получайте деньги за просмотры вирусного контента...",
    paidAmount: "43,795.5$",
    totalAmount: "50,000$",
    progress: 88,
    category: "Личный бренд",
    type: "UGS",
    views: "12,513,023",
    socialNetworks: ["instagram", "youtube", "tiktok"],
  },
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
  {
    logo: "A",
    name: "Axiom trade",
    rate: "$4.00/1K",
    description: "Создавайте вовлекающий контент про нашу пл...",
    paidAmount: "0$",
    totalAmount: "12,000$",
    progress: 0,
    category: "Личный бренд",
    type: "UGS",
    views: "0",
    socialNetworks: ["instagram", "youtube", "x"],
  },
  {
    logo: "Г",
    name: "Галактус",
    rate: "$0.20/1K",
    description: "Нарезки с шоу 50 хейтеров, просмотры считаю...",
    paidAmount: "80.5$",
    totalAmount: "1,000$",
    progress: 21,
    category: "Личный бренд",
    type: "Клип",
    views: "1,113,023",
    socialNetworks: ["tiktok", "youtube", "vk"],
  },
  {
    logo: "Q",
    name: "Quack Game",
    rate: "$2.50/1K",
    description: "Делайте обзоры на наше приложение и полу...",
    paidAmount: "29,795.5$",
    totalAmount: "30,000$",
    progress: 98,
    category: "Личный бренд",
    type: "UGS",
    views: "9,513,023",
    socialNetworks: ["instagram", "youtube"],
  },
  {
    logo: "E",
    name: "Evelone",
    rate: "$2.50/1K",
    description: "Нарезки со стримов и видео на ютубе",
    paidAmount: "32,795.5$",
    totalAmount: "50,000$",
    progress: 65,
    category: "Личный бренд",
    type: "UGS",
    views: "12,513,023",
    socialNetworks: ["youtube", "tiktok"],
  },
  {
    logo: "M",
    name: "Macan",
    rate: "$0.10/1K",
    description: 'Создавайте видео под звук "название"',
    paidAmount: "25,000.5$",
    totalAmount: "50,000$",
    progress: 50,
    category: "Музыка",
    type: "Клип",
    views: "120,513,023",
    socialNetworks: ["instagram", "youtube", "tiktok"],
  },
  {
    logo: "Е",
    name: "Евроторг Бонстики 7",
    rate: "$0.50/1K",
    description: "Описание",
    paidAmount: "43,795.5$",
    totalAmount: "50,000$",
    progress: 88,
    category: "Продукт",
    type: "UGS",
    views: "12,513,023",
    socialNetworks: ["instagram", "youtube"],
  },
];

export default function Rewards() {
  return (
    <MainLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Награды за контент
            </h1>
            <p className="text-muted-foreground">
              Публикуйте контент в социальных сетях и получайте вознаграждение за
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Info className="w-4 h-4" />
              Подробнее
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Создать компанию
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            43 Доступных наград за контент
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Категории:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[100px] h-8 bg-card border-border">
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="brand">Личный бренд</SelectItem>
                  <SelectItem value="product">Продукт</SelectItem>
                  <SelectItem value="music">Музыка</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Тип:</span>
              <Select defaultValue="clip">
                <SelectTrigger className="w-[100px] h-8 bg-card border-border">
                  <SelectValue placeholder="Клип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="clip">Клип</SelectItem>
                  <SelectItem value="ugs">UGS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Сортировать по:</span>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-[140px] h-8 bg-card border-border">
                  <SelectValue placeholder="Популярности" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Популярности</SelectItem>
                  <SelectItem value="newest">Новизне</SelectItem>
                  <SelectItem value="rate">Ставке</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {rewardsData.map((reward, index) => (
            <RewardCard key={index} {...reward} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "ghost"}
              size="icon"
              className="w-8 h-8"
            >
              {page}
            </Button>
          ))}
          <span className="px-2 text-muted-foreground">...</span>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            37
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
