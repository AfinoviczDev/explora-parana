import ShowcaseCarouselClient, { ShowcaseItem } from "./ShowcaseCarouselClient";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export default async function HotelsShowcase() {
  const supabase = getSupabasePublic();

  const { data: hotelsRaw } = await supabase
    .from("hotels")
    .select("id,name,description,image_url,city_id")
    .order("id", { ascending: false })
    .limit(30);

  const hotels = (hotelsRaw || []).filter(h => !!(h as any).image_url && (h as any).image_url.trim() !== "");

  const cityIds = Array.from(new Set(hotels.map(h => h.city_id).filter(Boolean)));
  let slugById: Record<number, string> = {};
  if (cityIds.length) {
    const { data: cities } = await supabase
      .from("cities")
      .select("id,slug")
      .in("id", cityIds);
    if (cities) slugById = Object.fromEntries(cities.map(c => [c.id as number, c.slug as string]));
  }

  const items: ShowcaseItem[] = hotels.map(h => ({
    id: h.id,
    name: h.name,
    description: h.description,
    image_url: (h as any).image_url,
    href: slugById[h.city_id as number] ? `/cidade/${slugById[h.city_id as number]}` : "/hoteis",
  }));

  return (
    <ShowcaseCarouselClient
      items={items}
      title="Hospede-se bem"
      subtitle="Hotéis e pousadas do Paraná"
      theme="green"
      interval={3500}
      align="right"  // >>> HOTÉIS À DIREITA
    />
  );
}
