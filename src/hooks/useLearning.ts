import { useMemo } from "react";
import { mockLearningItems, learningCategories } from "@/data/learning";
import { getLessonDetails } from "@/data/details";

export function useLearning(tab?: string) {
  const items = useMemo(() => {
    if (!tab) return mockLearningItems;
    return mockLearningItems.filter((item) => item.tab === tab);
  }, [tab]);

  return {
    items,
    categories: learningCategories,
    isLoading: false,
    error: null,
  };
}

export function useLessonDetails(id: string) {
  const lesson = useMemo(() => getLessonDetails(id), [id]);
  
  return {
    lesson,
    isLoading: false,
    error: null,
  };
}
