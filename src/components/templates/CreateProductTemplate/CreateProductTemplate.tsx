import { ChevronLeft } from "lucide-react";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { CreateProductForm } from "@/components/organisms/CreateProductForm/CreateProductForm";
import { ProductPreview } from "@/components/organisms/ProductPreview/ProductPreview";
import type { CreateProductFormData, ProductCategory } from "@/types/createProduct";

interface FormErrors {
  name?: string;
  description?: string;
  advantages?: Record<string, string>;
  faq?: Record<string, { question?: string; answer?: string }>;
  instructions?: string;
  price?: string;
}

type PreviewMode = "desktop" | "mobile";

interface CreateProductTemplateProps {
  formData: CreateProductFormData;
  errors: FormErrors;
  previewMode: PreviewMode;
  isSubmitting: boolean;
  onBackClick: () => void;
  onFieldChange: <K extends keyof CreateProductFormData>(
    field: K,
    value: CreateProductFormData[K]
  ) => void;
  onMediaUpload: (file: File) => void;
  onMediaRemove: () => void;
  onAddAdvantage: () => void;
  onUpdateAdvantage: (id: string, text: string) => void;
  onRemoveAdvantage: (id: string) => void;
  onAddFaq: () => void;
  onUpdateFaq: (id: string, field: "question" | "answer", value: string) => void;
  onRemoveFaq: (id: string) => void;
  onPreviewModeChange: (mode: PreviewMode) => void;
  onSubmit: () => void;
}

export function CreateProductTemplate({
  formData,
  errors,
  previewMode,
  isSubmitting,
  onBackClick,
  onFieldChange,
  onMediaUpload,
  onMediaRemove,
  onAddAdvantage,
  onUpdateAdvantage,
  onRemoveAdvantage,
  onAddFaq,
  onUpdateFaq,
  onRemoveFaq,
  onPreviewModeChange,
  onSubmit,
}: CreateProductTemplateProps) {
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
          <div className="w-full lg:w-1/2 overflow-auto p-4 md:p-6">
            <div className="max-w-xl">
              <h1 className="text-2xl font-bold text-foreground mb-6">
                Создать продукт
              </h1>
              <CreateProductForm
                data={formData}
                errors={errors}
                onFieldChange={onFieldChange}
                onMediaUpload={onMediaUpload}
                onMediaRemove={onMediaRemove}
                onAddAdvantage={onAddAdvantage}
                onUpdateAdvantage={onUpdateAdvantage}
                onRemoveAdvantage={onRemoveAdvantage}
                onAddFaq={onAddFaq}
                onUpdateFaq={onUpdateFaq}
                onRemoveFaq={onRemoveFaq}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Preview Column - Hidden on mobile */}
          <div className="hidden lg:flex lg:w-1/2 border-l border-border p-6 bg-secondary/30">
            <div className="w-full">
              <ProductPreview
                data={formData}
                mode={previewMode}
                onModeChange={onPreviewModeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
