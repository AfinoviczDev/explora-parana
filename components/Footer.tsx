import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-950/10 bg-[#E5DCC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Coluna 1 — Explora Paraná */}
          <div>
            <h3 className="text-emerald-900 text-xl font-semibold">Explora Paraná</h3>
            <p className="mt-3 text-emerald-900/80 leading-relaxed">
              Seu guia turístico visual do estado: cidades, pontos,
              restaurantes e hotéis — tudo num só lugar.
            </p>

            <div className="mt-4">
              <a
                href="https://instagram.com/paranaemfoto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 text-[#E5DCC9] px-4 py-2 hover:opacity-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
                @paranaemfoto
              </a>
              <p className="mt-2 text-sm text-emerald-900/70">
                Siga no Instagram — <span className="font-medium">Douglas Cristiano</span>
              </p>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h3 className="text-emerald-900 text-xl font-semibold">Navegação</h3>
            <ul className="mt-3 space-y-2">
              <FooterLink href="/">Início</FooterLink>
              <FooterLink href="/cidades">Cidades</FooterLink>
              <FooterLink href="/pontos-turisticos">Pontos turísticos</FooterLink>
              <FooterLink href="/restaurantes">Restaurantes</FooterLink>
              <FooterLink href="/hoteis">Hotéis</FooterLink>
            </ul>
          </div>

          {/* Coluna 3 — Sobre */}
          <div>
            <h3 className="text-emerald-900 text-xl font-semibold">Sobre</h3>
            <p className="mt-3 text-emerald-900/80 leading-relaxed">
              Projeto criado para promover o turismo e a cultura do Paraná
              com uma experiência visual moderna, simples e responsiva.
            </p>

            <div className="mt-4 inline-flex items-center rounded-lg bg-white/70 px-3 py-2 text-emerald-900">
              © 2025 Explora Paraná. Feito por{" "}
              <a
                href="https://afinovicz.dev"
                target="_blank"
                rel="noreferrer"
                className="ml-1 underline decoration-emerald-900/50 underline-offset-2 hover:opacity-80"
              >
                Afinovicz Dev.
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-emerald-900/80 hover:text-emerald-900 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
