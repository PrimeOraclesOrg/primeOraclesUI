import { useRef, useState, useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection, FormField } from "@/components/atoms";
import {} from "@/types/createProduct";
import { CreateProductFormData } from "@/utils/validators/createProduct";
import {
  isValidDecimalDraft,
  normalizeDecimalInput,
  roundToTwoDecimals,
  base64ToFile,
} from "@/utils";
import { ImageCrop } from "../ImageCrop/ImageCrop";
import { ProductCategory } from "@/types";
import { useTranslation } from "react-i18next";

interface UpdateProductFormProps {
  form: UseFormReturn<CreateProductFormData>;
  categories: Array<ProductCategory>;
  wasDataChanged: boolean;
  onMediaUpload: (file: File) => void;
  onMediaRemove: () => void;
  onAddAdvantage: () => void;
  onRemoveAdvantage: (position: number) => void;
  onAddFaq: () => void;
  onRemoveFaq: (position: number) => void;
  onSubmit: () => void;
}

export function UpdateProductForm({
  form,
  categories,
  wasDataChanged,
  onMediaUpload,
  onMediaRemove,
  onAddAdvantage,
  onRemoveAdvantage,
  onAddFaq,
  onRemoveFaq,
  onSubmit,
}: UpdateProductFormProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPriceFocused = useRef(false);
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  const values = watch();
  const title = watch("title");
  const description = watch("description");
  const instructions = watch("instructions");
  const price = watch("price");
  const isActive = watch("isActive");
  const advantages = watch("advantages");
  const faq = watch("faq");
  const mediaUrl = watch("mediaUrl");

  const [priceInput, setPriceInput] = useState<string>(() => {
    if (price === 0) return "";

    const rounded = roundToTwoDecimals(price);
    return rounded.toFixed(2);
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (!isValidDecimalDraft(raw)) return;

    setPriceInput(raw);

    const normalized = normalizeDecimalInput(raw);
    if (normalized.trim() === "") {
      setValue("price", 0, { shouldDirty: true });
      return;
    }

    if (normalized.endsWith(".")) return;

    const parsed = Number(normalized);
    if (!Number.isNaN(parsed)) {
      const rounded = roundToTwoDecimals(parsed);
      setValue("price", rounded, { shouldDirty: true });
    }
  };

  const handlePriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    isPriceFocused.current = false;
    const raw = e.target.value;
    const normalized = normalizeDecimalInput(raw).trim();

    if (normalized === "" || normalized === ".") {
      setPriceInput("");
      setValue("price", 0, { shouldDirty: true });
    } else {
      const parsed = Number(normalized);
      if (!Number.isNaN(parsed)) {
        const rounded = roundToTwoDecimals(parsed);
        const display = rounded.toFixed(2);
        setPriceInput(display);
        setValue("price", rounded, { shouldDirty: true });
      }
    }
  };

  const handlePriceFocus = () => {
    isPriceFocused.current = true;
  };

  // Handle cropped image from ImageCrop
  const handleCroppedImage = useCallback(
    (croppedImageBase64: string) => {
      const file = base64ToFile(croppedImageBase64, "product-image.png");
      onMediaUpload(file);
    },
    [onMediaUpload]
  );

  const handleMediaRemoveClick = () => {
    onMediaRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAdvantageError = (index: number): string | undefined => {
    return errors.advantages?.[index]?.description?.message;
  };

  const getFaqError = (index: number, field: "question" | "answer"): string | undefined => {
    return errors.faq?.[index]?.[field]?.message;
  };

  useEffect(() => {
    if (isPriceFocused.current) {
      return;
    }

    if (price === 0) {
      setPriceInput("");
    } else {
      const rounded = roundToTwoDecimals(price);
      setPriceInput(rounded.toFixed(2));
    }
  }, [price]);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Category Section */}
      <FormSection title="Категория">
        <Select
          value={values.category_l1_id}
          onValueChange={(value) => {
            setValue("category_l1_id", value, { shouldDirty: true });
            setValue("category_l2_id", "", { shouldDirty: true });
          }}
        >
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {t(`product:category.${category.code}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_l1_id && (
          <p className="text-sm text-destructive mt-1">{errors.category_l1_id.message}</p>
        )}

        {values.category_l1_id && (
          <>
            <Select
              value={values.category_l2_id}
              onValueChange={(value) => setValue("category_l2_id", value, { shouldDirty: true })}
            >
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  ?.find((category) => category.id === values.category_l1_id)
                  .subcategories.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {t(`product:subCategory.${type.code}`)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.category_l2_id && (
              <p className="text-sm text-destructive mt-1">{errors.category_l2_id.message}</p>
            )}
          </>
        )}
      </FormSection>

      {/* Details Section */}
      <FormSection title="Детали">
        <FormField
          label="Название"
          error={errors.title?.message}
          required
          charCount={title.length}
          maxChars={100}
        >
          <Input
            {...register("title")}
            placeholder="Введите название продукта"
            className="bg-background border-border"
            maxLength={100}
          />
        </FormField>

        <FormField
          label="Описание"
          error={errors.description?.message}
          required
          charCount={description.length}
          maxChars={1000}
        >
          <Textarea
            {...register("description")}
            placeholder="Опишите ваш продукт..."
            className="bg-background border-border min-h-[120px] resize-none"
            maxLength={1000}
          />
        </FormField>

        {/* Media Upload */}
        <FormField label="Медиа" error={errors.mediaUrl?.message} required>
          {/* Hidden input for react-hook-form to focus on validation error */}
          <input
            {...register("mediaUrl")}
            type="text"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="flex gap-3">
            {mediaUrl ? (
              <div className="relative w-40 h-28 rounded-lg overflow-hidden border border-border group">
                <img src={mediaUrl} alt="Media preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleMediaRemoveClick}
                  className="absolute top-2 right-2 p-1 bg-card/80 rounded-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-2 left-2 px-2 py-0.5 bg-primary/90 rounded text-xs text-primary-foreground hover:bg-primary transition-colors cursor-pointer"
                >
                  Изменить
                </button>
              </div>
            ) : null}

            {!mediaUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-28 rounded-lg border border-dashed border-border bg-secondary/30 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
              >
                <Image className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Добавьте своё изображение</span>
              </button>
            )}
          </div>
          <ImageCrop
            fileInputRef={fileInputRef}
            setUploadedImage={handleCroppedImage}
            cropShape="rect"
            aspect={16 / 9}
            dialogMaxWidth="sm:max-w-3xl"
            previewHeight="h-[500px]"
          />
        </FormField>
      </FormSection>

      {/* Advantages Section */}
      <FormSection title="Преимущества">
        <div className="space-y-3">
          {advantages.map((adv, idx) => (
            <div key={adv.position} className="flex items-end gap-2">
              <div className="flex-1">
                <FormField
                  label={`Преимущество ${idx + 1}`}
                  error={getAdvantageError(idx)}
                  required
                  charCount={adv.description.length}
                  maxChars={100}
                >
                  <Input
                    {...register(`advantages.${idx}.description`)}
                    placeholder="Введите преимущество"
                    className="bg-background border-border flex-1"
                    maxLength={100}
                  />
                </FormField>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveAdvantage(adv.position)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {advantages.length < 5 && (
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
          {faq.map((item, idx) => (
            <div key={item.position} className="bg-secondary/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Вопрос {idx + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFaq(item.position)}
                  className="text-muted-foreground hover:text-destructive h-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <FormField
                label="Вопрос"
                error={getFaqError(idx, "question")}
                required
                charCount={item.question.length}
                maxChars={100}
              >
                <Input
                  {...register(`faq.${idx}.question`)}
                  placeholder="Введите вопрос"
                  className="bg-background border-border"
                  maxLength={100}
                />
              </FormField>

              <FormField
                label="Ответ"
                error={getFaqError(idx, "answer")}
                required
                charCount={item.answer.length}
                maxChars={300}
              >
                <Textarea
                  {...register(`faq.${idx}.answer`)}
                  placeholder="Введите ответ"
                  className="bg-background border-border min-h-[80px] resize-none"
                  maxLength={300}
                />
              </FormField>
            </div>
          ))}

          {faq.length < 5 && (
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
          error={errors.instructions?.message}
          required
          charCount={instructions.length}
          maxChars={1000}
        >
          <Textarea
            {...register("instructions")}
            placeholder="Опишите как пользоваться вашим продуктом..."
            className="bg-background border-border min-h-[120px] resize-none"
            maxLength={1000}
          />
        </FormField>
      </FormSection>

      {/* Visibility Section */}
      <FormSection title="Видимость">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-secondary/30 px-4 py-3">
          <Label htmlFor="product-visibility" className="text-sm text-muted-foreground">
            Отображать продукт в маркетплейсе
          </Label>
          <Switch
            id="product-visibility"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked, { shouldDirty: true })}
          />
        </div>
      </FormSection>

      {/* Price Section */}
      <FormSection title="Стоимость">
        <FormField label="Цена ($)" error={errors.price?.message} required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              min={4}
              value={priceInput}
              onChange={handlePriceChange}
              onFocus={handlePriceFocus}
              onBlur={handlePriceBlur}
              className="bg-background border-border pl-8"
            />
          </div>
        </FormField>
      </FormSection>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !wasDataChanged}
        className="w-full gold-gradient text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base"
      >
        {isSubmitting ? "Обновление продукта..." : "Обновить продукт"}
      </Button>
    </form>
  );
}
