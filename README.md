# BaseSeller

Base moderna de e-commerce em Next.js com App Router, TypeScript, Tailwind CSS,
GSAP, ScrollTrigger e Lenis.

## Rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Fluxo local

- Produtos, carrinho, usuarios e pedidos usam mocks e `localStorage`.
- Imagens cadastradas no admin podem ser carregadas do dispositivo e sao
  otimizadas no navegador antes de entrar no catalogo local.
- O checkout exige login e conta verificada.
- A verificacao e simulada em `/minha-conta/verificacao`.
- O numero da loja fica em `src/lib/whatsapp.ts` na constante
  `STORE_WHATSAPP_NUMBER`.

## Admin demo

- E-mail: `admin@baseseller.dev`
- Senha: `baseseller123`

## Rotas principais

- `/`, `/produtos`, `/produtos/[id]`
- `/carrinho`, `/checkout`
- `/login`, `/cadastro`
- `/minha-conta`, `/minha-conta/verificacao`, `/pedidos`
- `/admin`, `/admin/produtos`, `/admin/produtos/novo`,
  `/admin/produtos/[id]/editar`
