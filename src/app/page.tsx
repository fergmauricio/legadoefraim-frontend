import { getProducts } from "@/lib/api/products";
import { HomeClient } from "./home-client";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  return <HomeClient products={products} />;
}
