import { CreateProductTemplate } from "@/components/templates/CreateProductTemplate/CreateProductTemplate";
import { useCreateProduct } from "./useCreateProduct";

export default function CreateProduct() {
  const {
    createProductForm,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
  } = useCreateProduct();

  return (
    <CreateProductTemplate
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
