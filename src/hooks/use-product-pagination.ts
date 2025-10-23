"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Product } from "@/lib/api/products";

export function useProductPagination(products: Product[], perPage = 6) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sort = searchParams.get("sort") || "sales";
  const page = Number(searchParams.get("page")) || 1;

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "sales":
      default:
        sorted.sort((a, b) => b.sales - a.sales);
    }
    return sorted;
  }, [products, sort]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, page, perPage]);

  const totalPages = Math.ceil(sortedProducts.length / perPage);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { sort, page, totalPages, paginatedProducts, setPage };
}
