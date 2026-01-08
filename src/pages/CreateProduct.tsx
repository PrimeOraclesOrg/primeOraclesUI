import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { CreateProductTemplate } from "@/components/templates/CreateProductTemplate/CreateProductTemplate";
import {
  DEFAULT_FORM_DATA,
  type CreateProductFormData,
  type ProductAdvantage,
  type ProductFAQItem,
} from "@/types/createProduct";
import { createProductSchema } from "@/utils/createProductValidators";
import { useToast } from "@/hooks/useToast";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Custom validation function using Zod
const validateWithZod = (values: CreateProductFormData) => {
  const result = createProductSchema.safeParse(values);
  if (result.success) {
    return {};
  }

  const errors: Record<string, unknown> = {};
  
  result.error.errors.forEach((err) => {
    const path = err.path;
    
    if (path.length === 1) {
      errors[path[0] as string] = err.message;
    } else if (path[0] === "advantages" && typeof path[1] === "number") {
      if (!errors.advantages) errors.advantages = [];
      (errors.advantages as Record<string, string>[])[path[1]] = {
        ...(errors.advantages as Record<string, string>[])[path[1]],
        [path[2] as string]: err.message,
      };
    } else if (path[0] === "faq" && typeof path[1] === "number") {
      if (!errors.faq) errors.faq = [];
      (errors.faq as Record<string, string>[])[path[1]] = {
        ...(errors.faq as Record<string, string>[])[path[1]],
        [path[2] as string]: err.message,
      };
    }
  });

  return errors;
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formik = useFormik<CreateProductFormData>({
    initialValues: DEFAULT_FORM_DATA,
    validate: validateWithZod,
    onSubmit: async (_, { setSubmitting }) => {
      try {
        // TODO: Submit to backend via productsService when Supabase is integrated
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        toast({
          title: "Продукт создан",
          description: "Ваш продукт успешно создан!",
        });
        navigate("/marketplace");
      } catch {
        toast({
          title: "Ошибка",
          description: "Не удалось создать продукт",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Navigate back
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Handle media upload
  const handleMediaUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    formik.setFieldValue("mediaUrl", url);
  }, [formik]);

  // Handle media remove
  const handleMediaRemove = useCallback(() => {
    formik.setFieldValue("mediaUrl", undefined);
  }, [formik]);

  // Advantages handlers
  const handleAddAdvantage = useCallback(() => {
    if (formik.values.advantages.length >= 5) return;
    const newAdvantage: ProductAdvantage = { id: generateId(), text: "" };
    formik.setFieldValue("advantages", [...formik.values.advantages, newAdvantage]);
  }, [formik]);

  const handleRemoveAdvantage = useCallback((id: string) => {
    formik.setFieldValue(
      "advantages",
      formik.values.advantages.filter((adv) => adv.id !== id)
    );
  }, [formik]);

  // FAQ handlers
  const handleAddFaq = useCallback(() => {
    if (formik.values.faq.length >= 5) return;
    const newFaq: ProductFAQItem = { id: generateId(), question: "", answer: "" };
    formik.setFieldValue("faq", [...formik.values.faq, newFaq]);
  }, [formik]);

  const handleRemoveFaq = useCallback((id: string) => {
    formik.setFieldValue(
      "faq",
      formik.values.faq.filter((item) => item.id !== id)
    );
  }, [formik]);

  return (
    <CreateProductTemplate
      formik={formik}
      previewMode="desktop"
      onBackClick={handleBackClick}
      onMediaUpload={handleMediaUpload}
      onMediaRemove={handleMediaRemove}
      onAddAdvantage={handleAddAdvantage}
      onRemoveAdvantage={handleRemoveAdvantage}
      onAddFaq={handleAddFaq}
      onRemoveFaq={handleRemoveFaq}
    />
  );
}
