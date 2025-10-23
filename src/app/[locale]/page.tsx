import { getProducts } from "@/lib/api/products";

import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { Suspense } from "react";
import HomeClient from "./page-client";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <HomeClient products={products} />
    </Suspense>
  );
}
