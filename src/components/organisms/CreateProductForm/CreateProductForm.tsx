import { useRef } from "react";
import { FormikProps } from "formik";
import { Plus, Trash2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection, FormField } from "@/components/atoms";
import {
  PRODUCT_CATEGORIES,
  type CreateProductFormData,
  type ProductCategory,
} from "@/types/createProduct";

interface CreateProductFormProps {
  formik: FormikProps<CreateProductFormData>;
  onMediaUpload: (file: File) => void;
  onMediaRemove: () => void;
  onAddAdvantage: () => void;
  onRemoveAdvantage: (id: string) => void;
  onAddFaq: () => void;
  onRemoveFaq: (id: string) => void;
  isSubmitting: boolean;
}

export function CreateProductForm({
  formik,
  onMediaUpload,
  onMediaRemove,
  onAddAdvantage,
  onRemoveAdvantage,
  onAddFaq,
  onRemoveFaq,
  isSubmitting,
}: CreateProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onMediaUpload(file);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit } = formik;

  // Helper to get nested error
  const getAdvantageError = (index: number): string | undefined => {
    const advErrors = errors.advantages;
    if (Array.isArray(advErrors) && advErrors[index]) {
      const err = advErrors[index];
      if (typeof err === "object" && err !== null && "text" in err) {
        return (err as { text?: string }).text;
      }
    }
    return undefined;
  };

  const getFaqError = (index: number, field: "question" | "answer"): string | undefined => {
    const faqErrors = errors.faq;
    if (Array.isArray(faqErrors) && faqErrors[index]) {
      const err = faqErrors[index];
      if (typeof err === "object" && err !== null && field in err) {
        return (err as Record<string, string>)[field];
      }
    }
    return undefined;
  };

  const isAdvTouched = (index: number): boolean => {
    const advTouched = touched.advantages;
    if (Array.isArray(advTouched) && advTouched[index]) {
      const t = advTouched[index];
      return typeof t === "object" && t !== null && (t as { text?: boolean }).text === true;
    }
    return false;
  };

  const isFaqTouched = (index: number, field: "question" | "answer"): boolean => {
    const faqTouched = touched.faq;
    if (Array.isArray(faqTouched) && faqTouched[index]) {
      const t = faqTouched[index];
      return typeof t === "object" && t !== null && (t as Record<string, boolean>)[field] === true;
    }
    return false;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category Section */}
      <FormSection title="Категория">
        <Select
          value={values.category}
          onValueChange={(value) => setFieldValue("category", value as ProductCategory)}
        >
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormSection>

      {/* Details Section */}
      <FormSection title="Детали">
        <FormField
          label="Название"
          error={touched.name ? errors.name : undefined}
          required
          charCount={values.name.length}
          maxChars={100}
        >
          <Input
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Введите название продукта"
            className="bg-background border-border"
            maxLength={100}
          />
        </FormField>

        <FormField
          label="Описание"
          error={touched.description ? errors.description : undefined}
          required
          charCount={values.description.length}
          maxChars={1000}
        >
          <Textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Опишите ваш продукт..."
            className="bg-background border-border min-h-[120px] resize-none"
            maxLength={1000}
          />
        </FormField>

        {/* Media Upload */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Медиа</Label>
          <div className="flex gap-3">
            {values.mediaUrl ? (
              <div className="relative w-40 h-28 rounded-lg overflow-hidden border border-border group">
                <img
                  src={values.mediaUrl}
                  alt="Media preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={onMediaRemove}
                  className="absolute top-2 right-2 p-1 bg-card/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 rounded text-xs text-primary-foreground">
                  Изменить
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-40 h-28 rounded-lg border border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
            >
              <Image className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Добавьте своё изображение</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </FormSection>

      {/* Advantages Section */}
      <FormSection title="Преимущества">
        <div className="space-y-3">
          {values.advantages.map((adv, idx) => (
            <div key={adv.id} className="flex items-start gap-2">
              <div className="flex-1">
                <FormField
                  label={`Преимущество ${idx + 1}`}
                  error={isAdvTouched(idx) ? getAdvantageError(idx) : undefined}
                  required
                >
                  <div className="flex gap-2">
                    <Input
                      name={`advantages.${idx}.text`}
                      value={adv.text}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Введите преимущество"
                      className="bg-background border-border flex-1"
                      maxLength={100}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveAdvantage(adv.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </FormField>
              </div>
            </div>
          ))}

          {values.advantages.length < 5 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddAdvantage}
              className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4" />
              Добавить преимущество
            </Button>
          )}
        </div>
      </FormSection>

      {/* FAQ Section */}
      <FormSection title="Часто задаваемые вопросы">
        <div className="space-y-4">
          {values.faq.map((item, idx) => (
            <div key={item.id} className="bg-secondary/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Вопрос {idx + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFaq(item.id)}
                  className="text-muted-foreground hover:text-destructive h-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <FormField
                label="Вопрос"
                error={isFaqTouched(idx, "question") ? getFaqError(idx, "question") : undefined}
                required
              >
                <Input
                  name={`faq.${idx}.question`}
                  value={item.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Введите вопрос"
                  className="bg-background border-border"
                  maxLength={100}
                />
              </FormField>

              <FormField
                label="Ответ"
                error={isFaqTouched(idx, "answer") ? getFaqError(idx, "answer") : undefined}
                required
              >
                <Textarea
                  name={`faq.${idx}.answer`}
                  value={item.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Введите ответ"
                  className="bg-background border-border min-h-[80px] resize-none"
                  maxLength={300}
                />
              </FormField>
            </div>
          ))}

          {values.faq.length < 5 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddFaq}
              className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4" />
              Добавить ответы
            </Button>
          )}
        </div>
      </FormSection>

      {/* Instructions Section */}
      <FormSection title="Инструкции">
        <FormField
          label="Внимание! Инструкция по использованию не отображается в описании продукта. Данная информация будет отправлена пользователю после покупки продукта"
          error={touched.instructions ? errors.instructions : undefined}
          required
          charCount={values.instructions.length}
          maxChars={1000}
        >
          <Textarea
            name="instructions"
            value={values.instructions}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Опишите как пользоваться вашим продуктом..."
            className="bg-background border-border min-h-[120px] resize-none"
            maxLength={1000}
          />
        </FormField>
      </FormSection>

      {/* Price Section */}
      <FormSection title="Стоимость">
        <FormField label="Цена (€)" error={touched.price ? errors.price : undefined} required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              €
            </span>
            <Input
              name="price"
              type="number"
              min={4}
              step={0.01}
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-background border-border pl-8"
            />
          </div>
        </FormField>
      </FormSection>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gold-gradient text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base"
      >
        {isSubmitting ? "Сохранение..." : "Продолжить"}
      </Button>
    </form>
  );
}
