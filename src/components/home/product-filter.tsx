"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "sales";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-end mb-6">
      <Select onValueChange={handleSort} defaultValue={currentSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sales">Mais vendidos</SelectItem>
          <SelectItem value="price_desc">Maior preço</SelectItem>
          <SelectItem value="price_asc">Menor preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
