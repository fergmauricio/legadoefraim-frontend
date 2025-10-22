import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts, getProduct } from "@/lib/api/products";
import { ProductView } from "./product-view";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product)
    return {
      title: "Produto não encontrado | FaithWear",
      description: "O produto que você procura não existe.",
    };

  return {
    title: `${product.name} | FaithWear`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) return notFound();

  return <ProductView product={product} />;
}
