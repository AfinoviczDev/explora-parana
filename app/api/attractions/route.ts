import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  const expected = process.env.ADMIN_TOKEN
  return Boolean(token && expected && token === expected)
}

// GET ?city_id=123  -> lista pontos (filtra se houver city_id)
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const cityId = new URL(req.url).searchParams.get('city_id')
  const supabase = getSupabaseAdmin()

  let q = supabase.from('attractions').select('*').order('name')
  if (cityId) q = q.eq('city_id', Number(cityId))

  const { data, error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// CRIAR ponto
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const supabase = getSupabaseAdmin()

  // Apenas colunas garantidas no schema
  const payload = {
    city_id: Number(body.city_id),
    name: body.name,
    description: body.description ?? null,
    image_url: body.image_url ?? null,
  }

  const { data, error } = await supabase
    .from('attractions')
    .insert([payload])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

// EXCLUIR ponto
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('attractions').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ success: true })
}
