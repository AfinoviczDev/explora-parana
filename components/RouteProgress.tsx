'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteProgress() {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // inicia 0% → 80% e completa ao fim
    el.style.width = '0%'
    el.style.opacity = '1'
    requestAnimationFrame(() => {
      el.style.width = '80%'
    })
    const done = setTimeout(() => {
      el.style.width = '100%'
      setTimeout(() => { el.style.opacity = '0' }, 180)
    }, 250)
    return () => clearTimeout(done)
  }, [pathname])

  return (
    <div className="fixed left-0 top-0 right-0 z-[9999] pointer-events-none">
      <div
        ref={ref}
        className="h-0.5 bg-emerald-400 transition-[width,opacity] duration-300 ease-out"
        style={{ width: '0%', opacity: 0 }}
      />
    </div>
  )
}
