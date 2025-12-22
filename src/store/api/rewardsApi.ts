import { baseApi } from "./baseApi";
import { mockRewards, featuredRewards, bottomRewards, sideReward } from "@/data/rewards";
import type { Reward } from "@/types";

interface RewardsQueryArgs {
  category?: string;
  type?: string;
}

interface HomeRewardsResponse {
  featuredRewards: Reward[];
  bottomRewards: Reward[];
  sideReward: Reward;
}

export const rewardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get rewards with optional filtering
    getRewards: builder.query<Reward[], RewardsQueryArgs>({
      queryFn: ({ category, type }) => {
        let filtered = [...mockRewards];

        if (category && category !== "all") {
          filtered = filtered.filter((r) =>
            r.category.toLowerCase().includes(category.toLowerCase())
          );
        }

        if (type && type !== "all") {
          filtered = filtered.filter((r) =>
            r.type.toLowerCase() === type.toLowerCase()
          );
        }

        return { data: filtered };
      },
      providesTags: ["Rewards"],
    }),

    // Get home page rewards
    getHomeRewards: builder.query<HomeRewardsResponse, void>({
      queryFn: () => {
        return {
          data: {
            featuredRewards,
            bottomRewards,
            sideReward,
          },
        };
      },
      providesTags: ["Rewards"],
    }),
  }),
});

export const {
  useGetRewardsQuery,
  useGetHomeRewardsQuery,
} = rewardsApi;
