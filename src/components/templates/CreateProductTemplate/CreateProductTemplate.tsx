import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { FormikProps } from "formik";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { CreateProductForm } from "@/components/organisms/CreateProductForm/CreateProductForm";
import { ProductPreview } from "@/components/organisms/ProductPreview/ProductPreview";
import type { CreateProductFormData } from "@/types/createProduct";

type PreviewMode = "desktop" | "mobile";

interface CreateProductTemplateProps {
  formik: FormikProps<CreateProductFormData>;
  previewMode: PreviewMode;
  onBackClick: () => void;
  onMediaUpload: (file: File) => void;
  onMediaRemove: () => void;
  onAddAdvantage: () => void;
  onRemoveAdvantage: (id: string) => void;
  onAddFaq: () => void;
  onRemoveFaq: (id: string) => void;
}

export function CreateProductTemplate({
  formik,
  previewMode: initialPreviewMode,
  onBackClick,
  onMediaUpload,
  onMediaRemove,
  onAddAdvantage,
  onRemoveAdvantage,
  onAddFaq,
  onRemoveFaq,
}: CreateProductTemplateProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>(initialPreviewMode);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        {/* Header with back button */}
        <div className="p-4 md:p-6 border-b border-border">
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
          <div className="w-full overflow-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold text-foreground mb-6">Создать продукт</h1>
            <CreateProductForm
              formik={formik}
              onMediaUpload={onMediaUpload}
              onMediaRemove={onMediaRemove}
              onAddAdvantage={onAddAdvantage}
              onRemoveAdvantage={onRemoveAdvantage}
              onAddFaq={onAddFaq}
              onRemoveFaq={onRemoveFaq}
              isSubmitting={formik.isSubmitting}
            />
          </div>

          {/* Preview Column - Hidden on mobile */}
          <div className="hidden w-full lg:flex border-l border-border p-6 bg-secondary/30">
            <div className="w-full">
              <ProductPreview
                data={formik.values}
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
