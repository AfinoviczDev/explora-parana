'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type AttractionItem = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
}

export default function AttractionShowcase({
  items,
  title = 'Pontos Turísticos',
  intervalMs = 4500,
}: {
  items: AttractionItem[]
  title?: string
  intervalMs?: number
}) {
  const list = useMemo(() => (items || []).filter(Boolean), [items])
  const hasMany = list.length > 1

  const [i, setI] = useState(0)
  const [prev, setPrev] = useState(0)
  const [anim, setAnim] = useState<'idle' | 'next' | 'prev'>('idle')
  const timer = useRef<number | null>(null)
  const paused = useRef(false)

  const go = (dir: 1 | -1) => {
    if (!hasMany) return
    setPrev(i)
    setAnim(dir === 1 ? 'next' : 'prev')
    const next = (i + dir + list.length) % list.length
    // bate com os keyframes (380ms)
    window.setTimeout(() => {
      setI(next)
      setAnim('idle')
    }, 380)
  }

  // autoplay (pausa no hover e quando aba perde foco)
  useEffect(() => {
    const tick = () => { if (!paused.current) go(1) }
    if (hasMany) {
      timer.current = window.setInterval(tick, intervalMs) as unknown as number
    }
    const onVis = () => { paused.current = document.hidden } // pausa quando a aba não está visível
    document.addEventListener('visibilitychange', onVis)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
      document.removeEventListener('visibilitychange', onVis)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMany, i, intervalMs])

  const current = list[i]
  const prevItem = list[prev]

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="mb-3 text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white">{title}</h2>
          {current && (
            <p className="text-white/90 mt-1 text-sm md:text-base">{current.name}</p>
          )}
        </div>

        <div
          className="relative grid place-items-center"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {/* viewport da imagem */}
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden ring-1 ring-white/15"
               style={{ aspectRatio: '16 / 9' }}>
            {/* slide anterior (saindo) */}
            {prevItem && anim !== 'idle' && (
              <Frame
                key={`prev-${prevItem.id}`}
                item={prevItem}
                className={anim === 'next' ? 'fadeOutLeft' : 'fadeOutRight'}
              />
            )}
            {/* slide atual (entrando/estático) */}
            {current ? (
              <Frame
                key={`cur-${current.id}`}
                item={current}
                className={anim === 'next' ? 'fadeInRight' : anim === 'prev' ? 'fadeInLeft' : 'fadeInHold'}
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-white/80 bg-white/5">
                Sem pontos cadastrados.
              </div>
            )}
          </div>

          {/* setas */}
          {hasMany && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Próximo"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur transition"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {/* descrição */}
        {current?.description && (
          <div className="mt-4 md:mt-5 text-center text-white/90 max-w-3xl mx-auto">
            <p className="text-sm md:text-base leading-relaxed">{current.description}</p>
          </div>
        )}
      </div>

      {/* Animações suaves */}
      <style jsx global>{`
        .fadeInRight { animation: inR .38s cubic-bezier(.22,.61,.36,1) both; }
        .fadeInLeft  { animation: inL .38s cubic-bezier(.22,.61,.36,1) both; }
        .fadeOutLeft { animation: outL .38s cubic-bezier(.22,.61,.36,1) both; }
        .fadeOutRight{ animation: outR .38s cubic-bezier(.22,.61,.36,1) both; }
        .fadeInHold  { animation: inHold .38s cubic-bezier(.22,.61,.36,1) both; }

        @keyframes inR   { from {opacity:0; transform: translateX(18px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes inL   { from {opacity:0; transform: translateX(-18px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes outL  { from {opacity:1; transform:none} to {opacity:0; transform: translateX(-18px) scale(.985)} }
        @keyframes outR  { from {opacity:1; transform:none} to {opacity:0; transform: translateX(18px)  scale(.985)} }
        @keyframes inHold{ from {opacity:0; transform: scale(.985)} to {opacity:1; transform:none} }

        @media (prefers-reduced-motion: reduce) {
          .fadeInRight, .fadeInLeft, .fadeOutLeft, .fadeOutRight, .fadeInHold { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

function Frame({ item, className }: { item: AttractionItem; className?: string }) {
  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'}
        alt={item.name}
        className="h-full w-full object-cover"
      />
      {/* borda estilizada */}
      <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/30 pointer-events-none" />
      {/* gradiente base inferior */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  )
}
