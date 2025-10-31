import ShowcaseCarouselClient, { ShowcaseItem } from "./ShowcaseCarouselClient";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export default async function RestaurantsShowcase() {
  const supabase = getSupabasePublic();

  const { data: raw } = await supabase
    .from("restaurants")
    .select("id,name,description,image_url,city_id")
    .order("id", { ascending: false })
    .limit(30);

  const restaurants = (raw || []).filter(r => !!(r as any).image_url && (r as any).image_url.trim() !== "");

  const cityIds = Array.from(new Set(restaurants.map(r => r.city_id).filter(Boolean)));
  let slugById: Record<number, string> = {};
  if (cityIds.length) {
    const { data: cities } = await supabase
      .from("cities")
      .select("id,slug")
      .in("id", cityIds);
    if (cities) slugById = Object.fromEntries(cities.map(c => [c.id as number, c.slug as string]));
  }

  const items: ShowcaseItem[] = restaurants.map(r => ({
    id: r.id,
    name: r.name,
    description: r.description,
    image_url: (r as any).image_url,
    href: slugById[r.city_id as number] ? `/cidade/${slugById[r.city_id as number]}` : "/restaurantes",
  }));

  return (
    <ShowcaseCarouselClient
      items={items}
      title="Sabores do Paraná"
      subtitle="Restaurantes em destaque"
      theme="beige"
      interval={3500}
      align="left"   // >>> SABORES À ESQUERDA
    />
  );
}
