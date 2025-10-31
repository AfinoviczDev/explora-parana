import { getSupabasePublic } from '@/lib/supabasePublic'
import type { City } from '@/types'
import CityHeroCarousel from '@/components/CityHeroCarousel'
import PageEntryFX from '@/components/PageEntryFX'
import BackgroundBeige3D from '@/components/BackgroundBeige3D'
import FloatSection from '@/components/FloatSection'
import SectionCard from '@/components/SectionCard'
import AboutExplora from "@/components/AboutExplora";
import RestaurantsCoverflowSection from "@/components/RestaurantsCoverflowSection";
import HotelsCoverflowSection from "@/components/HotelsCoverflowSection";
import ExploreSection from "@/components/ExploreSection";
import StatsStrip from "@/components/StatsStrip";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import Testimonials from "@/components/Testimonials";
import AttractionShowcase from '@/components/AttractionShowcase'

export const revalidate = 60

export default async function HomePage() {
  const sb = getSupabasePublic()
  const { data: cities } = await sb.from('cities').select('*').order('name', { ascending: true }).limit(1000)
  const citiesData = (cities || []) as City[]

  return (
    <>
      <BackgroundBeige3D />
      <PageEntryFX />

      {/* HERO (sem card) */}
      <FloatSection dense={false}>
        <section className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 lg:-inset-y-6">
            <div className="absolute left-0 top-0 h-full w-[48%] rounded-3xl bg-[linear-gradient(90deg,rgba(0,0,0,.28),rgba(0,0,0,0))] backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10">
            <h1 className="mt-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3EB] drop-shadow-[0_2px_8px_rgba(0,0,0,.25)]">
              Explora Paraná
            </h1>
            <div className="mt-2 h-1 w-20 rounded-full bg-[#F7F3EB]/90" />
            <p className="mt-4 text-base md:text-lg text-[#F7F3EB]/90 leading-relaxed max-w-xl">
              Um guia turístico visual do Paraná. Explore cidades, pontos turísticos, restaurantes e hotéis — tudo num só lugar.
            </p>
          </div>

          <div className="relative z-0">
            <CityHeroCarousel cities={citiesData} />
          </div>
        </section>
      </FloatSection>

      {/* About com CARD (cartões internos brancos) */}
      <FloatSection>
        <SectionCard>
          <AboutExplora />
        </SectionCard>
      </FloatSection>

      {/* Restaurantes (flutuando, textos claros) */}
      <FloatSection dense={false}>
        <RestaurantsCoverflowSection />
      </FloatSection>

      {/* Hotéis (flutuando, textos claros) */}
      <FloatSection dense={false}>
        <HotelsCoverflowSection />
      </FloatSection>

      <FloatSection dense={false}>
        <AttractionShowcase />
      </FloatSection>


     
      {/* Categorias (flutuando, sem bege) */}
      <FloatSection>
        <SectionCard>
          <ExploreSection />
        </SectionCard>
      </FloatSection>



      {/* Testimonials (flutuando, sem bege) 
      <FloatSection>
        <Testimonials />
      </FloatSection>*/}
    </>
  )
}
