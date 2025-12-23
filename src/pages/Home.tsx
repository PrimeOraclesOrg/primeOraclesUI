import { useGetHomeRewardsQuery, useGetHomeProductsQuery } from "@/store";
import { HomeTemplate } from "@/components/templates";

export default function Home() {
  const { data: rewardsData } = useGetHomeRewardsQuery();
  const { data: marketplaceProducts = [] } = useGetHomeProductsQuery();

  const featuredRewards = rewardsData?.featuredRewards ?? [];
  const bottomRewards = rewardsData?.bottomRewards ?? [];
  const sideReward = rewardsData?.sideReward;

  return (
    <HomeTemplate
      featuredRewards={featuredRewards}
      bottomRewards={bottomRewards}
      sideReward={sideReward}
      marketplaceProducts={marketplaceProducts}
      onCreateClick={() => {}}
    />
  );
}
