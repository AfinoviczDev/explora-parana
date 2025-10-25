// components/CitySection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  /** 'carousel' (padrão) | 'block' (sem carrossel, conteúdo livre) */
  variant?: 'carousel' | 'block'
}

export default function CitySection({
  id,
  title,
  subtitle,
  children,
  variant = 'carousel',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    if (variant !== 'carousel') return
    const el = scrollerRef.current
    if (!el) return
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 4)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [variant])

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section id={id} className="py-8 md:py-12">
      <div className="container">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white">{title}</h3>
            {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
          </div>

          {/* setas só no modo carrossel e quando há overflow */}
          {variant === 'carousel' && canScroll && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur"
                aria-label="Anterior"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur"
                aria-label="Próximo"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {variant === 'carousel' ? (
          <div
            ref={scrollerRef}
            className="grid grid-flow-col auto-cols-[minmax(220px,280px)] gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
          >
            {children}
          </div>
        ) : (
          // Modo bloco: renderiza conteúdo como vier (ex.: <HotelGrid />)
          <div>{children}</div>
        )}
      </div>
    </section>
  )
}
