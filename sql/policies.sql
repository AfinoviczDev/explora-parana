-- Habilita RLS
alter table public.cities enable row level security;
alter table public.attractions enable row level security;
alter table public.restaurants enable row level security;
alter table public.hotels enable row level security;

-- Política: leitura pública para todos
create policy if not exists "public read cities" on public.cities for select using (true);
create policy if not exists "public read attractions" on public.attractions for select using (true);
create policy if not exists "public read restaurants" on public.restaurants for select using (true);
create policy if not exists "public read hotels" on public.hotels for select using (true);

-- Escrita: apenas via Service Role (APIs no servidor) -> sem política extra necessária.
-- (o Service Role ignora RLS). Se quiser permitir usuários autenticados a escrever,
-- crie políticas específicas usando auth.uid().
