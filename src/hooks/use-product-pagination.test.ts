import { renderHook } from "@testing-library/react";
import { useProductPagination } from "./use-product-pagination";
import { MOCK_PRODUCTS } from "@/lib/api/products";

describe("Hook de Paginação de Produtos", () => {
  it("deve retornar produtos paginados corretamente", () => {
    const { result } = renderHook(() => useProductPagination(MOCK_PRODUCTS, 3));

    expect(result.current.paginatedProducts.length).toBe(3);
    expect(result.current.totalPages).toBeGreaterThan(1);
  });
});
