'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import TransitionLink from '@/components/TransitionLink'

type NavItem = { href: string; label: string }

const nav: NavItem[] = [
  { href: '/', label: 'Início' },
  // { href: '/#cidades', label: 'Cidades' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // encolhe + sombra quando rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // fecha o menu ao navegar
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={[
        'sticky top-0 z-40 transition-all',
        'border-b border-black/10',
        'bg-[#E5DCC9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#E5DCC9]/80',
        scrolled ? 'shadow-[0_8px_24px_rgba(0,0,0,.10)] h-14' : 'h-16',
      ].join(' ')}
    >
      <div className="container h-full flex items-center justify-between gap-3">
        {/* Brand (texto) */}
        <TransitionLink href="/" className="inline-flex items-center gap-2 group">
          <span className="font-semibold tracking-tight text-[#2B4940] text-lg md:text-xl">
            Explora Paraná
          </span>
          <span className="h-2 w-2 rounded-full bg-[#2B4940]/70 opacity-0 group-hover:opacity-100 transition-opacity" />
        </TransitionLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.replace('/#', '/'))
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                className={[
                  'group px-3 py-2 text-[15px] rounded-md relative',
                  'text-[#2B4940] hover:text-[#163027] transition-colors',
                ].join(' ')}
              >
                <span className="relative">
                  {item.label}
                  <span
                    className={[
                      'pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300',
                      active ? 'w-full bg-[#2B4940]' : 'w-0 bg-[#2B4940]/70 group-hover:w-full',
                    ].join(' ')}
                  />
                </span>
              </TransitionLink>
            )
          })}

          {/* Ações */}
          <TransitionLink
            href="/admin"
            className="ml-2 px-3 py-2 rounded-lg border border-black/15 text-[#2B4940] hover:bg-black/5 transition"
            aria-label="Área admin"
          >
            Admin
          </TransitionLink>
          <TransitionLink
            href="/"
            className="ml-1 px-3.5 py-2 rounded-lg bg-[#2B4940] text-white hover:brightness-110 transition shadow-sm"
            aria-label="Turismo PR"
          >
            Turismo PR
          </TransitionLink>
        </nav>

        {/* Mobile toggler */}
        <button
          className="md:hidden inline-flex items-center justify-center size-10 rounded-lg text-[#2B4940] hover:bg-black/5 transition"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="container py-2">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.replace('/#', '/'))
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={[
                    'px-3 py-2 rounded-md text-[15px]',
                    active ? 'bg-black/10 text-[#163027]' : 'text-[#2B4940] hover:bg-black/5',
                  ].join(' ')}
                >
                  {item.label}
                </TransitionLink>
              )
            })}
            <div className="mt-2 flex items-center gap-2">
              <TransitionLink
                href="/admin"
                className="flex-1 px-3 py-2 rounded-lg border border-black/15 text-[#2B4940] text-center hover:bg-black/5 transition"
              >
                Admin
              </TransitionLink>
              <TransitionLink
                href="/"
                className="flex-1 px-3 py-2 rounded-lg bg-[#2B4940] text-white text-center hover:brightness-110 transition"
              >
                Turismo PR
              </TransitionLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
