import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { CreateProductForm } from "@/components/organisms/CreateProductForm/CreateProductForm";
import { ProductPreview } from "@/components/organisms/ProductPreview/ProductPreview";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import { FullProfile, ProductCategory } from "@/types";
import { UpdateProductForm } from "@/components/organisms";

type PreviewMode = "desktop" | "mobile";

interface UpdateProductTemplateProps {
  form: UseFormReturn<CreateProductFormData>;
  previewMode: PreviewMode;
  author: FullProfile;
  categories: Array<ProductCategory>;
  wasDataChanged: boolean;
  onBackClick: () => void;
  onMediaUpload: (file: File) => void;
  onMediaRemove: () => void;
  onAddAdvantage: () => void;
  onRemoveAdvantage: (position: number) => void;
  onAddFaq: () => void;
  onRemoveFaq: (position: number) => void;
  onSubmit: () => void;
}

export function UpdateProductTemplate({
  form,
  previewMode: initialPreviewMode,
  author,
  categories,
  wasDataChanged,
  onBackClick,
  onMediaUpload,
  onMediaRemove,
  onAddAdvantage,
  onRemoveAdvantage,
  onAddFaq,
  onRemoveFaq,
  onSubmit,
}: UpdateProductTemplateProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>(initialPreviewMode);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Header with back button */}
        <div className="p-4 md:p-6 md:border-b md:border-border">
          <button
            onClick={onBackClick}
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
            Назад
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Form Column */}
          <div className="w-full lg:w-1/2 overflow-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">Обновить продукт</h1>
            <UpdateProductForm
              categories={categories}
              form={form}
              onMediaUpload={onMediaUpload}
              onMediaRemove={onMediaRemove}
              onAddAdvantage={onAddAdvantage}
              onRemoveAdvantage={onRemoveAdvantage}
              onAddFaq={onAddFaq}
              onRemoveFaq={onRemoveFaq}
              onSubmit={onSubmit}
              wasDataChanged={wasDataChanged}
            />
          </div>

          {/* Preview Column - Hidden on mobile */}
          <div className="hidden lg:flex lg:w-1/2 border-l border-border p-6 bg-secondary/30">
            <div className="w-full">
              <ProductPreview
                categories={categories}
                author={author}
                data={form.watch()}
                mode={previewMode}
                onModeChange={setPreviewMode}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
