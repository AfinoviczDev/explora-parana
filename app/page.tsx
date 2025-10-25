// app/page.tsx
import Container from '@/components/Container'
import CityCard from '@/components/CityCard'
import { getSupabasePublic } from '@/lib/supabasePublic'
import type { City } from '@/types'
import Image from 'next/image'
import CityHeroCarousel from '@/components/CityHeroCarousel'

export const revalidate = 60

export default async function HomePage() {
  const supabase = getSupabasePublic()
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('name', { ascending: true })
    .limit(1000)

  const citiesData = (cities || []) as City[]

  return (
    <div>
      {/* HERO: logo + texto à esquerda / carrossel à direita */}
      <Container>
        <section className="grid lg:grid-cols-2 gap-8 items-center mt-6 md:mt-10">
          {/* ESQUERDA */}
          <div className="relative">
            {/* LOGO GRANDE */}
            <div className="mb-5">
              {/* Coloque o arquivo em /public/logo.svg (ou troque para /logo.png se preferir) */}
              <Image
                src="/logo.svg"
                alt="Explora Paraná — logo"
                width={220}
                height={220}
                priority
                className="w-36 md:w-48 lg:w-56 h-auto drop-shadow-sm"
              />
            </div>

            <h1 className="mt-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E5DCC9]">
              Explora Paraná
            </h1>
            <div className="mt-2 h-1 w-20 rounded-full bg-[#E5DCC9]/90" />

            <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
              Um guia turístico visual do Paraná. Explore cidades, pontos turísticos, restaurantes e
              hotéis — tudo num só lugar.
            </p>
          </div>

          {/* DIREITA: carrossel de cidades */}
          <div>
            <CityHeroCarousel cities={citiesData} />
          </div>
        </section>
      </Container>

      {/* Filtros */}
      <Container>
        <div className="card p-3 md:p-4 mt-8 relative">
          <div className="grid sm:grid-cols-3 gap-3">
            <input className="input" placeholder="Buscar cidade..." />
            <select className="input">
              <option>Todos os tamanhos</option>
              <option>Grandes</option>
              <option>Médias</option>
              <option>Pequenas</option>
            </select>
            <select className="input">
              <option>Ordenar A-Z</option>
              <option>Z-A</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Grid de cidades */}
      <Container>
        {!citiesData.length ? (
          <div className="text-gray-200">
            Nenhuma cidade cadastrada ainda. Acesse a área de Admin para cadastrar as primeiras!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-stagger mt-6">
            {citiesData.map((c) => (
              <CityCard key={c.id} city={c} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
