'use client'

import Link from 'next/link'

export type Attraction = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
  city_id?: number | string
}

export type Restaurant = {
  id: number | string
  name: string
  description?: string | null
  price_range?: string | null
  rating?: number | null
  image_url?: string | null
}

export type Hotel = {
  id: number | string
  name: string
  description?: string | null
  nightly_price?: number | null
  image_url?: string | null
}

const fallback =
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'

export function AttractionCard({ item, href }: { item: Attraction; href?: string }) {
  return (
    <CardBase image={item.image_url || fallback}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
          {item.description && (
            <p className="text-xs text-white/80 line-clamp-2">{item.description}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 bg-white text-[#2B4940] rounded-xl px-3 py-1.5 text-xs font-semibold hover:bg-white/90 transition"
          >
            Ver <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </CardBase>
  )
}

export function RestaurantCard({ item }: { item: Restaurant }) {
  return (
    <CardBase image={item.image_url || fallback}>
      <div>
        <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
        <p className="text-xs text-white/80">
          {item.price_range ? `Faixa: ${item.price_range}` : '—'}
          {typeof item.rating === 'number' && ` · ⭐ ${item.rating.toFixed(1)}`}
        </p>
      </div>
    </CardBase>
  )
}

export function HotelCard({ item }: { item: Hotel }) {
  const price =
    typeof item.nightly_price === 'number'
      ? item.nightly_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : null
  return (
    <CardBase image={item.image_url || fallback}>
      <div>
        <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
        <p className="text-xs text-white/80">{price ? `Diárias a partir de ${price}` : '—'}</p>
      </div>
    </CardBase>
  )
}

function CardBase({ image, children }: { image: string; children: React.ReactNode }) {
  return (
    <div
      className="snap-start shrink-0 w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/10 relative"
      style={{ aspectRatio: '3 / 4' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent text-white">
        {children}
      </div>
    </div>
  )
}
