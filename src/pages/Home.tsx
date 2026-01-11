import { useNavigate } from "react-router-dom";
import { useGetHomeRewardsQuery, useGetHomeProductsQuery } from "@/store";
import { HomeTemplate } from "@/components/templates";

export default function Home() {
  const navigate = useNavigate();
  const { data: rewardsData } = useGetHomeRewardsQuery();
  const { data: marketplaceProducts = [] } = useGetHomeProductsQuery();

  const rewards = rewardsData?.homeRewardsPreview ?? [];

  const handleCreateClick = () => {
    navigate("/create-product");
  };

  return (
    <HomeTemplate
      rewardsPreview={rewards}
      productsPreview={marketplaceProducts}
      onCreateClick={handleCreateClick}
    />
  );
}
