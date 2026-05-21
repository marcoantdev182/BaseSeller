"use client";

import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { getDefaultSelections } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import { ArrowLeft, MessageCircleMore, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { products, hydrated } = useProducts();
  const { addItem } = useCart();
  const product = products.find((candidate) => candidate.id === params.id);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  if (!hydrated) {
    return (
      <section className="px-6 pb-24 pt-36">
        <div className="surface-line mx-auto max-w-7xl rounded-lg bg-white/[0.05] p-6 text-white/68">
          Carregando produto...
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="px-6 pb-24 pt-36">
        <div className="surface-line mx-auto grid max-w-xl gap-4 rounded-lg bg-white/[0.06] p-6">
          <h1 className="text-3xl font-semibold">Produto nao encontrado</h1>
          <Link className={buttonStyles("secondary", "w-fit")} href="/produtos">
            Voltar ao catalogo
          </Link>
        </div>
      </section>
    );
  }

  const selectedProduct = product;
  const selectedOptions = {
    ...getDefaultSelections(selectedProduct),
    ...selections,
  };

  function addSelectedProduct() {
    addItem(selectedProduct, selectedOptions);
    setMessage("Produto adicionado ao carrinho.");
  }

  function buySelectedProduct() {
    addSelectedProduct();
    router.push("/checkout");
  }

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-7xl gap-8">
        <Link className={buttonStyles("ghost", "surface-line w-fit")} href="/produtos">
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="grid gap-4">
            <div className="surface-line relative aspect-[4/4.5] overflow-hidden rounded-lg bg-white/[0.05]">
              <Image
                alt={product.name}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={product.image}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.gallery.map((image) => (
                <div
                  className="surface-line relative aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.05]"
                  key={image}
                >
                  <Image
                    alt={`${product.name} detalhe`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-6">
            <div className="grid gap-4 border-b border-white/10 pb-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{product.category}</Badge>
                <Badge>{product.stock} em estoque</Badge>
              </div>
              <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-[var(--gold)]">
                {formatCurrency(product.price)}
              </p>
              <p className="max-w-xl leading-8 text-white/68">
                {product.description}
              </p>
            </div>

            {product.variations.length ? (
              <div className="grid gap-4">
                {product.variations.map((variation) => (
                  <label className="grid gap-2 text-sm text-white/72" key={variation.label}>
                    <span>{variation.label}</span>
                    <select
                      className="surface-line min-h-12 rounded-md bg-[#0c1015] px-4 text-white outline-none focus:border-[var(--cyan)]"
                      onChange={(event) =>
                        setSelections((currentSelections) => ({
                          ...currentSelections,
                          [variation.label]: event.target.value,
                        }))
                      }
                      value={selectedOptions[variation.label] ?? variation.options[0]}
                    >
                      {variation.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            ) : null}

            {message ? (
              <p className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/72">
                {message}
              </p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button disabled={!product.stock} onClick={addSelectedProduct} type="button">
                <ShoppingBag className="size-4" />
                Adicionar ao carrinho
              </Button>
              <Button
                disabled={!product.stock}
                onClick={buySelectedProduct}
                type="button"
                variant="secondary"
              >
                <MessageCircleMore className="size-4" />
                Comprar pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
