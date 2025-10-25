import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  const expected = process.env.ADMIN_TOKEN
  return token && expected && token === expected
}

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('cities').select('*').order('name',{ascending:true})
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('cities').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('cities').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}