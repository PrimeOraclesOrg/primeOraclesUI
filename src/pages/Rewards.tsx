import { useState } from "react";
import { MainLayout } from "@/components/templates";
import { RewardCard, Pagination } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRewardsQuery } from "@/store";

export default function Rewards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

  const { data: rewards = [] } = useGetRewardsQuery({ category, type });

  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Награды за контент
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Публикуйте контент в социальных сетях и получайте вознаграждение
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Подробнее</span>
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <span className="hidden sm:inline">Создать компанию</span>
              <span className="sm:hidden">Создать</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <span className="text-sm text-muted-foreground">
            {rewards.length} Доступных наград за контент
          </span>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">Категории:</span>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[80px] md:w-[100px] h-8 bg-card border-border text-xs md:text-sm">
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
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">Тип:</span>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[80px] md:w-[100px] h-8 bg-card border-border text-xs md:text-sm">
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="клип">Клип</SelectItem>
                  <SelectItem value="ugs">UGS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">Сортировка:</span>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-[100px] md:w-[140px] h-8 bg-card border-border text-xs md:text-sm">
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
          {rewards.map((reward, index) => (
            <RewardCard key={index} {...reward} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={37}
          onPageChange={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
}
