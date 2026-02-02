import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductFormData, createProductSchema } from "@/utils/validators/createProduct";
import {
  DEFAULT_FORM_DATA,
  type ProductAdvantage,
  type ProductFAQItem,
} from "@/types/createProduct";
import { useToast } from "@/hooks/useToast";
import { useCreateProductMutation } from "@/store/productsApi";
import { useOnRequestResult } from "@/data/useOnRequestResult";

export const useCreateProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [createProduct, { data: createdProductId, isSuccess, isError, error }] =
    useCreateProductMutation();

  const createProductForm = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: DEFAULT_FORM_DATA,
    mode: "onBlur",
  });

  // Navigate back
  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Handle media upload
  const handleMediaUpload = useCallback(
    (file: File) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
      const maxSizeBytes = 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Ошибка",
          description: "Допустимые форматы: JPEG, PNG, WebP, AVIF.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSizeBytes) {
        toast({
          title: "Ошибка",
          description: "Файл слишком большой. Максимальный размер: 1MB.",
          variant: "destructive",
        });
        return;
      }

      const currentUrl = createProductForm.getValues("mediaUrl");
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      const url = URL.createObjectURL(file);
      setMediaFile(file);
      createProductForm.setValue("mediaUrl", url, { shouldValidate: true });
      createProductForm.clearErrors("mediaUrl");
    },
    [createProductForm, toast]
  );

  // Handle media remove
  const handleMediaRemove = useCallback(() => {
    const currentUrl = createProductForm.getValues("mediaUrl");
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    setMediaFile(null);
    createProductForm.setValue("mediaUrl", undefined);
  }, [createProductForm]);

  // Advantages handlers
  const handleAddAdvantage = useCallback(() => {
    const currentAdvantages = createProductForm.getValues("advantages");
    if (currentAdvantages.length >= 5) return;
    const newPosition = currentAdvantages.length + 1;
    const newAdvantage: ProductAdvantage = { description: "", position: newPosition };
    createProductForm.setValue("advantages", [...currentAdvantages, newAdvantage]);
  }, [createProductForm]);

  const handleRemoveAdvantage = useCallback(
    (position: number) => {
      const currentAdvantages = createProductForm.getValues("advantages");
      const updated = currentAdvantages
        .filter((adv) => adv.position !== position)
        .map((adv, index) => ({ ...adv, position: index + 1 }));
      createProductForm.setValue("advantages", updated);
    },
    [createProductForm]
  );

  // FAQ handlers
  const handleAddFaq = useCallback(() => {
    const currentFaq = createProductForm.getValues("faq");
    if (currentFaq.length >= 5) return;
    const newPosition = currentFaq.length + 1;
    const newFaq: ProductFAQItem = { question: "", answer: "", position: newPosition };
    createProductForm.setValue("faq", [...currentFaq, newFaq]);
  }, [createProductForm]);

  const handleRemoveFaq = useCallback(
    (position: number) => {
      const currentFaq = createProductForm.getValues("faq");
      const updated = currentFaq
        .filter((item) => item.position !== position)
        .map((item, index) => ({ ...item, position: index + 1 }));
      createProductForm.setValue("faq", updated);
    },
    [createProductForm]
  );

  const onSubmit = (values: CreateProductFormData) => {
    createProduct({
      productData: {
        title: values.title,
        category: values.category,
        description: values.description,
        advantages: values.advantages,
        faq: values.faq,
        instructions: values.instructions,
        price: values.price,
        isActive: values.isActive,
      },
      mediaFile,
    });
  };

  useOnRequestResult({
    isSuccess,
    isError,
    successMessage: {
      title: "Продукт создан",
      description: "Ваш продукт успешно создан!",
    },
    errorMessage: {
      title: "Ошибка",
      description: t(`status:${error?.code}`) || error?.message,
    },
    onSuccess: () => navigate(`/products/${createdProductId}`),
  });

  useEffect(() => {
    return () => {
      const currentUrl = createProductForm.getValues("mediaUrl");
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [createProductForm]);

  return {
    createProductForm,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
  };
};
