// components/HotelGrid.tsx
'use client'

import { useEffect, useState } from 'react'
import { MapPin, Globe, Star, Phone } from 'lucide-react'

export type HotelItem = {
  id: number | string
  name: string
  description?: string | null
  image_url?: string | null
  nightly_price?: number | null
  rating?: number | null
  address?: string | null
  website_url?: string | null
  phone?: string | null
}

export default function HotelGrid({ items }: { items: HotelItem[] }) {
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState<HotelItem | null>(null)

  // fecha modal com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onCardClick = (h: HotelItem) => { setSel(h); setOpen(true) }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(h => (
          <button
            key={h.id}
            onClick={() => onCardClick(h)}
            className="group relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ aspectRatio: '3 / 4' }}
            aria-label={`Abrir detalhes do hotel ${h.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={h.image_url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400&auto=format&fit=crop'}
              alt={h.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/25 to-transparent text-white">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold leading-tight">{h.name}</h4>
                  <p className="text-[11px] text-white/80 -mt-0.5">Hotel</p>
                </div>
                {typeof h.nightly_price === 'number' && (
                  <span className="inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold bg-white text-[#2B4940]">
                    R$ {h.nightly_price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
          </button>
        ))}
      </div>

      {/* MODAL */}
      {open && sel && (
        <div className="fixed inset-0 z-[999]">
          <button
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="w-full max-w-4xl rounded-3xl overflow-hidden bg-white text-gray-900 shadow-[0_30px_120px_rgba(0,0,0,.45)] animate-modal-in">
              {/* topo */}
              <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">{sel.name}</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Fechar
                </button>
              </div>

              {/* conteúdo */}
              <div className="p-5 grid md:grid-cols-2 gap-5">
                <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200" style={{ aspectRatio: '4 / 3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sel.image_url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400&auto=format&fit=crop'}
                    alt={sel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-3 text-sm leading-relaxed">
                  {sel.description && <p>{sel.description}</p>}

                  <div className="space-y-2">
                    {typeof sel.nightly_price === 'number' && (
                      <p><strong>Diária:</strong> R$ {sel.nightly_price.toFixed(2)}</p>
                    )}
                    {typeof sel.rating === 'number' && (
                      <p className="inline-flex items-center gap-1"><Star className="size-4 -mt-[2px]" /> {sel.rating.toFixed(1)}</p>
                    )}
                    {sel.address && (
                      <p className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 shrink-0" /> {sel.address}</p>
                    )}
                    {sel.phone && (
                      <p className="flex items-start gap-2"><Phone className="size-4 mt-0.5 shrink-0" /> {sel.phone}</p>
                    )}
                    {sel.website_url && (
                      <p className="flex items-start gap-2">
                        <Globe className="size-4 mt-0.5 shrink-0" />
                        <a href={sel.website_url} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                          Site oficial
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx global>{`
            @keyframes modalIn { from { opacity:.6; transform: translateY(12px) scale(.98) } to { opacity:1; transform:none } }
            .animate-modal-in { animation: modalIn .28s ease-out both; }
          `}</style>
        </div>
      )}
    </>
  )
}
