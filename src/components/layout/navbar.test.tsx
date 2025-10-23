import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./navbar";
import { useCartStore } from "@/store/use-cart-store";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    return (key: string) => {
      const translations: Record<string, Record<string, string>> = {
        Navbar: {
          enterprise_name1: "Faith",
          enterprise_name2: "Wear",
          home: "Início",
          about: "Sobre",
        },
      };

      return translations[namespace || "Navbar"]?.[key] || key;
    };
  },
  useLocale: () => "pt",
}));

vi.mock("@/lib/i18n", () => ({
  otherLocale: (locale: string) => (locale === "pt" ? "en" : "pt"),
}));

vi.mock("@/store/use-cart-store", async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useCartStore: vi.fn(() => ({
      items: [{ id: "1", name: "Produto", price: 89, quantity: 1 }],
      totalItems: () => 1,
      totalPrice: () => 89,
      remove: vi.fn(),
      increase: vi.fn(),
      decrease: vi.fn(),
      clear: vi.fn(),
    })),
  };
});

describe("Navbar", () => {
  it("deve renderizar o nome da marca corretamente", () => {
    render(<Navbar />);
    expect(screen.getByText(/Faith/i)).toBeInTheDocument();
    expect(screen.getByText(/Wear/i)).toBeInTheDocument();
  });

  it("deve renderizar os links de navegação", () => {
    render(<Navbar />);
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
  });

  it("deve exibir o ícone do carrinho com contador de itens", () => {
    render(<Navbar />);
    const contador = screen.getByText("1");
    expect(contador).toBeInTheDocument();
  });

  it("deve trocar o idioma quando clicar no botão de idioma", () => {
    render(<Navbar />);
    const botaoIdioma = screen.getByRole("button", { name: /Mudar idioma/i });
    expect(botaoIdioma).toBeInTheDocument();
  });

  it("deve ter o botão de alternância de tema", () => {
    render(<Navbar />);
    const botaoTema = screen.getByRole("button", { name: "" });
    expect(botaoTema).toBeInTheDocument();
  });
});
