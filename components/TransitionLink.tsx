'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

type Props = LinkProps & {
  className?: string
  children: React.ReactNode
}

/**
 * Navegação com View Transitions quando suportado.
 * Pega o destino direto do <a> clicado para evitar caminhos errados.
 */
export default function TransitionLink({ href, children, className, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented) return
    // permitir nova aba/guia, clique do meio etc.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    // feature detect
    
    const svt: ((cb: () => void) => void) | undefined = document?.startViewTransition
    if (!svt) return // sem suporte → deixa o Link navegar normalmente

    e.preventDefault()

    // pega o href exatamente como está no <a>
    const raw = (e.currentTarget as HTMLAnchorElement).getAttribute('href') || '/'
    let to = raw

    // se vier uma URL absoluta do mesmo host, normaliza pra pathname+search+hash
    try {
      const u = new URL(raw, window.location.origin)
      if (u.origin === window.location.origin) {
        to = u.pathname + u.search + u.hash
      }
    } catch {
      // ignora, usa raw
    }

    // chama com this = document para evitar "Illegal invocation"
    svt.call(document, () => {
      router.push(to)
    })
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  )
}
