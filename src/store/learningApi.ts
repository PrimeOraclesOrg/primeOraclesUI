import { baseApi } from "./baseApi";
import { mockLearningItems, learningCategories } from "@/data/learning";
import { getLessonDetails } from "@/data/details";
import type { LearningItem, LessonDetails } from "@/types";

interface LearningQueryArgs {
  tab?: string;
}

interface LearningResponse {
  items: LearningItem[];
  categories: string[];
}

export const learningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLearningItems: builder.query<LearningResponse, LearningQueryArgs>({
      queryFn: ({ tab }) => {
        let items = [...mockLearningItems];

        if (tab) {
          items = items.filter((item) => item.tab === tab);
        }

        return {
          data: {
            items,
            categories: learningCategories,
          },
        };
      },
      providesTags: ["Learning"],
    }),

    getLessonDetails: builder.query<LessonDetails, string>({
      queryFn: (id) => {
        const lesson = getLessonDetails(id);
        return { data: lesson };
      },
      providesTags: (_result, _error, id) => [{ type: "Learning", id }],
    }),
  }),
});

export const { useGetLearningItemsQuery, useGetLessonDetailsQuery } = learningApi;
