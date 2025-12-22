import { baseApi } from "./baseApi";
import { mockLearningItems, learningCategories } from "@/data/learning";
import { getLessonDetails } from "@/data/details";
import type { LearningItem } from "@/types";
import type { LessonDetails } from "@/types/details";

interface LearningQueryArgs {
  tab?: string;
}

interface LearningResponse {
  items: LearningItem[];
  categories: string[];
}

export const learningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get learning items with optional tab filtering
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

    // Get single lesson details
    getLessonDetails: builder.query<LessonDetails, string>({
      queryFn: (id) => {
        const lesson = getLessonDetails(id);
        return { data: lesson };
      },
      providesTags: (_result, _error, id) => [{ type: "Learning", id }],
    }),
  }),
});

export const {
  useGetLearningItemsQuery,
  useGetLessonDetailsQuery,
} = learningApi;
