import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLearningItemsQuery } from "@/store";
import { LearningTemplate } from "@/components/templates";

export default function Learning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Старт на Prime Oracles");
  
  const { data } = useGetLearningItemsQuery({ tab: activeTab });
  const items = data?.items ?? [];
  const categories = data?.categories ?? [];

  return (
    <LearningTemplate
      items={items}
      categories={categories}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onItemClick={(id) => navigate(`/learning/${id}`)}
    />
  );
}
