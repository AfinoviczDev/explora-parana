-- Schema de dados para Paraná em Foto

create table if not exists public.cities (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  description text,
  state text not null default 'PR',
  population bigint,
  area_km2 numeric,
  lat numeric,
  lng numeric,
  banner_image_url text,
  created_at timestamp with time zone default now()
);

create table if not exists public.attractions (
  id bigserial primary key,
  city_id bigint references public.cities(id) on delete cascade,
  name text not null,
  description text,
  category text, -- ex: 'parque', 'museu'
  image_url text,
  website_url text,
  address text,
  open_hours text,
  price text,
  created_at timestamp with time zone default now()
);

create table if not exists public.restaurants (
  id bigserial primary key,
  city_id bigint references public.cities(id) on delete cascade,
  name text not null,
  description text,
  cuisine text,
  price_range text, -- ex: 'R$ - $$$'
  image_url text,
  website_url text,
  address text,
  phone text,
  rating numeric, -- 0-5
  created_at timestamp with time zone default now()
);

create table if not exists public.hotels (
  id bigserial primary key,
  city_id bigint references public.cities(id) on delete cascade,
  name text not null,
  description text,
  stars int,
  nightly_price numeric, -- preço por noite
  image_url text,
  website_url text,
  address text,
  phone text,
  created_at timestamp with time zone default now()
);
