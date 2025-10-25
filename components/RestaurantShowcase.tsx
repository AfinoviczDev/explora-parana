'use client'

import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Globe, Clock, Star } from 'lucide-react'

export type RestaurantItem = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
  price_range?: string | null
  rating?: number | null
  address?: string | null
  open_hours?: string | null
  website_url?: string | null
}

export default function RestaurantShowcase({
  items,
  title = 'Onde comer',
}: {
  items: RestaurantItem[]
  title?: string
}) {
  const list = useMemo(() => (items || []).filter(Boolean), [items])
  const many = list.length > 1

  const [i, setI] = useState(0)
  const [prev, setPrev] = useState(0)
  const [anim, setAnim] = useState<'idle' | 'next' | 'prev'>('idle')
  const busy = useRef(false)

  const go = (dir: 1 | -1) => {
    if (!many || busy.current) return
    busy.current = true
    setPrev(i)
    setAnim(dir === 1 ? 'next' : 'prev')
    const next = (i + dir + list.length) % list.length
    // dura ~380ms (bate com os keyframes abaixo)
    window.setTimeout(() => {
      setI(next)
      setAnim('idle')
      busy.current = false
    }, 380)
  }

  const cur = list[i]
  const prevItem = list[prev]

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white text-center mb-6">{title}</h2>

        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          {/* IMAGEM GRANDE (esquerda) */}
          <div className="md:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/15" style={{ aspectRatio: '16 / 10' }}>
              {/* anterior saindo */}
              {prevItem && anim !== 'idle' && (
                <ImgFrame
                  key={`prev-${prevItem.id}`}
                  item={prevItem}
                  className={anim === 'next' ? 'imgOutLeft' : 'imgOutRight'}
                />
              )}
              {/* atual entrando */}
              {cur ? (
                <ImgFrame
                  key={`cur-${cur.id}`}
                  item={cur}
                  className={anim === 'next' ? 'imgInRight' : anim === 'prev' ? 'imgInLeft' : 'imgInHold'}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-white/80 bg-white/5">
                  Nenhum restaurante cadastrado.
                </div>
              )}
            </div>

            {/* setas */}
            {many && (
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

          {/* INFO (direita) */}
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-white/20 bg-white/5 p-5 md:p-6 h-full">
              {cur ? (
                // trocamos a key pra animar o bloco de texto inteiro a cada troca
                <div key={`info-${cur.id}`} className="textSwap">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{cur.name}</h3>

                  {cur.description && (
                    <p className="mt-2 text-white/90 leading-relaxed text-sm md:text-base">
                      {cur.description}
                    </p>
                  )}

                  <div className="mt-4 space-y-2 text-sm md:text-[15px] text-white/90">
                    {cur.price_range && (
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white">
                          {cur.price_range}
                        </span>
                        {typeof cur.rating === 'number' && (
                          <span className="inline-flex items-center gap-1">
                            <Star className="size-4 -mt-[2px]" />
                            {cur.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    )}

                    {cur.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="size-4 mt-0.5 shrink-0" />
                        <span>{cur.address}</span>
                      </div>
                    )}

                    {cur.open_hours && (
                      <div className="flex items-start gap-2">
                        <Clock className="size-4 mt-0.5 shrink-0" />
                        <span>{cur.open_hours}</span>
                      </div>
                    )}

                    {cur.website_url && (
                      <div className="flex items-start gap-2">
                        <Globe className="size-4 mt-0.5 shrink-0" />
                        <a
                          href={cur.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:opacity-80"
                        >
                          Site oficial
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-white/80">Nenhum restaurante cadastrado.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* animações */}
      <style jsx global>{`
        /* imagem */
        .imgInRight { animation: inR .38s cubic-bezier(.22,.61,.36,1) both; }
        .imgInLeft  { animation: inL .38s cubic-bezier(.22,.61,.36,1) both; }
        .imgOutLeft { animation: outL .38s cubic-bezier(.22,.61,.36,1) both; }
        .imgOutRight{ animation: outR .38s cubic-bezier(.22,.61,.36,1) both; }
        .imgInHold  { animation: inHold .38s cubic-bezier(.22,.61,.36,1) both; }

        @keyframes inR   { from {opacity:0; transform: translateX(18px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes inL   { from {opacity:0; transform: translateX(-18px) scale(.985)} to {opacity:1; transform:none} }
        @keyframes outL  { from {opacity:1; transform:none} to {opacity:0; transform: translateX(-18px) scale(.985)} }
        @keyframes outR  { from {opacity:1; transform:none} to {opacity:0; transform: translateX(18px)  scale(.985)} }
        @keyframes inHold{ from {opacity:0; transform: scale(.985)} to {opacity:1; transform:none} }

        /* texto */
        .textSwap { animation: textIn .36s ease both; }
        @keyframes textIn { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform:none } }

        @media (prefers-reduced-motion: reduce) {
          .imgInRight,.imgInLeft,.imgOutLeft,.imgOutRight,.imgInHold,.textSwap { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

function ImgFrame({ item, className }: { item: RestaurantItem; className?: string }) {
  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image_url || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop'}
        alt={item.name}
        className="h-full w-full object-cover"
      />
      {/* borda + gradiente */}
      <div className="absolute inset-0 rounded-[22px] ring-1 ring-white/30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  )
}
