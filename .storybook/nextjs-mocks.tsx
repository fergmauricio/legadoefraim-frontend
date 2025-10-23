import { addMock } from "./vite-module-mock";

addMock("next/navigation", {
  useRouter: () => ({ push: () => {}, prefetch: () => {} }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
});

addMock("next-intl", {
  useTranslations: () => (key: string) => key,
  useLocale: () => "pt",
});

addMock("next-themes", {
  useTheme: () => ({ theme: "light", setTheme: () => {} }),
});
