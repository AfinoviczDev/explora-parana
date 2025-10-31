import { Metadata } from "next";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pontos turísticos — Explora Paraná",
  description: "Descubra os principais pontos turísticos cadastrados no Explora Paraná.",
};

type Attraction = {
  id: number;
  name: string;
  city_id: number | null;
  city_name?: string | null;
  image_url?: string | null;
  description?: string | null;
  slug?: string | null;
};

export default async function Page() {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("attractions")
    .select("*")
    .order("name", { ascending: true });

  const items = (data || []) as Attraction[];

  // 🔽 wrapper client: aqui NÃO passamos função
  return <AttractionsIndexClient items={items} />;
}

// Import lazy (evita marcar esta page como client)
import AttractionsIndexClient from "./_client";
