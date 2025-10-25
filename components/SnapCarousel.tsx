'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  children: ReactNode
  ariaLabel: string
  className?: string
}

export default function SnapCarousel({ children, ariaLabel, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setAtStart(scrollLeft <= 0)
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      ro.disconnect()
    }
  }, [])

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.9
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative', className)}>
      {/* fades laterais (cor padrão do fundo) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#2B4940] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#2B4940] to-transparent" />

      <div
        ref={trackRef}
        className="scrollbar-none flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-2"
        aria-label={ariaLabel}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Anterior"
        onClick={() => nudge(-1)}
        disabled={atStart}
        className={cn(
          'absolute -left-2 top-1/2 -translate-y-1/2 rounded-full p-2 border transition backdrop-blur',
          'bg-white/15 hover:bg-white/25 border-white/20 text-white',
          atStart && 'opacity-40 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Próximo"
        onClick={() => nudge(1)}
        disabled={atEnd}
        className={cn(
          'absolute -right-2 top-1/2 -translate-y-1/2 rounded-full p-2 border transition backdrop-blur',
          'bg-white/15 hover:bg-white/25 border-white/20 text-white',
          atEnd && 'opacity-40 cursor-not-allowed'
        )}
      >
        <ChevronRight className="size-5" />
      </button>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
