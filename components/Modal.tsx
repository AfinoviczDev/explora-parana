'use client'

import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999]">
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          className="w-full max-w-3xl rounded-3xl bg-white text-gray-900 overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,.45)] animate-modal-in"
          role="dialog" aria-modal="true"
        >
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-sm">Fechar</button>
          </div>
          <div className="p-5">
            {children}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalIn { from { opacity:.6; transform: translateY(12px) scale(.98) } to { opacity:1; transform:none } }
        .animate-modal-in { animation: modalIn .28s ease-out both; }
      `}</style>
    </div>
  )
}
