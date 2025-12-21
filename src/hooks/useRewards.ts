import { useMemo } from "react";
import { mockRewards, featuredRewards, bottomRewards, sideReward } from "@/data/rewards";
import type { Reward } from "@/types";

export function useRewards(category?: string, type?: string) {
  const rewards = useMemo(() => {
    let filtered = [...mockRewards];
    
    if (category && category !== "all") {
      filtered = filtered.filter((r) => r.category.toLowerCase().includes(category.toLowerCase()));
    }
    
    if (type && type !== "all") {
      filtered = filtered.filter((r) => r.type.toLowerCase() === type.toLowerCase());
    }
    
    return filtered;
  }, [category, type]);

  return {
    rewards,
    isLoading: false,
    error: null,
  };
}

export function useHomeRewards() {
  return {
    featuredRewards,
    bottomRewards,
    sideReward,
    isLoading: false,
    error: null,
  };
}
