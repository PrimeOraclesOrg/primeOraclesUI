import { CreateProductTemplate } from "@/components/templates/CreateProductTemplate/CreateProductTemplate";
import { useCreateProduct } from "./useCreateProduct";
import { LoadingScreen } from "@/components/atoms";

export default function CreateProduct() {
  const {
    createProductForm,
    categories,
    isCategoriesLoading,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
    author,
  } = useCreateProduct();

  if (isCategoriesLoading) return <LoadingScreen />;

  return (
    <CreateProductTemplate
      categories={categories}
      author={author}
      form={createProductForm}
      previewMode="desktop"
      onBackClick={handleBackClick}
      onMediaUpload={handleMediaUpload}
      onMediaRemove={handleMediaRemove}
      onAddAdvantage={handleAddAdvantage}
      onRemoveAdvantage={handleRemoveAdvantage}
      onAddFaq={handleAddFaq}
      onRemoveFaq={handleRemoveFaq}
      onSubmit={createProductForm.handleSubmit(onSubmit)}
    />
  );
}
