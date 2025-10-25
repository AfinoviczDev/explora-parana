# Paraná em Foto

Um guia turístico digital do Paraná, com cartões das cidades e páginas dedicadas para cada uma, incluindo pontos turísticos, restaurantes e hotéis.

## Por que este stack?

- **Next.js + React**: rápido, moderno e fácil de escalar; renderização no servidor melhora SEO (importante para turismo).
- **Tailwind CSS**: produtividade no visual sem precisar escrever CSS do zero.
- **Supabase (Postgres + Storage)**: banco de dados e imagens gerenciados, com painel web para você/cliente alimentar o site.
- **API Routes**: endpoints simples para inserir/editar dados (admin), sem expor sua chave secreta.

## Requisitos

- Node 18+ (ou 20+ recomendado)
- Conta no [Supabase](https://supabase.com)
- VS Code

## Passo a passo

1. **Criar projeto no Supabase**
   - Copie a `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Settings → API).
   - Copie também a `SUPABASE_SERVICE_ROLE_KEY` (guarde com cuidado; não vai para o front).

2. **Criar as tabelas**
   - No Supabase → SQL Editor → rode `sql/schema.sql` deste projeto.
   - Em seguida rode `sql/policies.sql` para habilitar leitura pública segura.

3. **Configurar env**
   - Crie um arquivo `.env.local` na raiz copiando `.env.example` e preenchendo:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (usado só no servidor)
     - `ADMIN_TOKEN` (um segredo simples para acessar o /admin e APIs de escrita)

4. **Instalar e rodar**
   ```bash
   npm install
   npm run dev
   ```
   Acesse `http://localhost:3000`.

5. **Alimentar conteúdo**
   - Visite `/admin`, insira o `ADMIN_TOKEN` e cadastre cidades, pontos, restaurantes e hotéis.
   - Você também pode inserir dados direto pelo painel do Supabase.

## Deploy

- **Front**: Vercel (recomendado). Configure as variáveis de ambiente no painel da Vercel.
- **Banco/Imagens**: Supabase.
- Domínio: aponte seu domínio para a Vercel.

## Estrutura

- `app/` páginas (App Router do Next)
- `components/` componentes reutilizáveis
- `lib/` clientes do Supabase (admin/server e público)
- `sql/` schema e policies do banco

## Roadmap (opcional)
- Busca, filtros (preço, categoria), mapas (Leaflet/MapLibre), avaliações reais, otimização de imagens, breadcrumbs, sitemap/SEO.

Boa construção! 🚀
