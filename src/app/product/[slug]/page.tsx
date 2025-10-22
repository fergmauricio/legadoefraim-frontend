import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts, getProduct } from "@/lib/api/products";
import { ProductView } from "./product-view";
import { ProductJsonLd } from "@/components/seo/product-jsonld";
import { Navbar } from "@/components/layout/navbar";

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
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Produto não encontrado | FaithWear",
      description: "O produto que você procura não existe.",
      robots: { index: false },
    };
  }

  const title = `${product.name} | FaithWear`;
  const description = product.description;
  const url = `https://faithwear.vercel.app/product/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "FaithWear",
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
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

  return (
    <>
      <ProductJsonLd product={product} />

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <Navbar />
        <main className="flex-1">
          <section className="max-w-6xl mx-auto px-4 py-16">
            <ProductView product={product} />
          </section>
        </main>
      </div>
    </>
  );
}
