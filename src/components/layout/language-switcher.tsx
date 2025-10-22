"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { otherLocale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(pt|en)/, "");

  const nextLocale = otherLocale(locale as "pt" | "en");

  return (
    <Link href={`/${nextLocale}${pathWithoutLocale}`} prefetch={false}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label={`Mudar idioma para ${nextLocale.toUpperCase()}`}
      >
        {nextLocale.toUpperCase()}
      </Button>
    </Link>
  );
}
