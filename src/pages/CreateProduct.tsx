import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { CreateProductTemplate } from "@/components/templates/CreateProductTemplate/CreateProductTemplate";
import {
  DEFAULT_FORM_DATA,
  type ProductAdvantage,
  type ProductFAQItem,
} from "@/types/createProduct";
import {
  CreateProductFormData,
  validateCreateProductData,
} from "@/utils/validators/createProduct";
import { useToast } from "@/hooks/useToast";
import {
  createProduct,
  checkProductTitleAvailability,
} from "@/services/productsService/productsService";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const formik = useFormik<CreateProductFormData>({
    initialValues: DEFAULT_FORM_DATA,
    validate: validateCreateProductData,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await checkProductTitleAvailability(values.title);

        await createProduct({
          title: values.title,
          category: values.category,
          description: values.description,
          advantages: values.advantages,
          faq: values.faq,
          instructions: values.instructions,
          price: values.price,
          isActive: true,
        });

        toast({
          title: "Продукт создан",
          description: "Ваш продукт успешно создан!",
        });
        navigate("/marketplace");
      } catch (error) {
        console.error("Error creating product:", error);
        const errorMessage = error instanceof Error ? error.message : "Не удалось создать продукт";
        toast({
          title: "Ошибка",
          description: errorMessage,
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
  const handleMediaUpload = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      formik.setFieldValue("mediaUrl", url);
    },
    [formik]
  );

  // Handle media remove
  const handleMediaRemove = useCallback(() => {
    formik.setFieldValue("mediaUrl", undefined);
  }, [formik]);

  // Advantages handlers
  const handleAddAdvantage = useCallback(() => {
    if (formik.values.advantages.length >= 5) return;
    const newPosition = formik.values.advantages.length + 1;
    const newAdvantage: ProductAdvantage = { description: "", position: newPosition };
    formik.setFieldValue("advantages", [...formik.values.advantages, newAdvantage]);
  }, [formik]);

  const handleRemoveAdvantage = useCallback(
    (position: number) => {
      const updated = formik.values.advantages
        .filter((adv) => adv.position !== position)
        .map((adv, index) => ({ ...adv, position: index + 1 }));
      formik.setFieldValue("advantages", updated);
    },
    [formik]
  );

  // FAQ handlers
  const handleAddFaq = useCallback(() => {
    if (formik.values.faq.length >= 5) return;
    const newPosition = formik.values.faq.length + 1;
    const newFaq: ProductFAQItem = { question: "", answer: "", position: newPosition };
    formik.setFieldValue("faq", [...formik.values.faq, newFaq]);
  }, [formik]);

  const handleRemoveFaq = useCallback(
    (position: number) => {
      const updated = formik.values.faq
        .filter((item) => item.position !== position)
        .map((item, index) => ({ ...item, position: index + 1 }));
      formik.setFieldValue("faq", updated);
    },
    [formik]
  );

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
