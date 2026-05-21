"use client";

import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import {
  createLocalProductImage,
  isLocalProductImage,
} from "@/lib/productImages";
import type { Product, ProductVariation } from "@/types/product";
import { ImagePlus, LoaderCircle, Save, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProductFormProps = {
  initialProduct?: Product;
  submitLabel: string;
  onSubmit: (product: Product) => void;
};

const MAX_GALLERY_IMAGES = 4;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createProductId(name: string) {
  const slug = slugify(name);
  return slug || `produto-${Date.now()}`;
}

function stringifyVariations(variations: ProductVariation[]) {
  return variations
    .map((variation) => `${variation.label}: ${variation.options.join(", ")}`)
    .join("\n");
}

function parseVariations(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, options] = line.split(":");

      return {
        label: label.trim(),
        options: (options ?? "")
          .split(",")
          .map((option) => option.trim())
          .filter(Boolean),
      };
    })
    .filter((variation) => variation.label && variation.options.length);
}

export function ProductForm({
  initialProduct,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [description, setDescription] = useState(
    initialProduct?.description ?? "",
  );
  const [price, setPrice] = useState(String(initialProduct?.price ?? ""));
  const [category, setCategory] = useState(initialProduct?.category ?? "");
  const [image, setImage] = useState(initialProduct?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(
    initialProduct?.gallery ?? [],
  );
  const [stock, setStock] = useState(String(initialProduct?.stock ?? 0));
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);
  const [variations, setVariations] = useState(
    stringifyVariations(initialProduct?.variations ?? []),
  );
  const [message, setMessage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);

  const previewSlug = useMemo(() => slugify(name), [name]);

  async function loadMainImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setLoadingImage(true);

    try {
      setImage(await createLocalProductImage(file));
      setMessage("Imagem principal carregada do dispositivo.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Nao foi possivel carregar a imagem.",
      );
    } finally {
      setLoadingImage(false);
    }
  }

  async function loadGalleryImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (!files.length) {
      return;
    }

    const remainingSlots = MAX_GALLERY_IMAGES - gallery.length;

    if (remainingSlots <= 0) {
      setMessage(`A galeria aceita ate ${MAX_GALLERY_IMAGES} imagens.`);
      return;
    }

    setLoadingGallery(true);

    try {
      const images = await Promise.all(
        files
          .slice(0, remainingSlots)
          .map((file) => createLocalProductImage(file)),
      );

      setGallery((currentGallery) => [...currentGallery, ...images]);
      setMessage(
        files.length > remainingSlots
          ? `Apenas ${remainingSlots} imagens foram adicionadas.`
          : "Galeria carregada do dispositivo.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel carregar a galeria.",
      );
    } finally {
      setLoadingGallery(false);
    }
  }

  function submitProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !description.trim() || !category.trim() || !image.trim()) {
      setMessage("Preencha nome, descricao, categoria e selecione uma imagem.");
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setMessage("Informe um preco valido.");
      return;
    }

    if (Number.isNaN(numericStock) || numericStock < 0) {
      setMessage("Informe um estoque valido.");
      return;
    }

    onSubmit({
      id: initialProduct?.id ?? createProductId(name),
      name: name.trim(),
      slug: previewSlug || initialProduct?.slug || createProductId(name),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      image: image.trim(),
      gallery,
      stock: numericStock,
      featured,
      variations: parseVariations(variations),
    });

    setMessage("Produto salvo no catalogo local.");
  }

  return (
    <form className="surface-line grid gap-5 rounded-lg bg-white/[0.06] p-5" onSubmit={submitProduct}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Nome" onChange={(event) => setName(event.target.value)} value={name} />
        <Input
          label="Slug"
          onChange={(event) => setName(event.target.value)}
          readOnly
          value={previewSlug}
        />
        <Input
          label="Preco"
          min="0"
          onChange={(event) => setPrice(event.target.value)}
          step="0.01"
          type="number"
          value={price}
        />
        <Input
          label="Estoque"
          min="0"
          onChange={(event) => setStock(event.target.value)}
          type="number"
          value={stock}
        />
        <Input
          label="Categoria"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        />
      </div>
      <section className="grid gap-4 md:grid-cols-[1fr_15rem]">
        <div className="grid gap-3">
          <span className="text-sm text-white/72">Imagem principal</span>
          <label className="surface-line relative flex min-h-28 cursor-pointer flex-col justify-center gap-2 rounded-md bg-black/25 px-4 py-4 text-white/72 transition hover:border-white/25 hover:bg-white/[0.08]">
            <span className="flex items-center gap-2 font-semibold text-white">
              {loadingImage ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ImagePlus className="size-4" />
              )}
              {image ? "Trocar imagem" : "Selecionar imagem"}
            </span>
            <span className="text-sm leading-6">
              Carregue do PC ou celular. O navegador otimiza o arquivo para o
              catalogo local.
            </span>
            <input
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={loadingImage}
              onChange={loadMainImage}
              type="file"
            />
          </label>
        </div>
        <div className="surface-line relative aspect-square overflow-hidden rounded-md bg-white/[0.04]">
          {image ? (
            <Image
              alt={name ? `Preview de ${name}` : "Preview do produto"}
              className="object-cover"
              fill
              sizes="240px"
              src={image}
              unoptimized={isLocalProductImage(image)}
            />
          ) : (
            <div className="grid h-full place-items-center p-4 text-center text-sm text-white/42">
              Preview da imagem
            </div>
          )}
        </div>
      </section>
      <TextArea
        label="Descricao"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <section className="grid gap-3">
        <span className="text-sm text-white/72">
          Galeria do produto ({gallery.length}/{MAX_GALLERY_IMAGES})
        </span>
        <label className="surface-line relative flex min-h-24 cursor-pointer items-center gap-3 rounded-md bg-black/25 px-4 py-4 text-white/72 transition hover:border-white/25 hover:bg-white/[0.08]">
          {loadingGallery ? (
            <LoaderCircle className="size-5 animate-spin shrink-0" />
          ) : (
            <ImagePlus className="size-5 shrink-0" />
          )}
          <span className="grid gap-1">
            <span className="font-semibold text-white">
              Adicionar imagens da galeria
            </span>
            <span className="text-sm">
              Selecione ate {MAX_GALLERY_IMAGES} imagens complementares.
            </span>
          </span>
          <input
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            disabled={loadingGallery || gallery.length >= MAX_GALLERY_IMAGES}
            multiple
            onChange={loadGalleryImages}
            type="file"
          />
        </label>
        {gallery.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((galleryImage, index) => (
              <div
                className="surface-line relative aspect-square overflow-hidden rounded-md bg-white/[0.04]"
                key={`${galleryImage.slice(0, 32)}-${index}`}
              >
                <Image
                  alt={`Galeria ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 50vw, 220px"
                  src={galleryImage}
                  unoptimized={isLocalProductImage(galleryImage)}
                />
                <button
                  aria-label={`Remover imagem ${index + 1} da galeria`}
                  className="absolute right-2 top-2 grid size-9 place-items-center rounded-md border border-white/14 bg-black/70 text-white transition hover:bg-black"
                  onClick={() =>
                    setGallery((currentGallery) =>
                      currentGallery.filter((_, currentIndex) => currentIndex !== index),
                    )
                  }
                  title="Remover imagem"
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </section>
      <TextArea
        label="Variacoes, uma linha por grupo"
        onChange={(event) => setVariations(event.target.value)}
        placeholder="Cor: Preto, Prata"
        value={variations}
      />
      <label className="flex items-center gap-3 text-sm text-white/76">
        <input
          checked={featured}
          className="size-4 accent-[var(--gold)]"
          onChange={(event) => setFeatured(event.target.checked)}
          type="checkbox"
        />
        Produto em destaque
      </label>
      {message ? (
        <p className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/72">
          {message}
        </p>
      ) : null}
      <Button className="w-fit" type="submit">
        <Save className="size-4" />
        {submitLabel}
      </Button>
    </form>
  );
}
