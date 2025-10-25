'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import TransitionLink from '@/components/TransitionLink'
import type { City } from '@/types'

type Props = { cities: City[]; interval?: number }

export default function CityHeroCarousel({ cities, interval = 5000 }: Props) {
  const items = useMemo(() => cities.filter(Boolean), [cities])
  const [index, setIndex] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % items.length)
    }, interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  if (!items.length) {
    return (
      <div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/70">
        Nenhuma cidade cadastrada ainda.
      </div>
    )
  }

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length)

  return (
    <div
      className="relative w-full h-[62vh] md:h-[68vh] rounded-2xl overflow-hidden border border-white/10 shadow-xl"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ width: `${items.length * 100}%`, transform: `translateX(-${index * (100 / items.length)}%)` }}
      >
        {items.map((c) => (
          <div key={c.id} className="relative h-full" style={{ width: `${100 / items.length}%`, minWidth: `${100 / items.length}%` }}>
            <TransitionLink href={`/cidade/${c.slug}`} className="block h-full">
              <div
                className="absolute inset-0"
                style={{ viewTransitionName: `city-image-${c.id}` }}
              >
                <Image
                  src={c.banner_image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'}
                  alt={c.name}
                  fill
                  priority={true}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-3 py-1 text-xs text-white/80">
                  Paraná
                </div>
                <h3 className="mt-2 text-white text-2xl md:text-3xl font-semibold drop-shadow">
                  {c.name}
                </h3>
                {c.description ? (
                  <p className="text-white/90 text-sm md:text-base line-clamp-2">{c.description}</p>
                ) : null}
                <span className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 bg-black/40 backdrop-blur px-3 py-1 rounded-full">
                  Ver cidade →
                </span>
              </div>
            </TransitionLink>
          </div>
        ))}
      </div>

      <button
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-full bg-black/35 hover:bg-black/50 text-white shadow-lg"
      >
        ‹
      </button>
      <button
        aria-label="Próximo"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-full bg-black/35 hover:bg-black/50 text-white shadow-lg"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-white' : 'w-3 bg-white/50'}`} />
        ))}
      </div>
    </div>
  )
}
