import { LoadingScreen } from "@/components/atoms";
import { useUpdateProduct } from "./useUpdateProduct";
import { UpdateProductTemplate } from "@/components/templates";

export default function UpdateProduct() {
  const {
    updateProductForm,
    isProductLoading,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
    author,
  } = useUpdateProduct();

  if (isProductLoading) return <LoadingScreen />;

  return (
    <UpdateProductTemplate
      author={author}
      form={updateProductForm}
      previewMode="desktop"
      onBackClick={handleBackClick}
      onMediaUpload={handleMediaUpload}
      onMediaRemove={handleMediaRemove}
      onAddAdvantage={handleAddAdvantage}
      onRemoveAdvantage={handleRemoveAdvantage}
      onAddFaq={handleAddFaq}
      onRemoveFaq={handleRemoveFaq}
      onSubmit={updateProductForm.handleSubmit(onSubmit)}
    />
  );
}
