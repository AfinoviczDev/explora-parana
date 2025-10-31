import { getSupabasePublic } from "@/lib/supabasePublic";
import AttractionsAutoCarousel, { AttractionItem } from "./AttractionsAutoCarousel";

export const revalidate = 60;

const ATTRACTION_TABLES = ["attractions", "tourist_attractions", "pontos_turisticos"] as const;

export default async function AttractionsShowcase() {
  const sb = getSupabasePublic();

  let rows:
    | {
        id: number | string;
        name: string;
        description?: string | null;
        image_url?: string | null;
        city_id?: number | null;
      }[] = [];

  for (const table of ATTRACTION_TABLES) {
    const { data, error } = await sb
      .from(table)
      .select("id,name,description,image_url,city_id")
      .order("id", { ascending: false })
      .limit(40);

    if (!error && data && data.length) {
      rows = data as any[];
      break;
    }
  }

  // Busca cidades para slug e nome
  const cityIds = Array.from(new Set(rows.map((r) => r.city_id).filter(Boolean))) as number[];
  let slugById: Record<number, string> = {};
  let nameById: Record<number, string> = {};
  if (cityIds.length) {
    const { data: cities } = await sb.from("cities").select("id,slug,name").in("id", cityIds);
    if (cities) {
      slugById = Object.fromEntries(cities.map((c: any) => [c.id as number, c.slug as string]));
      nameById = Object.fromEntries(cities.map((c: any) => [c.id as number, c.name as string]));
    }
  }

  let items: AttractionItem[] = (rows || []).map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description ?? null,
    image_url: r.image_url ?? null,
    href: r.city_id && slugById[r.city_id] ? `/cidade/${slugById[r.city_id]}#pontos` : "/pontos-turisticos",
    city_name: r.city_id ? nameById[r.city_id] ?? null : null,
  }));

  // placeholder se nada for encontrado
  if (items.length === 0) {
    items = [
      {
        id: "placeholder",
        name: "Exemplo de Ponto Turístico",
        description: "Cadastre pontos turísticos no painel para ativar o carrossel contínuo.",
        image_url:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop",
        href: "/pontos-turisticos",
        city_name: "Paraná",
      },
    ];
  }

  return (
    <section className="text-[#F7F3EB]">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Pontos Turísticos</h2>
        <p className="text-white/80 mt-2">Em destaque — deslize automático com cartões maiores</p>
      </div>

      <AttractionsAutoCarousel
        items={items}
        speed={70}        // ajuste a velocidade (px/s) a gosto
        cardWidth={460}   // cards maiores (md/lg escalam visualmente bem)
        gap={24}
      />
    </section>
  );
}
