export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  rating: number;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "o-amor-me-amou",
    name: "O Amor Me Amou",
    description: "Camiseta inspirada no amor incondicional de Cristo.",
    price: 89,
    images: [
      "/products/o-amor-me-amou-red.png",
      "/products/o-amor-me-amou-black.png",
      "/products/o-amor-me-amou-white.png",
      "/products/o-amor-me-amou-blue.png",
      "/products/o-amor-me-amou-gray.png",
    ],
    stock: 12,
    rating: 5,
  },
  {
    id: "2",
    slug: "nunca-foi-sorte",
    name: "Nunca Foi Sorte",
    description: "Nunca foi sorte — sempre foi Deus. Declare sua fé.",
    price: 89,
    images: [
      "/products/nunca-foi-sorte-black-fem.png",
      "/products/nunca-foi-sorte-black.png",
    ],
    stock: 8,
    rating: 5,
  },
  {
    id: "3",
    slug: "buscai-primeiro-o-reino",
    name: "Buscai primeiro o Reino de Deus",
    description: "E as demais coisas vos serão acrescentadas",
    price: 89,
    images: [
      "/products/buscai-primeiro-blue.png",
      "/products/buscai-primeiro-white.png",
    ],
    stock: 5,
    rating: 4.5,
  },
  {
    id: "4",
    slug: "yhwh",
    name: "Y H V H - Esse é o meu nome eternamente",
    description: "O nome eterno do Senhor dos Exércitos",
    price: 89,
    images: [
      "/products/yhwh-white.png",
      "/products/yhwh-blue.png",
      "/products/yhwh-green.png",
      "/products/yhwh-black.png",
    ],
    stock: 5,
    rating: 4.5,
  },
];

export async function getProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
