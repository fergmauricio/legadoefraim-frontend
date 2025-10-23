import { useCartStore } from "./use-cart-store";
import { MOCK_PRODUCTS } from "@/lib/api/products";

describe("Store do carrinho (Zustand)", () => {
  beforeEach(() => {
    const { clear } = useCartStore.getState();
    clear();
  });

  it("deve adicionar e remover itens corretamente", () => {
    const { add, remove, totalItems } = useCartStore.getState();

    add(MOCK_PRODUCTS[0]);
    expect(totalItems()).toBe(1);

    remove(MOCK_PRODUCTS[0].id);
    expect(totalItems()).toBe(0);
  });

  it("deve aumentar e diminuir a quantidade de um item", () => {
    const { add, increase, decrease } = useCartStore.getState();

    add(MOCK_PRODUCTS[0]);

    increase(MOCK_PRODUCTS[0].id);
    let novoEstado = useCartStore.getState();
    expect(novoEstado.items[0].quantity).toBe(2);

    decrease(MOCK_PRODUCTS[0].id);
    novoEstado = useCartStore.getState();
    expect(novoEstado.items[0].quantity).toBe(1);
  });

  it("deve calcular corretamente o preço total", () => {
    const { add, totalPrice } = useCartStore.getState();

    add(MOCK_PRODUCTS[0]);
    add(MOCK_PRODUCTS[1]);
    const totalEsperado = MOCK_PRODUCTS[0].price + MOCK_PRODUCTS[1].price;
    expect(totalPrice()).toBe(totalEsperado);
  });
});
