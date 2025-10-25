'use client'

import { useEffect, useMemo, useState } from 'react'
import Container from '@/components/Container'
import { Button, Input, Textarea, Label } from '@/components/FormBits'
import { Folder, FolderOpen, Image as ImageIcon } from 'lucide-react'

// ---------- token admin ----------
function useAdminToken() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const t = localStorage.getItem('ADMIN_TOKEN') || ''
    setToken(t)
  }, [])
  const set = (t: string) => { setToken(t); localStorage.setItem('ADMIN_TOKEN', t) }
  return [token, set] as const
}

// ---------- helper fetch ----------
async function api(path: string, method: string, body?: any) {
  const token = localStorage.getItem('ADMIN_TOKEN') || ''
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) throw new Error(await res.text())
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : null
}

async function uploadImage(file: File, folder: string, hint: string) {
  const token = localStorage.getItem('ADMIN_TOKEN') || ''
  const fd = new FormData()
  fd.append('file', file)
  fd.append('folder', folder)
  fd.append('hint', hint)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'x-admin-token': token },
    body: fd,
  })
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.url as string
}

// ---------- tipos simples ----------
type City = { id: number; name: string; slug: string }
type Item = { id: number; name: string }

// ===================================
export default function AdminPage() {
  const [token, setToken] = useAdminToken()

  // forms
  const [c, setC] = useState<any>({ name: '', slug: '', description: '' })
  const [a, setA] = useState<any>({ city_id: '', name: '', description: '' })
  const [r, setR] = useState<any>({ city_id: '', name: '', description: '', price_range: '', rating: '' })
  const [h, setH] = useState<any>({ city_id: '', name: '', description: '', nightly_price: '' })

  // arquivos + preview
  const [cFile, setCFile] = useState<File | null>(null)
  const [aFile, setAFile] = useState<File | null>(null)
  const [rFile, setRFile] = useState<File | null>(null)
  const [hFile, setHFile] = useState<File | null>(null)

  const [cPrev, setCPrev] = useState<string | null>(null)
  const [aPrev, setAPrev] = useState<string | null>(null)
  const [rPrev, setRPrev] = useState<string | null>(null)
  const [hPrev, setHPrev] = useState<string | null>(null)

  useEffect(() => { if (cFile) { const u = URL.createObjectURL(cFile); setCPrev(u); return () => URL.revokeObjectURL(u) } else setCPrev(null) }, [cFile])
  useEffect(() => { if (aFile) { const u = URL.createObjectURL(aFile); setAPrev(u); return () => URL.revokeObjectURL(u) } else setAPrev(null) }, [aFile])
  useEffect(() => { if (rFile) { const u = URL.createObjectURL(rFile); setRPrev(u); return () => URL.revokeObjectURL(u) } else setRPrev(null) }, [rFile])
  useEffect(() => { if (hFile) { const u = URL.createObjectURL(hFile); setHPrev(u); return () => URL.revokeObjectURL(u) } else setHPrev(null) }, [hFile])

  const [isUpC, setIsUpC] = useState(false)
  const [isUpA, setIsUpA] = useState(false)
  const [isUpR, setIsUpR] = useState(false)
  const [isUpH, setIsUpH] = useState(false)

  // cidades + gerenciamento
  const [cities, setCities] = useState<City[]>([])
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const [byCity, setByCity] = useState<Record<number, { attractions: Item[]; restaurants: Item[]; hotels: Item[] }>>({})

  // map id->slug para revalidar
  const slugById = useMemo(() => Object.fromEntries(cities.map(ci => [ci.id, ci.slug])), [cities])

  // carregar cidades
  useEffect(() => {
    fetch('/api/cities', { cache: 'no-store' })
      .then(r => r.json())
      .then((data) => { if (Array.isArray(data)) setCities(data) })
      .catch(() => setCities([]))
  }, [])

  // refresh por cidade
  async function refreshCity(cityId: number) {
    const headers = { 'x-admin-token': token }
    const [pts, rests, hots] = await Promise.all([
      fetch(`/api/attractions?city_id=${cityId}`, { headers, cache: 'no-store' }).then(r => r.json()),
      fetch(`/api/restaurants?city_id=${cityId}`, { headers, cache: 'no-store' }).then(r => r.json()),
      fetch(`/api/hotels?city_id=${cityId}`, { headers, cache: 'no-store' }).then(r => r.json()),
    ])
    setByCity(prev => ({ ...prev, [cityId]: {
      attractions: Array.isArray(pts) ? pts : [],
      restaurants: Array.isArray(rests) ? rests : [],
      hotels: Array.isArray(hots) ? hots : [],
    }}))
  }

  async function revalidateCityById(cityId: number) {
    const slug = slugById[cityId]
    if (!slug) return
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ paths: [`/cidade/${slug}`, '/'] }),
    })
  }

  const totalsFor = (cityId: number) => {
    const x = byCity[cityId]
    if (!x) return { pts: 0, rests: 0, hots: 0 }
    return { pts: x.attractions.length, rests: x.restaurants.length, hots: x.hotels.length }
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-2">Admin</h1>
      <p className="text-gray-600 mb-6">Digite seu token de admin para habilitar os cadastros e uploads.</p>

      {/* token */}
      <div className="card p-4 mb-6">
        <Label>Admin Token</Label>
        <div className="flex gap-2 mt-1">
          <Input value={token} onChange={(e)=>setToken(e.target.value)} placeholder="Cole aqui o ADMIN_TOKEN do .env" />
        </div>
      </div>

      {/* cadastros */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* cidade */}
        <div className="card p-4">
          <h2 className="font-semibold text-lg mb-2">Cadastrar Cidade</h2>
          <div className="space-y-2">
            <div><Label>Nome</Label><Input value={c.name} onChange={e=>setC({...c, name:e.target.value})} /></div>
            <div><Label>Slug (ex: curitiba)</Label><Input value={c.slug} onChange={e=>setC({...c, slug:e.target.value})} /></div>
            <div><Label>Descrição</Label><Textarea value={c.description} onChange={e=>setC({...c, description:e.target.value})} /></div>

            {/* upload imagem (banner) */}
            <div className="mt-2">
              <Label>Imagem da cidade (banner)</Label>
              <div className="flex items-center gap-3">
                <label className="btn" htmlFor="up-city"><ImageIcon className="size-4 mr-2" /> Selecionar imagem</label>
                <input id="up-city" type="file" accept="image/*" className="hidden" onChange={(e)=>setCFile(e.target.files?.[0] || null)} />
                {isUpC && <span className="text-xs text-gray-500">Enviando...</span>}
              </div>
              {cPrev && (
                <div className="mt-2 relative rounded-lg overflow-hidden ring-1 ring-white/10" style={{ aspectRatio: '16 / 9' }}>
                  <img src={cPrev} alt="Prévia" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" onClick={async()=>{
                let banner_image_url: string | undefined
                if (cFile) {
                  try { setIsUpC(true); banner_image_url = await uploadImage(cFile, 'cities', c.slug || c.name || 'cidade') }
                  finally { setIsUpC(false) }
                }
                await api('/api/cities','POST',{ ...c, ...(banner_image_url ? { banner_image_url } : {}) })
                alert('Cidade criada!')
                setC({ name:'', slug:'', description:'' }); setCFile(null)
                const fresh = await fetch('/api/cities', { cache:'no-store' }).then(r=>r.json())
                if (Array.isArray(fresh)) setCities(fresh)
              }}>Salvar</Button>
            </div>
          </div>
        </div>

        {/* ponto */}
        <div className="card p-4">
          <h2 className="font-semibold text-lg mb-2">Cadastrar Ponto Turístico</h2>
          <div className="space-y-2">
            <div>
              <Label>Cidade</Label>
              <select className="input" value={a.city_id} onChange={e=>setA({...a, city_id:e.target.value})}>
                <option value="">Selecione</option>
                {cities.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div><Label>Nome</Label><Input value={a.name} onChange={e=>setA({...a, name:e.target.value})} /></div>
            <div><Label>Descrição</Label><Textarea value={a.description} onChange={e=>setA({...a, description:e.target.value})} /></div>

            <div className="mt-2">
              <Label>Imagem do ponto</Label>
              <div className="flex items-center gap-3">
                <label className="btn" htmlFor="up-pt"><ImageIcon className="size-4 mr-2" /> Selecionar imagem</label>
                <input id="up-pt" type="file" accept="image/*" className="hidden" onChange={(e)=>setAFile(e.target.files?.[0] || null)} />
                {isUpA && <span className="text-xs text-gray-500">Enviando...</span>}
              </div>
              {aPrev && (
                <div className="mt-2 relative rounded-lg overflow-hidden ring-1 ring-white/10" style={{ aspectRatio: '16 / 9' }}>
                  <img src={aPrev} alt="Prévia" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" disabled={!token || !a.city_id || !a.name} onClick={async()=>{
                let image_url: string | undefined
                if (aFile) { try { setIsUpA(true); image_url = await uploadImage(aFile, 'attractions', a.name) } finally { setIsUpA(false) } }
                const saved = await api('/api/attractions','POST',{ ...a, ...(image_url ? { image_url } : {}) })
                alert('Ponto criado!')
                setA({ city_id:'', name:'', description:'' }); setAFile(null)
                if (saved?.city_id) { await refreshCity(Number(saved.city_id)); await revalidateCityById(Number(saved.city_id)) }
              }}>Salvar ponto</Button>
            </div>
          </div>
        </div>

        {/* restaurante */}
        <div className="card p-4">
          <h2 className="font-semibold text-lg mb-2">Cadastrar Restaurante</h2>
          <div className="space-y-2">
            <div>
              <Label>Cidade</Label>
              <select className="input" value={r.city_id} onChange={e=>setR({...r, city_id:e.target.value})}>
                <option value="">Selecione</option>
                {cities.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div><Label>Nome</Label><Input value={r.name} onChange={e=>setR({...r, name:e.target.value})} /></div>
            <div><Label>Descrição</Label><Textarea value={r.description} onChange={e=>setR({...r, description:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Faixa de Preço</Label><Input value={r.price_range} onChange={e=>setR({...r, price_range:e.target.value})} /></div>
              <div><Label>Avaliação (0-5)</Label><Input type="number" step="0.1" value={r.rating} onChange={e=>setR({...r, rating:e.target.value})} /></div>
            </div>

            <div className="mt-2">
              <Label>Imagem do restaurante</Label>
              <div className="flex items-center gap-3">
                <label className="btn" htmlFor="up-rest"><ImageIcon className="size-4 mr-2" /> Selecionar imagem</label>
                <input id="up-rest" type="file" accept="image/*" className="hidden" onChange={(e)=>setRFile(e.target.files?.[0] || null)} />
                {isUpR && <span className="text-xs text-gray-500">Enviando...</span>}
              </div>
              {rPrev && (
                <div className="mt-2 relative rounded-lg overflow-hidden ring-1 ring-white/10" style={{ aspectRatio: '16 / 9' }}>
                  <img src={rPrev} alt="Prévia" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" disabled={!token || !r.city_id || !r.name} onClick={async()=>{
                let image_url: string | undefined
                if (rFile) { try { setIsUpR(true); image_url = await uploadImage(rFile, 'restaurants', r.name) } finally { setIsUpR(false) } }
                const saved = await api('/api/restaurants','POST',{ ...r, ...(image_url ? { image_url } : {}) })
                alert('Restaurante criado!')
                setR({ city_id:'', name:'', description:'', price_range:'', rating:'' }); setRFile(null)
                if (saved?.city_id) { await refreshCity(Number(saved.city_id)); await revalidateCityById(Number(saved.city_id)) }
              }}>Salvar restaurante</Button>
            </div>
          </div>
        </div>

        {/* hotel */}
        <div className="card p-4">
          <h2 className="font-semibold text-lg mb-2">Cadastrar Hotel</h2>
          <div className="space-y-2">
            <div>
              <Label>Cidade</Label>
              <select className="input" value={h.city_id} onChange={e=>setH({...h, city_id:e.target.value})}>
                <option value="">Selecione</option>
                {cities.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div><Label>Nome</Label><Input value={h.name} onChange={e=>setH({...h, name:e.target.value})} /></div>
            <div><Label>Descrição</Label><Textarea value={h.description} onChange={e=>setH({...h, description:e.target.value})} /></div>
            <div><Label>Diária (R$)</Label><Input type="number" step="0.01" value={h.nightly_price} onChange={e=>setH({...h, nightly_price:e.target.value})} /></div>

            <div className="mt-2">
              <Label>Imagem do hotel</Label>
              <div className="flex items-center gap-3">
                <label className="btn" htmlFor="up-hotel"><ImageIcon className="size-4 mr-2" /> Selecionar imagem</label>
                <input id="up-hotel" type="file" accept="image/*" className="hidden" onChange={(e)=>setHFile(e.target.files?.[0] || null)} />
                {isUpH && <span className="text-xs text-gray-500">Enviando...</span>}
              </div>
              {hPrev && (
                <div className="mt-2 relative rounded-lg overflow-hidden ring-1 ring-white/10" style={{ aspectRatio: '16 / 9' }}>
                  <img src={hPrev} alt="Prévia" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" disabled={!token || !h.city_id || !h.name} onClick={async()=>{
                let image_url: string | undefined
                if (hFile) { try { setIsUpH(true); image_url = await uploadImage(hFile, 'hotels', h.name) } finally { setIsUpH(false) } }
                const saved = await api('/api/hotels','POST',{ ...h, ...(image_url ? { image_url } : {}) })
                alert('Hotel criado!')
                setH({ city_id:'', name:'', description:'', nightly_price:'' }); setHFile(null)
                if (saved?.city_id) { await refreshCity(Number(saved.city_id)); await revalidateCityById(Number(saved.city_id)) }
              }}>Salvar hotel</Button>
            </div>
          </div>
        </div>
      </div>

      {/* =================== GERENCIAR POR CIDADE (excluir) =================== */}
      <div className="card p-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Gerenciar por cidade (excluir)</h2>
          <span className="text-sm text-gray-500">Clique na “pasta” para abrir</span>
        </div>

        <div className="mt-4 space-y-4">
           {cities.map((city) => {
  const isOpen = !!open[city.id]
  const totals = totalsFor(city.id)
  const data = byCity[city.id] ?? { attractions: [], restaurants: [], hotels: [] }

  return (
    <div key={city.id} className="rounded-xl border border-white/15 bg-white/5">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          className="flex-1 text-left flex items-center gap-3"
          onClick={async () => {
            setOpen(prev => ({ ...prev, [city.id]: !prev[city.id] }))
            if (!byCity[city.id]) await refreshCity(city.id)
          }}
        >
          {isOpen ? <FolderOpen className="size-5 text-white/70" /> : <Folder className="size-5 text-white/70" />}
          <div>
            <div className="font-medium">{city.name}</div>
            <div className="text-xs text-gray-400">
              {totals.pts} pts • {totals.rests} rests • {totals.hots} hotéis
            </div>
          </div>
        </button>

        {/* Botão excluir cidade */}
        <button
          className="ml-4 text-red-400 text-sm hover:text-red-500"
          onClick={async () => {
            if (!confirm(`Tem certeza que deseja excluir a cidade "${city.name}" e todos os seus dados?`)) return
            await fetch(`/api/cities?id=${city.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } })
            alert(`Cidade "${city.name}" excluída com sucesso!`)
            // atualiza lista
            const fresh = await fetch('/api/cities', { cache: 'no-store' }).then(r => r.json())
            if (Array.isArray(fresh)) setCities(fresh)
            await fetch('/api/revalidate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
              body: JSON.stringify({ paths: ['/'] }),
            })
          }}
        >
          Excluir
        </button>
      </div>

      {isOpen && (
        <div className="px-4 pb-4 grid md:grid-cols-3 gap-4">
          {/* Pontos */}
          <div className="rounded-lg border border-white/10 p-3">
            <div className="font-semibold mb-2">Pontos turísticos</div>
            {data.attractions.length ? (
              <ul className="space-y-2">
                {data.attractions.map((it) => (
                  <li key={it.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                    <span className="inline-flex items-center gap-2"><Folder className="size-4 text-white/60" /> {it.name}</span>
                    <button
                      className="text-red-500 text-sm"
                      onClick={async () => {
                        if (!confirm(`Excluir ponto "${it.name}"?`)) return
                        await fetch(`/api/attractions?id=${it.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } })
                        await refreshCity(city.id)
                        await revalidateCityById(city.id)
                      }}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-400">Nenhum ponto cadastrado.</p>}
          </div>

          {/* Restaurantes */}
          <div className="rounded-lg border border-white/10 p-3">
            <div className="font-semibold mb-2">Restaurantes</div>
            {data.restaurants.length ? (
              <ul className="space-y-2">
                {data.restaurants.map((it) => (
                  <li key={it.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                    <span className="inline-flex items-center gap-2"><Folder className="size-4 text-white/60" /> {it.name}</span>
                    <button
                      className="text-red-500 text-sm"
                      onClick={async () => {
                        if (!confirm(`Excluir restaurante "${it.name}"?`)) return
                        await fetch(`/api/restaurants?id=${it.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } })
                        await refreshCity(city.id)
                        await revalidateCityById(city.id)
                      }}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-400">Nenhum restaurante cadastrado.</p>}
          </div>

          {/* Hotéis */}
          <div className="rounded-lg border border-white/10 p-3">
            <div className="font-semibold mb-2">Hotéis</div>
            {data.hotels.length ? (
              <ul className="space-y-2">
                {data.hotels.map((it) => (
                  <li key={it.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                    <span className="inline-flex items-center gap-2"><Folder className="size-4 text-white/60" /> {it.name}</span>
                    <button
                      className="text-red-500 text-sm"
                      onClick={async () => {
                        if (!confirm(`Excluir hotel "${it.name}"?`)) return
                        await fetch(`/api/hotels?id=${it.id}`, { method: 'DELETE', headers: { 'x-admin-token': token } })
                        await refreshCity(city.id)
                        await revalidateCityById(city.id)
                      }}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-400">Nenhum hotel cadastrado.</p>}
          </div>
        </div>
      )}
    </div>
  )
})}

        </div>
      </div>
    </Container>
  )
}