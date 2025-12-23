import { useParams } from "react-router-dom";
import { useGetLessonDetailsQuery } from "@/store";
import { LearningDetailTemplate } from "@/components/templates";

export default function LearningDetail() {
  const { id } = useParams();
  const { data: lesson, isLoading } = useGetLessonDetailsQuery(id || "1");

  return <LearningDetailTemplate lesson={lesson} isLoading={isLoading} />;
}
