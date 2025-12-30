import { useGetHomeRewardsQuery, useGetHomeProductsQuery } from "@/store";
import { HomeTemplate } from "@/components/templates";

export default function Home() {
  const { data: rewardsData } = useGetHomeRewardsQuery();
  const { data: marketplaceProducts = [] } = useGetHomeProductsQuery();

  const rewards = rewardsData?.homeRewardsPreview ?? [];

  return (
    <HomeTemplate
      rewardsPreview={rewards}
      productsPreview={marketplaceProducts}
      onCreateClick={() => {}}
    />
  );
}
