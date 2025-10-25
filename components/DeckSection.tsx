'use client'

import { useMemo, useState } from 'react'
import Modal from './Modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type DeckItem = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
  // campos opcionais para restaurantes/hotéis
  price_range?: string | null
  rating?: number | null
  nightly_price?: number | null
  address?: string | null
  website_url?: string | null
  open_hours?: string | null
  price?: string | number | null
}

type DeckSectionProps = {
  title: string
  subtitle?: string
  items: DeckItem[]
  kind: 'pontos' | 'restaurantes' | 'hoteis'
  citySlug: string
}

export default function DeckSection({ title, subtitle, items, kind, citySlug }: DeckSectionProps) {
  const list = useMemo(() => items || [], [items])
  const count = list.length
  const [i, setI] = useState(0)
  const [anim, setAnim] = useState<'idle' | 'next' | 'prev'>('idle')
  const [prevIndex, setPrevIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const current = list[i]

  const go = (dir: 1 | -1) => {
    if (!count) return
    setPrevIndex(i)
    setAnim(dir === 1 ? 'next' : 'prev')
    const next = (i + dir + count) % count
    // espera a anim de saída antes de trocar o "current"
    window.setTimeout(() => {
      setI(next)
      setAnim('idle')
    }, 360)
  }

  const priceLabel =
    kind === 'hoteis' && typeof current?.nightly_price === 'number'
      ? `Diárias a partir de R$ ${current?.nightly_price.toFixed(2)}`
      : kind === 'restaurantes' && current?.price_range
      ? `Faixa: ${current.price_range}${typeof current.rating === 'number' ? ` · ⭐ ${current.rating.toFixed(1)}` : ''}`
      : undefined

  return (
    <section className="py-8 md:py-10">
      <div className="container">
        <div className="mb-4">
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-white">{title}</h2>
          {subtitle && <p className="text-white/80 text-sm md:text-base">{subtitle}</p>}
        </div>

        {/* Deck */}
        <div className="relative grid place-items-center">
          <div className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]" style={{ aspectRatio: '3 / 4' }}>
            {/* slide anterior (saindo) */}
            {count > 0 && anim !== 'idle' && (
              <Card
                key={`prev-${prevIndex}`}
                item={list[prevIndex]}
                citySlug={citySlug}
                kind={kind}
                className={anim === 'next' ? 'animate-out-down' : 'animate-out-up'}
                onClick={() => setOpen(true)}
              />
            )}
            {/* slide atual (entrando / parado) */}
            {count > 0 ? (
              <Card
                key={`cur-${i}`}
                item={current!}
                citySlug={citySlug}
                kind={kind}
                className={anim === 'next' ? 'animate-in-from-top' : anim === 'prev' ? 'animate-in-from-bottom' : 'animate-idle'}
                onClick={() => setOpen(true)}
              />
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/5 text-white/80 grid place-items-center text-center p-6 h-full">
                <p className="text-sm">Nenhum item cadastrado ainda.</p>
              </div>
            )}
          </div>

          {/* setas */}
          {count > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Próximo"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de detalhes */}
      <Modal open={open} onClose={() => setOpen(false)} title={current?.name}>
        {current ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200" style={{ aspectRatio: '4 / 3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'}
                alt={current.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 text-sm leading-relaxed">
              {current.description && <p className="text-gray-800">{current.description}</p>}
              {priceLabel && <p className="text-gray-700">{priceLabel}</p>}
              {current.address && <p className="text-gray-700"><strong>Endereço:</strong> {current.address}</p>}
              {current.open_hours && <p className="text-gray-700"><strong>Horários:</strong> {current.open_hours}</p>}
              {current.website_url && (
                <p><a className="text-blue-700 underline" href={current.website_url} target="_blank" rel="noreferrer">Site oficial</a></p>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      {/* animations */}
      <style jsx global>{`
        .animate-idle       { animation: fadeIn .36s ease both; }
        .animate-in-from-top    { animation: inFromTop .36s cubic-bezier(.22,.61,.36,1) both; }
        .animate-in-from-bottom { animation: inFromBottom .36s cubic-bezier(.22,.61,.36,1) both; }
        .animate-out-down   { animation: outDown .36s cubic-bezier(.22,.61,.36,1) both; }
        .animate-out-up     { animation: outUp .36s cubic-bezier(.22,.61,.36,1) both; }

        @keyframes fadeIn { from { opacity:.0; transform: scale(.98) } to { opacity:1; transform:none } }
        @keyframes inFromTop { from { opacity:0; transform: translateY(-14px) scale(.98) } to { opacity:1; transform:none } }
        @keyframes inFromBottom { from { opacity:0; transform: translateY(14px) scale(.98) } to { opacity:1; transform:none } }
        @keyframes outDown { from { opacity:1; transform:none } to { opacity:0; transform: translateY(14px) scale(.98) } }
        @keyframes outUp   { from { opacity:1; transform:none } to { opacity:0; transform: translateY(-14px) scale(.98) } }
      `}</style>
    </section>
  )
}

function Card({
  item,
  kind,
  citySlug,
  className,
  onClick,
}: {
  item: DeckItem
  kind: 'pontos' | 'restaurantes' | 'hoteis'
  citySlug: string
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/10 text-left group ${className || ''}`}
      style={{ cursor: 'pointer' }}
      aria-label={`Abrir detalhes de ${item.name}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent text-white">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
            <p className="text-xs text-white/80 -mt-0.5">
              {kind === 'pontos' ? 'Ponto turístico' : kind === 'restaurantes' ? 'Restaurante' : 'Hotel'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-white text-[#2B4940] rounded-xl px-3 py-1.5 text-sm font-semibold group-hover:translate-x-[2px] transition">
            Ver
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </button>
  )
}
