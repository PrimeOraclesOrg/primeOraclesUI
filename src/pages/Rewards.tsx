import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRewardsQuery } from "@/store";
import { RewardsTemplate } from "@/components/templates";

export default function Rewards() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

  const { data: rewards = [] } = useGetRewardsQuery({ category, type });

  return (
    <RewardsTemplate
      rewards={rewards}
      currentPage={currentPage}
      totalPages={37}
      category={category}
      type={type}
      onCategoryChange={setCategory}
      onTypeChange={setType}
      onPageChange={setCurrentPage}
      onInfoClick={() => {}}
      onCreateClick={() => navigate("/create-product")}
    />
  );
}
