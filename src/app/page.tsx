import { RevealText } from "@/components/animations/RevealText";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { ScrollIndicator } from "@/components/animations/ScrollIndicator";
import { ProductGrid } from "@/components/products/ProductGrid";
import { buttonStyles } from "@/components/ui/Button";
import { initialProducts } from "@/data/products";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = ["Acessorios", "Audio", "Moda", "Tecnologia", "Lifestyle"];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Conta verificada",
    description: "Checkout liberado apenas para clientes autenticados e verificados.",
  },
  {
    icon: Truck,
    title: "Carrinho persistente",
    description: "Produtos e quantidades continuam disponiveis no dispositivo.",
  },
  {
    icon: Sparkles,
    title: "Pedido direto",
    description: "Resumo formatado para seguir a conversa no WhatsApp.",
  },
];

export default function Home() {
  const featuredProducts = initialProducts.filter((product) => product.featured);

  return (
    <>
      <section className="relative min-h-svh overflow-hidden px-6 pb-28 pt-36">
        <Image
          alt="Vitrine premium de produtos"
          className="hero-atmosphere object-cover"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.94),rgba(5,7,10,0.58)_48%,rgba(5,7,10,0.84))]" />
        <div className="film-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080a0d] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100svh-12rem)] max-w-7xl content-center gap-8">
          <RevealText className="grid max-w-4xl gap-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
              Base moderna para vender
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
              BaseSeller
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Uma loja cinematografica com catalogo, conta local, carrinho
              persistente e pedidos preparados para o WhatsApp.
            </p>
          </RevealText>
          <RevealText className="flex flex-col gap-3 sm:flex-row" delay={0.18}>
            <Link className={buttonStyles("primary")} href="/produtos">
              Explorar produtos
              <ArrowRight className="size-4" />
            </Link>
            <Link className={buttonStyles("secondary")} href="/carrinho">
              Ver carrinho
            </Link>
          </RevealText>
        </div>
        <ScrollIndicator />
      </section>

      <section className="relative z-10 -mt-14 px-6">
        <ScrollFadeIn className="surface-line mx-auto flex max-w-7xl flex-wrap gap-2 rounded-lg bg-[#0d1217]/92 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl">
          {categories.map((category) => (
            <span
              className="rounded-md border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/78"
              key={category}
            >
              {category}
            </span>
          ))}
        </ScrollFadeIn>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10">
          <ScrollFadeIn className="grid max-w-3xl gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
              Destaques
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-5xl">
              Produtos prontos para abrir a jornada de compra.
            </h2>
          </ScrollFadeIn>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section className="border-y border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <ScrollFadeIn
              className="grid gap-4 border-l border-white/12 py-3 pl-5"
              delay={index * 0.08}
              key={title}
            >
              <Icon className="size-6 text-[var(--ember)]" />
              <div className="grid gap-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="leading-7 text-white/62">{description}</p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <ScrollFadeIn className="mx-auto grid max-w-7xl gap-6 border-y border-white/10 py-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid max-w-3xl gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Checkout conversacional
            </p>
            <h2 className="text-balance text-3xl font-semibold sm:text-5xl">
              Monte o pedido aqui e continue a venda no WhatsApp.
            </h2>
          </div>
          <Link className={buttonStyles("primary")} href="/checkout">
            Ir ao checkout
            <ArrowRight className="size-4" />
          </Link>
        </ScrollFadeIn>
      </section>
    </>
  );
}
