import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CardProduct({
  product,
}: {
  product: { name: string; price: number; image: string };
}) {
  return (
    <div className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium text-slate-800 dark:text-slate-200">
          {product.name}
        </h3>
        <span className="text-yellow-600 font-semibold">
          R$ {product.price}
        </span>
        <Button className="mt-2">Adicionar ao carrinho</Button>
      </div>
    </div>
  );
}
