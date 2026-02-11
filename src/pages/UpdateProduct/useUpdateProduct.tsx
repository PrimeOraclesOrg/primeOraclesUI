import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useCreateProductMutation, useGetProductDetailsQuery } from "@/store/productsApi";
import { useOnRequestResult } from "@/data/useOnRequestResult";
import { useGetMyProfileQuery } from "@/store/usersApi";
import { ProductCategory } from "@/types";

export const useUpdateProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: author } = useGetMyProfileQuery();
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [createProduct, { data: createdProductId, isSuccess, isError, error }] =
    useCreateProductMutation();
  const { id } = useParams();
  const {
    data: product,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useGetProductDetailsQuery(id);

  const defaultValues = useMemo(
    () => ({
      advantages: product?.advantages || [],
      category: (product?.category as ProductCategory) || "Soft/Bot",
      description: product?.description || "",
      faq: product?.faq || [],
      instructions: "",
      isActive: true,
      price: product?.price || 0,
      title: product?.title || "",
      mediaUrl: "",
    }),
    [product]
  );

  const updateProductForm = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
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

      const currentUrl = updateProductForm.getValues("mediaUrl");
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }

      const url = URL.createObjectURL(file);
      setMediaFile(file);
      updateProductForm.setValue("mediaUrl", url, { shouldValidate: true });
      updateProductForm.clearErrors("mediaUrl");
    },
    [updateProductForm, toast]
  );

  // Handle media remove
  const handleMediaRemove = useCallback(() => {
    const currentUrl = updateProductForm.getValues("mediaUrl");
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
    setMediaFile(null);
    updateProductForm.setValue("mediaUrl", undefined);
  }, [updateProductForm]);

  // Advantages handlers
  const handleAddAdvantage = useCallback(() => {
    const currentAdvantages = updateProductForm.getValues("advantages");
    if (currentAdvantages.length >= 5) return;
    const newPosition = currentAdvantages.length + 1;
    const newAdvantage: ProductAdvantage = { description: "", position: newPosition };
    updateProductForm.setValue("advantages", [...currentAdvantages, newAdvantage]);
  }, [updateProductForm]);

  const handleRemoveAdvantage = useCallback(
    (position: number) => {
      const currentAdvantages = updateProductForm.getValues("advantages");
      const updated = currentAdvantages
        .filter((adv) => adv.position !== position)
        .map((adv, index) => ({ ...adv, position: index + 1 }));
      updateProductForm.setValue("advantages", updated);
    },
    [updateProductForm]
  );

  // FAQ handlers
  const handleAddFaq = useCallback(() => {
    const currentFaq = updateProductForm.getValues("faq");
    if (currentFaq.length >= 5) return;
    const newPosition = currentFaq.length + 1;
    const newFaq: ProductFAQItem = { question: "", answer: "", position: newPosition };
    updateProductForm.setValue("faq", [...currentFaq, newFaq]);
  }, [updateProductForm]);

  const handleRemoveFaq = useCallback(
    (position: number) => {
      const currentFaq = updateProductForm.getValues("faq");
      const updated = currentFaq
        .filter((item) => item.position !== position)
        .map((item, index) => ({ ...item, position: index + 1 }));
      updateProductForm.setValue("faq", updated);
    },
    [updateProductForm]
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
      const currentUrl = updateProductForm.getValues("mediaUrl");
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [updateProductForm]);

  return {
    updateProductForm,
    isProductLoading,
    onSubmit,
    handleBackClick,
    handleMediaUpload,
    handleMediaRemove,
    handleAddAdvantage,
    handleRemoveAdvantage,
    handleAddFaq,
    handleRemoveFaq,
    author,
  };
};
