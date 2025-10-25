'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

type City = {
  id: string | number
  name: string
  slug: string
  banner_image_url?: string | null
}

/* Reveal palavra-a-palavra (suave) */
function AnimatedWords({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="word" style={{ animationDelay: `${i * 45}ms` }}>
          {w}&nbsp;
        </span>
      ))}
      <style jsx>{`
        .word { display:inline-block; opacity:0; transform:translateY(8px) scale(.98);
                animation:fadeUp .5s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0) scale(1);} }
      `}</style>
    </>
  )
}

export default function HeroShowcase({ cities }: { cities: City[] }) {
  const items = useMemo(() => (cities || []).filter(Boolean), [cities])
  const count = items.length
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)

  const next = () => setIndex(i => (count ? (i + 1) % count : 0))
  const prev = () => setIndex(i => (count ? (i - 1 + count) % count : 0))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx < -30) next()
    if (dx > 30) prev()
    startX.current = null
  }

  const copy =
    'Um guia turístico visual do Paraná. Explore cidades, pontos turísticos, restaurantes e hotéis — tudo num só lugar.'

  return (
    <section className="w-full bg-parana-green text-white">
      <div className="container py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Esquerda: logo grande + texto responsivo */}
          <div className="space-y-6 md:space-y-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Paraná em Foto"
              className="h-24 sm:h-28 md:h-40 lg:h-48 w-auto"
              style={{ transformOrigin: 'left center' }}
            />
            <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight max-w-[30ch] text-white/95">
              <AnimatedWords text={copy} />
            </p>
          </div>

          {/* Direita: carrossel com slide */}
          <div className="relative select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px]">
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,.35)] ring-1 ring-white/10 bg-black/10" style={{ aspectRatio: '3 / 4' }}>
                {/* trilho */}
                <div
                  className="h-full w-full flex"
                  style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: 'transform 450ms cubic-bezier(.22,.61,.36,1)',
                  }}
                >
                  {count === 0 ? (
                    <div className="w-full shrink-0 h-full grid place-items-center text-white/80">
                      Nenhuma cidade cadastrada ainda
                    </div>
                  ) : (
                    items.map((city) => (
                      <div key={city.id} className="w-full shrink-0 h-full relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            city.banner_image_url ||
                            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'
                          }
                          alt={city.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent">
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold">{city.name}</h3>
                              <p className="text-xs text-white/80 -mt-0.5">Clique para saber mais</p>
                            </div>
                            <Link
                              href={`/cidade/${city.slug}`}
                              className="inline-flex items-center gap-1 bg-white text-parana-green rounded-xl px-3 py-1.5 text-sm font-semibold hover:bg-white/90 transition"
                            >
                              Ver cidade <MoveRight className="size-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {count > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/15 hover:bg-white/25 transition border border-white/20 backdrop-blur"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Próximo"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/15 hover:bg-white/25 transition border border-white/20 backdrop-blur"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              {count > 1 && (
                <div className="flex items-center justify-center gap-1 mt-3">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
