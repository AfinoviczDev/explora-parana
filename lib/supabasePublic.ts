import { createClient } from '@supabase/supabase-js'

export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    // Em vez de lançar erro, retorne null para a UI lidar com isso
    return null as unknown as ReturnType<typeof createClient>
  }
  return createClient(url, anon)
}
