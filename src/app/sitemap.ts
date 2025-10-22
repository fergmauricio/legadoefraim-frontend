import { getProducts } from "@/lib/api/products";

export default async function sitemap() {
  const baseUrl = "https://faithwear.vercel.app";
  const products = await getProducts();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: baseUrl, lastModified: new Date() }, ...productUrls];
}
