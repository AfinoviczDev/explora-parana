// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BUCKET = 'parana-assets'

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  const expected = process.env.ADMIN_TOKEN
  return token && expected && token === expected
}

// Slug seguro (ASCII). Remove acentos, troca não-alfanum por "-".
function slugify(input: string, fallback = 'item', max = 60) {
  const out = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')     // tudo que não for [a-z0-9] vira "-"
    .replace(/^-+|-+$/g, '')         // trim "-"
    .slice(0, max)
  return out || fallback
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const form = await req.formData()
    const file = form.get('file') as File | null
    const folderRaw = (form.get('folder') as string | null) || 'misc'
    const hintRaw = (form.get('hint') as string | null) || 'file'

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Garante bucket
    const { data: buckets } = await supabase.storage.listBuckets()
    const exists = buckets?.some(b => b.name === BUCKET)
    if (!exists) {
      const { error: createErr } = await supabase.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024,
      })
      if (createErr) {
        return NextResponse.json({ error: `Create bucket: ${createErr.message}` }, { status: 500 })
      }
    }

    // Normaliza segmentos da key
    const folder = slugify(folderRaw, 'misc')
    const hint = slugify(hintRaw, 'file')

    // Extensão segura
    const extFromType = file.type?.startsWith('image/') ? file.type.split('/')[1] : ''
    const extFromName = file.name.includes('.') ? file.name.split('.').pop() || '' : ''
    const ext = slugify((extFromType || extFromName || 'jpg'), 'jpg', 10).replace(/[^a-z0-9]/g, '') || 'jpg'

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `${folder}/${hint}/${fileName}` // ex.: attractions/jardim-botanico-de-curitiba/123abc.jpg

    // Upload
    const arrayBuffer = await file.arrayBuffer()
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, Buffer.from(arrayBuffer), {
        upsert: false,
        contentType: file.type || 'image/jpeg',
      })
    if (upErr) {
      return NextResponse.json({ error: upErr.message }, { status: 500 })
    }

    // URL pública
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
    const url = pub?.publicUrl
    if (!url) {
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 })
    }

    return NextResponse.json({ url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upload error' }, { status: 500 })
  }
}
