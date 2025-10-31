import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSupabasePublic } from '@/lib/supabasePublic'
import CityHeroSplit from '@/components/CityHeroSplit'
import DeckColumn, { type DeckItem } from '@/components/DeckColumn'
import RestaurantShowcase, { type RestaurantItem } from '@/components/RestaurantShowcase'
import HotelGrid, { type HotelItem } from '@/components/HotelGrid'

// ❌ Removido o carrossel
// import AttractionShowcase from '@/components/AttractionShowcase'
// import type { AttractionItem } from '@/components/AttractionShowcase'

// Se você já usa CitySection + CityCards para as outras seções:
import CitySection from '@/components/CitySection'
import {
  RestaurantCard,
  HotelCard,
  type Restaurant,
  type Hotel,
} from '@/components/CityCards'

/** usamos Container apenas para alinhar os títulos como o restante do conteúdo */
import Container from '@/components/Container'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = getSupabasePublic()
  const { data: city } = await supabase
    .from('cities')
    .select('name, description')
    .eq('slug', params.slug)
    .single()
  if (!city) return {}
  return {
    title: `${city.name} — Paraná em Foto`,
    description: city.description || `Descubra ${city.name} no Paraná em Foto`,
  }
}

type AttractionItem = {
  id: number
  name: string
  description?: string | null
  image_url?: string | null
  // outros campos que você tenha… (não são obrigatórios para este grid)
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const supabase = getSupabasePublic()

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!city) return notFound()

  const [attractionsRes, restaurantsRes, hotelsRes] = await Promise.all([
    supabase.from('attractions').select('*').eq('city_id', city.id).order('name'),
    supabase.from('restaurants').select('*').eq('city_id', city.id).order('name'),
    supabase.from('hotels').select('*').eq('city_id', city.id).order('name'),
  ])

  const restaurants = (restaurantsRes.data || []) as RestaurantItem[]
  const attractions = (attractionsRes.data || []) as AttractionItem[]
  const hotels = (hotelsRes.data || []) as HotelItem[]

  return (
    // sem bg sólido para deixar o SiteBackground aparecer
    <div className="min-h-screen text-white">
      {/* HERO dividido */}
      <CityHeroSplit
        name={city.name}
        description={city.description}
        banner={city.banner_image_url}
        transitionName={`city-image-${city.id}`}
      />

      {/* Pontos Turísticos — TÍTULO CENTRALIZADO */}
      <Container>
        {/* (reduzido) antes: mt-10  →  agora: mt-4 */}
        <div className="mt-4">
          <LocalTitle eyebrow="Explorar" className="items-center text-center">
            Pontos turísticos
          </LocalTitle>
        </div>
      </Container>
      {/* ✅ Grid simples no lugar do carrossel */}
      <CitySection id="pontos" title="" subtitle="" variant="block">
        {attractions.length ? (
          <SimpleAttractionsGrid items={attractions} />
        ) : (
          <EmptySlot text="Ainda não cadastramos pontos turísticos nesta cidade." />
        )}
      </CitySection>

      {/* Restaurantes — TÍTULO À ESQUERDA */}
      <Container>
        {/* (reduzido) antes: mt-10  →  agora: mt-4 */}
        <div className="mt-4">
          <LocalTitle eyebrow="Sabores">Onde comer</LocalTitle>
        </div>
      </Container>
      <RestaurantShowcase items={restaurants} title="" />

      {/* Hotéis — TÍTULO À ESQUERDA */}
      <Container>
        {/* (reduzido) antes: mt-10  →  agora: mt-4 */}
        <div className="mt-4">
          <LocalTitle eyebrow="Hospedagem">Onde ficar</LocalTitle>
        </div>
      </Container>
      <CitySection id="hoteis" title="" subtitle="" variant="block">
        {hotels.length ? (
          <HotelGrid items={hotels} />
        ) : (
          <EmptySlot text="Ainda não cadastramos hotéis para esta cidade." />
        )}
      </CitySection>

      <div className="h-10" />
    </div>
  )
}

/** ---------- Grid simples de atrações (sem carrossel) ---------- */
function SimpleAttractionsGrid({ items }: { items: AttractionItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((a) => (
        <AttractionCard key={a.id} item={a} />
      ))}
    </div>
  )
}

function AttractionCard({ item }: { item: AttractionItem }) {
  const img =
    item.image_url ||
    // fallback leve
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=60'

  return (
    <a
      href={`/atracao/${item.id}`}
      className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* use <img> simples para não depender de next/image aqui */}
        <img
          src={img}
          alt={item.name}
          className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* label sutil */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[11px] font-medium text-white/90">
          Explora Paraná
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#E5DCC9]">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-1 text-sm text-white/80 line-clamp-2">
            {item.description}
          </p>
        ) : null}

        <div className="mt-4">
          <span className="inline-flex items-center text-[12px] text-white/70">
            Ver detalhes →
          </span>
        </div>
      </div>
    </a>
  )
}

/** ---------- Somente estilização de título (local a esta página) ---------- */
function LocalTitle({
  children,
  eyebrow,
  className,
}: {
  children: React.ReactNode
  eyebrow?: string
  className?: string
}) {
  // (reduzido) antes: 'mb-6 flex flex-col'  →  agora: 'mb-2 flex flex-col'
  const base = 'mb-2 flex flex-col'
  return (
    <div className={className ? `${base} ${className}` : base}>
      {eyebrow ? (
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#E5DCC9] drop-shadow-[0_1px_8px_rgba(0,0,0,.25)]">
        {children}
      </h2>
      <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
    </div>
  )
}

function EmptySlot({ text }: { text: string }) {
  return (
    <div
      className="snap-start shrink-0 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] rounded-2xl border border-white/20 bg-white/5 text-white/80 grid place-items-center text-center p-6"
      style={{ aspectRatio: '3 / 4' }}
    >
      <p className="text-sm">{text}</p>
    </div>
  )
}
