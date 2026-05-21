import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="grid max-w-md gap-4">
          <span className="text-lg font-semibold uppercase tracking-[0.2em]">
            BaseSeller
          </span>
          <p className="text-sm leading-7 text-white/62">
            Estrutura de loja pronta para catalogo, conta local, carrinho e
            pedidos conduzidos no WhatsApp.
          </p>
        </div>
        <div className="grid content-start gap-3 text-sm text-white/68">
          <span className="font-semibold text-white">Loja</span>
          <Link href="/produtos">Produtos</Link>
          <Link href="/carrinho">Carrinho</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
        <div className="grid content-start gap-3 text-sm text-white/68">
          <span className="font-semibold text-white">Conta</span>
          <Link href="/cadastro">Cadastro</Link>
          <Link href="/minha-conta">Minha conta</Link>
          <Link href="/minha-conta/verificacao">Verificacao</Link>
        </div>
      </div>
    </footer>
  );
}

