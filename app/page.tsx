import Container from '@/components/Container'
import CityCard from '@/components/CityCard'
import { getSupabasePublic } from '@/lib/supabasePublic'
import type { City } from '@/types'
import Image from 'next/image'
import CityHeroCarousel from '@/components/CityHeroCarousel'
import ClientFilter from '@/components/ClientFilter'

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
      {/* HERO */}
      <Container>
        <section className="grid lg:grid-cols-2 gap-8 items-center mt-6 md:mt-10">
          <div className="relative">
            <div className="mb-5">
              <Image
                src="/unnamed.jpg"
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

          {/* Carrossel */}
          <div>
            <CityHeroCarousel cities={citiesData} />
          </div>
        </section>
      </Container>

      {/* FILTRO E GRID — componente cliente */}
      <ClientFilter initialCities={citiesData} />
    </div>
  )
}
