import { baseApi } from "./baseApi";
import { homeRewardsPreview, mockRewards } from "@/data/rewards";
import type { Reward } from "@/types";

interface RewardsQueryArgs {
  category?: string;
  type?: string;
}

interface HomeRewardsResponse {
  homeRewardsPreview: Reward[];
}

export const rewardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRewards: builder.query<Reward[], RewardsQueryArgs>({
      queryFn: ({ category, type }) => {
        let filtered = [...mockRewards];

        if (category && category !== "all") {
          filtered = filtered.filter((r) =>
            r.category.toLowerCase().includes(category.toLowerCase())
          );
        }

        if (type && type !== "all") {
          filtered = filtered.filter((r) => r.type.toLowerCase() === type.toLowerCase());
        }

        return { data: filtered };
      },
      providesTags: ["Rewards"],
    }),

    getHomeRewards: builder.query<HomeRewardsResponse, void>({
      queryFn: () => {
        return {
          data: {
            homeRewardsPreview,
          },
        };
      },
      providesTags: ["Rewards"],
    }),
  }),
});

export const { useGetRewardsQuery, useGetHomeRewardsQuery } = rewardsApi;
