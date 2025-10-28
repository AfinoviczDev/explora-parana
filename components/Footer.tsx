'use client'

import { useEffect, useState } from 'react'
import { Instagram, ArrowUp, ArrowUpRight } from 'lucide-react'
import TransitionLink from '@/components/TransitionLink'

export default function Footer() {
  const year = new Date().getFullYear()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <footer className="relative mt-16 border-t border-black/10 bg-[#E5DCC9] text-[#2B4940]">
        {/* sutil textura radial no topo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-24 opacity-70"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 100%, rgba(0,0,0,.10) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div className="container py-10 md:py-14">
          <div className="grid gap-10 md:gap-14 md:grid-cols-12">
            {/* Brand + descrição */}
            <div className="md:col-span-5">
              <h3 className="font-semibold text-2xl tracking-tight">Explora Paraná</h3>
              <p className="mt-3 text-[#2B4940]/80 leading-relaxed">
                Seu guia turístico visual do estado: cidades, pontos, restaurantes e hotéis —
                tudo num só lugar.
              </p>

              {/* Social */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://instagram.com/paranaemfoto"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2B4940] text-white px-3.5 py-2 hover:brightness-110 transition"
                >
                  <Instagram className="size-4.5" />
                  <span>@paranaemfoto</span>
                  <ArrowUpRight className="size-4 opacity-80" />
                </a>
              </div>

              <p className="mt-2 text-sm text-[#2B4940]/70">
                Siga no Instagram — <span className="font-medium">Douglas Cristiano</span>
              </p>
            </div>

            {/* Navegação rápida */}
            <div className="md:col-span-3">
              <h4 className="font-semibold text-lg">Navegação</h4>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <TransitionLink
                    href="/"
                    className="text-[#2B4940]/80 hover:text-[#163027] transition-colors"
                  >
                    Início
                  </TransitionLink>
                </li>
                <li>
                
                </li>
              </ul>
            </div>

            {/* Contato / Créditos */}
            <div className="md:col-span-4">
              <h4 className="font-semibold text-lg">Sobre</h4>
              <p className="mt-3 text-[#2B4940]/80">
                Projeto criado para promover o turismo e a cultura do Paraná com uma experiência
                visual moderna, simples e responsiva.
              </p>

              <div className="mt-4 rounded-xl border border-black/15 bg-white/40 px-4 py-3">
                <p className="text-sm text-[#2B4940]/80">
                  © {year} <span className="font-medium">Explora Paraná</span>. Feito por{' '}
                  <a
                    href="https://www.linkedin.com/in/jo%C3%A3o-pedro-afinovicz-283354304/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:no-underline text-[#163027]"
                    title="Douglas Cristiano no Instagram"
                  >
                    Afinovicz Dev
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão flutuante voltar ao topo */}
      <button
        onClick={scrollTop}
        aria-label="Voltar ao topo"
        className={[
          'fixed right-4 bottom-4 z-40 grid place-items-center rounded-full shadow-lg',
          'bg-[#2B4940] text-white hover:brightness-110 transition',
          'size-11 md:size-12',
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <ArrowUp className="size-5" />
      </button>
    </>
  )
}
