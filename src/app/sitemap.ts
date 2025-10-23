import { getProducts } from "@/lib/api/products";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const products = await getProducts();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: baseUrl, lastModified: new Date() }, ...productUrls];
}
