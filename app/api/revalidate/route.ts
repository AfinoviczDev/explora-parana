// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-admin-token')
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { paths } = await req.json().catch(() => ({ paths: [] as string[] }))
  if (Array.isArray(paths)) {
    for (const p of paths) {
      try { revalidatePath(p) } catch {}
    }
  }

  return NextResponse.json({ ok: true, revalidated: paths || [] })
}
