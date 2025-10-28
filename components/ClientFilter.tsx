'use client'

import { useState, useMemo, useEffect } from 'react'
import Container from '@/components/Container'
import CityCard from '@/components/CityCard'

export default function ClientFilter({ initialCities }: { initialCities: any[] }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'A-Z' | 'Z-A'>('A-Z')
  const [loading, setLoading] = useState(false)

  // Simular tempo de carregamento suave
  useEffect(() => {
    if (!search.trim()) return
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400) // pequeno delay para suavidade
    return () => clearTimeout(t)
  }, [search, sort])

  const filteredCities = useMemo(() => {
    let filtered = initialCities
    if (search.trim()) {
      const term = search.toLowerCase()
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(term))
    }
    filtered = [...filtered].sort((a, b) =>
      sort === 'A-Z'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    return filtered
  }, [initialCities, search, sort])

  return (
    <>
      {/* Filtros */}
      <Container>
        <div className="card p-3 md:p-4 mt-8 relative">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="🔍 Buscar cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="input"
              value={sort}
              onChange={(e) => setSort(e.target.value as 'A-Z' | 'Z-A')}
            >
              <option value="A-Z">Ordenar A-Z</option>
              <option value="Z-A">Ordenar Z-A</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Grid */}
      <Container>
        {loading ? (
          // === Skeletons ===
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 bg-gray-300/20 rounded-xl border border-gray-600/30 overflow-hidden"
              >
                <div className="h-32 bg-gray-400/30" />
                <div className="p-3 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-400/30 rounded" />
                  <div className="h-3 w-1/2 bg-gray-400/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : !filteredCities.length ? (
          <div className="text-gray-200 text-center mt-8">
            Nenhuma cidade encontrada. Tente outro nome ou cadastre novas na área Admin!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-stagger mt-6 transition-opacity duration-300">
            {filteredCities.map((c) => (
              <CityCard key={c.id} city={c} />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
