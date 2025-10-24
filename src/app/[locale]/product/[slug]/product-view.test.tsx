import { vi } from "vitest";
import React from "react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "pt",
}));

const mockAdd = vi.fn();

vi.mock("@/store/use-cart-store", () => ({
  useCartStore: (selector?: any) =>
    selector ? selector({ add: mockAdd }) : { add: mockAdd },
}));

const mockShow = vi.fn();
vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({ show: mockShow }),
}));

vi.mock("@/components/home/product-list", () => ({
  ProductList: () => <div data-testid="related-products">Related</div>,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { ProductView } from "./product-view";
import { MOCK_PRODUCTS } from "@/lib/api/products";

import { render, screen, fireEvent } from "@testing-library/react";
import { ProductView } from "./product-view";
import { MOCK_PRODUCTS } from "@/lib/api/products";
import { moneyFormat } from "@/lib/utils";

describe("Componente ProductView", () => {
  const produto = MOCK_PRODUCTS[0];

  /*it("deve renderizar as informações básicas do produto", () => {
    render(<ProductView product={produto} />);

    const preco = moneyFormat(produto.price).replace("R$", "R\\$").trim();

    expect(screen.getByText(produto.name)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(preco, "i"), { exact: false })
    ).toBeInTheDocument();
  });*/

  it("deve permitir trocar a imagem principal ao clicar na miniatura", () => {
    render(<ProductView product={produto} />);
    const miniaturas = screen.getAllByRole("button");
    fireEvent.click(miniaturas[1]);
    expect(miniaturas[1]).toHaveClass("ring-yellow-400");
  });

  it("deve chamar o toast e adicionar ao carrinho ao clicar no botão", () => {
    render(<ProductView product={produto} />);
    const botao = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });

    fireEvent.click(botao);

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(produto);
    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringMatching(/adicionado ao carrinho/i),
      })
    );
  });

  it("deve renderizar a seção de produtos relacionados", () => {
    render(<ProductView product={produto} />);
    expect(screen.getByTestId("related-products")).toBeInTheDocument();
  });
});
