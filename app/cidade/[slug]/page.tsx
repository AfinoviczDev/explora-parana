import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSupabasePublic } from '@/lib/supabasePublic'
import CityHeroSplit from '@/components/CityHeroSplit'
import DeckColumn, { type DeckItem } from '@/components/DeckColumn'
import RestaurantShowcase, { type RestaurantItem } from '@/components/RestaurantShowcase'
import HotelGrid, { type HotelItem } from '@/components/HotelGrid'

// NOVO:
import AttractionShowcase from '@/components/AttractionShowcase'
import type { AttractionItem } from '@/components/AttractionShowcase'

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
      <AttractionShowcase items={attractions} title="" />

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
