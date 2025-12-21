import { useMemo } from "react";
import { mockProducts, productCategories, homePageProducts } from "@/data/products";
import { getProductDetails, mockReviews, productFaqs, ratingDistribution } from "@/data/details";
import type { Product } from "@/types";

export function useProducts(category?: string, searchQuery?: string) {
  const products = useMemo(() => {
    let filtered = [...mockProducts];
    
    if (category && category !== "Все") {
      filtered = filtered.filter((p) => p.category === category);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => 
        p.title.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [category, searchQuery]);

  return {
    products,
    categories: productCategories,
    isLoading: false,
    error: null,
  };
}

export function useHomeProducts() {
  return {
    products: homePageProducts,
    isLoading: false,
    error: null,
  };
}

export function useProductDetails(id: string) {
  const product = useMemo(() => getProductDetails(id), [id]);
  
  return {
    product,
    reviews: mockReviews,
    faqs: productFaqs,
    ratingDistribution,
    isLoading: false,
    error: null,
  };
}
