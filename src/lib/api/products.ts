export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  description_en: string;
  price: number;
  images: string[];
  stock: number;
  rating: number;
  sales: number;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "o-amor-me-amou",
    name: "O Amor Me Amou",
    description: "Camiseta inspirada no amor incondicional de Cristo.",
    description_en: "T-shirt inspired by the unconditional love of Christ.",
    price: 89,
    images: [
      "/products/o-amor-me-amou-red.png",
      "/products/o-amor-me-amou-black.png",
      "/products/o-amor-me-amou-white.png",
      "/products/o-amor-me-amou-blue.png",
      "/products/o-amor-me-amou-gray.png",
    ],
    stock: 12,
    rating: 4.9,
    sales: 430,
  },
  {
    id: "2",
    slug: "nunca-foi-sorte",
    name: "Nunca Foi Sorte",
    description: "Nunca foi sorte — sempre foi Deus. Declare sua fé.",
    description_en: "It was never luck—it was always God. Declare your faith.",
    price: 89,
    images: [
      "/products/nunca-foi-sorte-black-fem.png",
      "/products/nunca-foi-sorte-black.png",
    ],
    stock: 8,
    rating: 4.7,
    sales: 612,
  },
  {
    id: "3",
    slug: "buscai-primeiro-o-reino",
    name: "Buscai primeiro o Reino de Deus",
    description: "E as demais coisas vos serão acrescentadas",
    description_en: "And all other things will be added to you",
    price: 89,
    images: [
      "/products/buscai-primeiro-blue.png",
      "/products/buscai-primeiro-white.png",
    ],
    stock: 5,
    rating: 4.5,
    sales: 176,
  },
  {
    id: "4",
    slug: "yhwh",
    name: "Y H V H - Esse é o meu nome eternamente",
    description: "O nome eterno do Senhor dos Exércitos",
    description_en: "The eternal name of the Lord of hosts",
    price: 89,
    images: [
      "/products/yhwh-white.png",
      "/products/yhwh-blue.png",
      "/products/yhwh-green.png",
      "/products/yhwh-black.png",
    ],
    stock: 5,
    rating: 4.7,
    sales: 61,
  },
  {
    id: "5",
    slug: "shalom",
    name: "Shalom",
    description: "A paz que excede todo entendimento",
    description_en: "The peace that surpasses all understanding",
    price: 79,
    images: ["/products/shalom-white.png", "/products/shalom-black.png"],
    stock: 2,
    rating: 4.9,
    sales: 12,
  },
  {
    id: "6",
    slug: "fe-move-montanhas",
    name: "A Fé Move Montanhas",
    description: "A fé que pode mover montanhas",
    description_en: "The faith that can move mountains",
    price: 99,
    images: ["/products/fe-move-montanhas-white.png"],
    stock: 32,
    rating: 5,
    sales: 102,
  },
  {
    id: "7",
    slug: "holy-spirit",
    name: "Holy Spirit",
    description: "Eis que vos envio o consolador",
    description_en: "Behold, I send you the comforter",
    price: 99,
    images: ["/products/holy-spirit-white.png"],
    stock: 77,
    rating: 4.9,
    sales: 94,
  },
  {
    id: "8",
    slug: "onde-esta-morte",
    name: "Onde está ó morte o seu aguilhão?",
    description: "Ele venceu a morte na cruz",
    description_en: "He conquered death on the cross",
    price: 79,
    images: [
      "/products/onde-esta-morte-white.jpg",
      "/products/onde-esta-morte-black.png",
    ],
    stock: 15,
    rating: 4.6,
    sales: 16,
  },
];

export async function getProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
