import Container from '@/components/Container'
import ClientFilter from '@/components/ClientFilter'
import { getSupabasePublic } from '@/lib/supabasePublic'
import type { City } from '@/types'

export const revalidate = 60

export default async function CitiesPage() {
  const supabase = getSupabasePublic()
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('name', { ascending: true })

  const citiesData = (cities || []) as City[]
  return (
    <div>
      <Container>
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-[#E5DCC9]">Cidades do Paraná</h1>
        <p className="mt-2 text-white/80 max-w-xl">
          Explore todas as cidades cadastradas e encontre pontos turísticos, restaurantes e hotéis em cada uma delas.
        </p>
      </Container>
      {/* Reutiliza o componente de filtro para listar cidades */}
      <ClientFilter initialCities={citiesData} />
    </div>
  )
}
