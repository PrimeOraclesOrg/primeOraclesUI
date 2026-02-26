import { LoadingScreen } from "@/components/atoms";
import { useUpdateProduct } from "./useUpdateProduct";
import { UpdateProductTemplate } from "@/components/templates";

export function UpdateProduct() {
  const {
    updateProductForm,
    isProductLoading,
    profile,
    categories,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
  } = useUpdateProduct();

  if (isProductLoading) return <LoadingScreen />;

  return (
    <UpdateProductTemplate
      categories={categories}
      author={profile}
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
      isDataChanged={updateProductForm.formState.isDirty}
    />
  );
}
