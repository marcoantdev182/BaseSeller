import type { Product } from "@/types/product";

export const initialProducts: Product[] = [
  {
    id: "aurora-watch",
    name: "Relogio Aurora",
    slug: "relogio-aurora",
    description:
      "Caixa em aco escovado, pulseira ajustavel e mostrador limpo para acompanhar dias intensos com presenca.",
    price: 849.9,
    category: "Acessorios",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 12,
    featured: true,
    variations: [
      { label: "Pulseira", options: ["Grafite", "Couro preto"] },
      { label: "Tamanho", options: ["40 mm", "44 mm"] },
    ],
  },
  {
    id: "noir-headphones",
    name: "Headphone Noir",
    slug: "headphone-noir",
    description:
      "Som imersivo, almofadas macias e cancelamento passivo para uma rotina que pede foco e textura.",
    price: 1299,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 8,
    featured: true,
    variations: [{ label: "Cor", options: ["Preto", "Prata"] }],
  },
  {
    id: "solstice-sneaker",
    name: "Tenis Solstice",
    slug: "tenis-solstice",
    description:
      "Silhueta urbana com sola leve, recortes precisos e conforto para atravessar a cidade sem perder ritmo.",
    price: 679.9,
    category: "Moda",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 15,
    featured: true,
    variations: [
      { label: "Numero", options: ["38", "39", "40", "41", "42"] },
      { label: "Cor", options: ["Vermelho", "Off-white"] },
    ],
  },
  {
    id: "frame-camera",
    name: "Camera Frame",
    slug: "camera-frame",
    description:
      "Camera compacta para registros nitidos, corpo retro e controles rapidos para fotografar em movimento.",
    price: 2190,
    category: "Tecnologia",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 5,
    featured: false,
    variations: [{ label: "Kit", options: ["Corpo", "Corpo + lente"] }],
  },
  {
    id: "lumen-glasses",
    name: "Oculos Lumen",
    slug: "oculos-lumen",
    description:
      "Lentes de protecao UV e armação minimalista para luz forte, viagens e dias que pedem leveza.",
    price: 389,
    category: "Acessorios",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 20,
    featured: false,
    variations: [{ label: "Lente", options: ["Fume", "Verde"] }],
  },
  {
    id: "atlas-bag",
    name: "Bolsa Atlas",
    slug: "bolsa-atlas",
    description:
      "Volume inteligente, acabamento resistente e divisorias para trabalhar, viajar e manter tudo a mao.",
    price: 559,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=1200&q=80",
    ],
    stock: 10,
    featured: false,
    variations: [{ label: "Acabamento", options: ["Preto", "Oliva"] }],
  },
];

