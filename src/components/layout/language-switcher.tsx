"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { otherLocale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = otherLocale(locale as "pt" | "en");

  const handleChangeLanguage = () => {
    setCookie("NEXT_LOCALE", nextLocale, { path: "/" });

    const newPath = `/${nextLocale}${pathname.replace(/^\/(pt|en)/, "")}`;
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleChangeLanguage}
      className="rounded-full font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={`Mudar idioma para ${nextLocale.toUpperCase()}`}
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
