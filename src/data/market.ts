import { MarketSortOptions } from "@/types/market";

export const marketSortOptions: { id: MarketSortOptions; label: string }[] = [
  { id: "popularity_desc", label: "По популярности" },
  { id: "title_asc", label: "По названию" },
  { id: "rating_desc", label: "По рейтингу" },
  { id: "price_asc", label: "Дешевые сверху" },
  { id: "price_desc", label: "Дорогие сверху" },
];
