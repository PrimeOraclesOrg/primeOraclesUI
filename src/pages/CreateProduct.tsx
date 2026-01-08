import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProductTemplate } from "@/components/templates/CreateProductTemplate/CreateProductTemplate";
import {
  DEFAULT_FORM_DATA,
  type CreateProductFormData,
  type ProductAdvantage,
  type ProductFAQItem,
} from "@/types/createProduct";
import {
  createProductSchema,
  productAdvantageSchema,
  productFaqQuestionSchema,
  productFaqAnswerSchema,
} from "@/utils/createProductValidators";
import { useToast } from "@/hooks/useToast";

type PreviewMode = "desktop" | "mobile";

interface FormErrors {
  name?: string;
  description?: string;
  advantages?: Record<string, string>;
  faq?: Record<string, { question?: string; answer?: string }>;
  instructions?: string;
  price?: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export default function CreateProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreateProductFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Navigate back
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Update a form field
  const handleFieldChange = useCallback(
    <K extends keyof CreateProductFormData>(field: K, value: CreateProductFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  // Handle media upload
  const handleMediaUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, mediaUrl: url }));
  }, []);

  // Handle media remove
  const handleMediaRemove = useCallback(() => {
    setFormData((prev) => ({ ...prev, mediaUrl: undefined }));
  }, []);

  // Advantages handlers
  const handleAddAdvantage = useCallback(() => {
    if (formData.advantages.length >= 5) return;
    const newAdvantage: ProductAdvantage = { id: generateId(), text: "" };
    setFormData((prev) => ({
      ...prev,
      advantages: [...prev.advantages, newAdvantage],
    }));
  }, [formData.advantages.length]);

  const handleUpdateAdvantage = useCallback((id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      advantages: prev.advantages.map((adv) =>
        adv.id === id ? { ...adv, text } : adv
      ),
    }));
    // Clear error
    setErrors((prev) => {
      if (prev.advantages?.[id]) {
        const newAdvErrors = { ...prev.advantages };
        delete newAdvErrors[id];
        return { ...prev, advantages: newAdvErrors };
      }
      return prev;
    });
  }, []);

  const handleRemoveAdvantage = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      advantages: prev.advantages.filter((adv) => adv.id !== id),
    }));
  }, []);

  // FAQ handlers
  const handleAddFaq = useCallback(() => {
    if (formData.faq.length >= 5) return;
    const newFaq: ProductFAQItem = { id: generateId(), question: "", answer: "" };
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, newFaq],
    }));
  }, [formData.faq.length]);

  const handleUpdateFaq = useCallback(
    (id: string, field: "question" | "answer", value: string) => {
      setFormData((prev) => ({
        ...prev,
        faq: prev.faq.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
      // Clear error
      setErrors((prev) => {
        if (prev.faq?.[id]?.[field]) {
          const newFaqErrors = { ...prev.faq };
          newFaqErrors[id] = { ...newFaqErrors[id], [field]: undefined };
          return { ...prev, faq: newFaqErrors };
        }
        return prev;
      });
    },
    []
  );

  const handleRemoveFaq = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.filter((item) => item.id !== id),
    }));
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Validate with zod schema
    const result = createProductSchema.safeParse(formData);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        const path = err.path;

        if (path[0] === "name") {
          newErrors.name = err.message;
        } else if (path[0] === "description") {
          newErrors.description = err.message;
        } else if (path[0] === "instructions") {
          newErrors.instructions = err.message;
        } else if (path[0] === "price") {
          newErrors.price = err.message;
        } else if (path[0] === "advantages" && typeof path[1] === "number") {
          const advId = formData.advantages[path[1]]?.id;
          if (advId) {
            newErrors.advantages = newErrors.advantages || {};
            newErrors.advantages[advId] = err.message;
          }
        } else if (path[0] === "faq" && typeof path[1] === "number") {
          const faqId = formData.faq[path[1]]?.id;
          const field = path[2] as "question" | "answer";
          if (faqId && field) {
            newErrors.faq = newErrors.faq || {};
            newErrors.faq[faqId] = newErrors.faq[faqId] || {};
            newErrors.faq[faqId][field] = err.message;
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submit
  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, исправьте ошибки в форме",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // TODO: Submit to backend via productsService when Supabase is integrated
    // For now, just simulate success
    setTimeout(() => {
      toast({
        title: "Продукт создан",
        description: "Ваш продукт успешно создан!",
      });
      setIsSubmitting(false);
      navigate("/marketplace");
    }, 1000);
  }, [validateForm, toast, navigate]);

  return (
    <CreateProductTemplate
      formData={formData}
      errors={errors}
      previewMode={previewMode}
      isSubmitting={isSubmitting}
      onBackClick={handleBackClick}
      onFieldChange={handleFieldChange}
      onMediaUpload={handleMediaUpload}
      onMediaRemove={handleMediaRemove}
      onAddAdvantage={handleAddAdvantage}
      onUpdateAdvantage={handleUpdateAdvantage}
      onRemoveAdvantage={handleRemoveAdvantage}
      onAddFaq={handleAddFaq}
      onUpdateFaq={handleUpdateFaq}
      onRemoveFaq={handleRemoveFaq}
      onPreviewModeChange={setPreviewMode}
      onSubmit={handleSubmit}
    />
  );
}
