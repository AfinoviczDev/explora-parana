'use client'

import { useMemo, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type DeckItem = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
  price_range?: string | null
  rating?: number | null
  nightly_price?: number | null
  address?: string | null
  website_url?: string | null
  open_hours?: string | null
  price?: string | number | null
}

type Variant = 'slideY' | 'slideX' | 'crossfade'

type Props = {
  title: string
  subtitle?: string
  items: DeckItem[]
  kind: 'pontos' | 'restaurantes' | 'hoteis'
  /** animação do deck (default: 'slideX') */
  variant?: Variant
  /** duração em ms (default: 420) */
  durationMs?: number
}

export default function DeckColumn({
  title,
  subtitle,
  items,
  kind,
  variant = 'slideX',
  durationMs = 420,
}: Props) {
  const list = useMemo(() => (items || []).filter(Boolean), [items])
  const count = list.length

  const [i, setI] = useState(0)
  const [anim, setAnim] = useState<'idle' | 'next' | 'prev'>('idle')
  const [prevIndex, setPrevIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const timer = useRef<number | null>(null)

  const current = list[i]

  const go = (dir: 1 | -1) => {
    if (!count || busy) return
    setBusy(true)
    setPrevIndex(i)
    setAnim(dir === 1 ? 'next' : 'prev')
    const next = (i + dir + count) % count
    timer.current && window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setI(next)
      setAnim('idle')
      setBusy(false)
    }, durationMs)
  }

  // swipe
  const startX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx < -30) go(1)
    if (dx > 30) go(-1)
    startX.current = null
  }

  // mapeia classes por variante
  const klass = getAnimClasses(variant, anim)

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-display text-lg md:text-xl text-white">{title}</h3>
        {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
      </div>

      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="relative w-full rounded-2xl isolate"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* anterior (saindo) */}
          {count > 0 && anim !== 'idle' && (
            <Card
              key={`prev-${prevIndex}`}
              item={list[prevIndex]}
              kind={kind}
              className={`z-10 ${klass.out}`}
              onClick={() => setOpen(true)}
              durationMs={durationMs}
            />
          )}
          {/* atual (entrando / parado) */}
          {count > 0 ? (
            <Card
              key={`cur-${i}`}
              item={current!}
              kind={kind}
              className={`z-20 ${klass.in}`}
              onClick={() => setOpen(true)}
              durationMs={durationMs}
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
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center gap-1 justify-center mt-1">
          {list.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      )}

      {/* Modal inline */}
      {open && current && (
        <div className="fixed inset-0 z-[999]">
          <button
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="w-full max-w-3xl rounded-3xl bg-white text-gray-900 overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,.45)] animate-modal-in">
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h4 className="text-lg font-semibold">{current.name}</h4>
                <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-900 text-sm">Fechar</button>
              </div>
              <div className="p-5">
                <Details item={current} kind={kind} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* animações (keyframes + reduced motion) */}
      <style jsx global>{`
        :root { --deck-ease: cubic-bezier(.22,.61,.36,1); }
        @media (prefers-reduced-motion: reduce) {
          .deck-anim { animation: none !important; transition: none !important; }
        }

        /* SLIDE-Y (sobreposição vertical suave) */
        .inY      { animation: inY var(--deck-dur) var(--deck-ease) both; }
        .outYUp   { animation: outYUp var(--deck-dur) var(--deck-ease) both; }
        .outYDown { animation: outYDown var(--deck-dur) var(--deck-ease) both; }
        @keyframes inY     { from {opacity:0; transform: translateY(16px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes outYUp  { from {opacity:1; transform:none} to {opacity:0; transform: translateY(-16px) scale(.985)} }
        @keyframes outYDown{ from {opacity:1; transform:none} to {opacity:0; transform: translateY(16px)  scale(.985)} }

        /* SLIDE-X (deslize horizontal) */
        .inXLeft  { animation: inXLeft var(--deck-dur) var(--deck-ease) both; }
        .inXRight { animation: inXRight var(--deck-dur) var(--deck-ease) both; }
        .outXLeft { animation: outXLeft var(--deck-dur) var(--deck-ease) both; }
        .outXRight{ animation: outXRight var(--deck-dur) var(--deck-ease) both; }
        @keyframes inXLeft  { from {opacity:0; transform: translateX(-16px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes inXRight { from {opacity:0; transform: translateX(16px)  scale(.985)} to {opacity:1; transform:none} }
        @keyframes outXLeft { from {opacity:1; transform:none} to {opacity:0; transform: translateX(-16px) scale(.985)} }
        @keyframes outXRight{ from {opacity:1; transform:none} to {opacity:0; transform: translateX(16px)  scale(.985)} }

        /* CROSSFADE (fade + blur/scale) */
        .inFade   { animation: inFade var(--deck-dur) var(--deck-ease) both; }
        .outFade  { animation: outFade var(--deck-dur) var(--deck-ease) both; }
        @keyframes inFade  { from {opacity:0; filter: blur(6px); transform: scale(.985)} to {opacity:1; filter: blur(0); transform: none} }
        @keyframes outFade { from {opacity:1; filter: blur(0); transform: none} to {opacity:0; filter: blur(6px); transform: scale(.985)} }

        /* modal */
        @keyframes modalIn { from { opacity:.6; transform: translateY(12px) scale(.98) } to { opacity:1; transform:none } }
        .animate-modal-in { animation: modalIn .28s ease-out both; }
      `}</style>
    </div>
  )
}

/* resolve classes de entrada/saída por variante e direção */
function getAnimClasses(variant: Variant, anim: 'idle' | 'next' | 'prev') {
  if (variant === 'crossfade') {
    return {
      in: `deck-anim inFade`,
      out: `deck-anim outFade`,
    }
  }
  if (variant === 'slideY') {
    return {
      in: `deck-anim ${anim === 'next' ? 'inY' : anim === 'prev' ? 'inY' : 'inY'}`,
      out: `deck-anim ${anim === 'next' ? 'outYUp' : 'outYDown'}`,
    }
  }
  // slideX (default)
  return {
    in: `deck-anim ${anim === 'next' ? 'inXRight' : anim === 'prev' ? 'inXLeft' : 'inXRight'}`,
    out: `deck-anim ${anim === 'next' ? 'outXLeft' : 'outXRight'}`,
  }
}

function Card({
  item,
  kind,
  className,
  onClick,
  durationMs = 420,
}: {
  item: DeckItem
  kind: 'pontos' | 'restaurantes' | 'hoteis'
  className?: string
  onClick?: () => void
  durationMs?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/10 text-left group will-change-transform will-change-opacity ${className || ''}`}
      aria-label={`Abrir detalhes de ${item.name}`}
      style={{ ['--deck-dur' as any]: `${durationMs}ms` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent text-white">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold leading-tight">{item.name}</h4>
            <p className="text-[11px] text-white/80 -mt-0.5">
              {kind === 'pontos' ? 'Ponto turístico' : kind === 'restaurantes' ? 'Restaurante' : 'Hotel'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 bg-white text-[#2B4940] rounded-xl px-3 py-1.5 text-xs font-semibold group-hover:translate-x-[2px] transition">
            Ver <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </button>
  )
}

function Details({ item, kind }: { item: DeckItem; kind: Props['kind'] }) {
  const priceLabel =
    kind === 'hoteis' && typeof item.nightly_price === 'number'
      ? `Diárias a partir de R$ ${item.nightly_price.toFixed(2)}`
      : kind === 'restaurantes' && item.price_range
      ? `Faixa: ${item.price_range}${typeof item.rating === 'number' ? ` · ⭐ ${item.rating.toFixed(1)}` : ''}`
      : undefined

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200" style={{ aspectRatio: '4 / 3' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2 text-sm leading-relaxed">
        {item.description && <p className="text-gray-800">{item.description}</p>}
        {priceLabel && <p className="text-gray-700">{priceLabel}</p>}
        {item.address && <p className="text-gray-700"><strong>Endereço:</strong> {item.address}</p>}
        {item.open_hours && <p className="text-gray-700"><strong>Horários:</strong> {item.open_hours}</p>}
        {item.website_url && (
          <p><a className="text-blue-700 underline" href={item.website_url} target="_blank" rel="noreferrer">Site oficial</a></p>
        )}
      </div>
    </div>
  )
}
