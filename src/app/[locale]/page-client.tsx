import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Product } from "@/lib/api/products";
import { HomeBanner } from "@/components/home/banners";
import { ProductList } from "@/components/home/product-list";

export const revalidate = 60;

export default function HomeClient({ products }: { products: Product[] }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative w-full h-[60vh] flex items-center justify-center text-center bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <HomeBanner />
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16">
        <ProductList products={products} />
      </main>
      <Footer />
    </div>
  );
}
