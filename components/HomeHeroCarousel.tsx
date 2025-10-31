'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import TransitionLink from '@/components/TransitionLink'
import type { City } from '@/types'

type Props = { cities: City[]; interval?: number }

export default function HomeHeroCarousel({ cities, interval = 5000 }: Props) {
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
      <div className="w-full h-[65vh] flex items-center justify-center bg-gray-200 text-gray-500">
        Nenhuma cidade cadastrada ainda.
      </div>
    )
  }

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length)

  return (
    <div
      className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ width: `${items.length * 100}%`, transform: `translateX(-${index * (100 / items.length)}%)` }}
      >
        {items.map((c) => (
          <div
            key={c.id}
            className="relative h-full"
            style={{ width: `${100 / items.length}%`, minWidth: `${100 / items.length}%` }}
          >
            {/* Imagem do banner */}
            <Image
              src={c.banner_image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'}
              alt={c.name}
              fill
              priority={true}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            {/* Gradiente para melhor contraste do texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B4940]/70 via-[#2B4940]/30 to-transparent" />
            {/* Texto sobreposto */}
            <div className="absolute inset-0 flex flex-col justify-center pl-20 md:pl-44 max-w-xl z-10 text-white">            
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow">{c.name}</h2>
              {c.description ? (
                <p className="mt-2 text-base md:text-lg line-clamp-3 max-w-lg">{c.description}</p>
              ) : null}
              <div className="mt-4">
                <TransitionLink
                  href={`/cidade/${c.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E5DCC9] text-[#2B4940] font-medium hover:bg-[#E5DCC9]/90 transition"
                >
                  Ver cidade →
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Botões de navegação */}
      {items.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center size-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
          >
            ‹
          </button>
          <button
            aria-label="Próximo"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center size-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
          >
            ›
          </button>
        </>
      )}
      {/* Indicadores */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-20">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#E5DCC9]' : 'w-3 bg-[#E5DCC9]/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
