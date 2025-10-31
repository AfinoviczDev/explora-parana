import SectionTitle from "./SectionTitle";
import StatsStripClient from "./StatsStripClient";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60; // cache leve

export default async function StatsStrip() {
  const supabase = getSupabasePublic();

  const [att, rest, hot, city] = await Promise.all([
    supabase.from("attractions").select("*", { count: "exact", head: true }),
    supabase.from("restaurants").select("*", { count: "exact", head: true }),
    supabase.from("hotels").select("*", { count: "exact", head: true }),
    supabase.from("cities").select("*", { count: "exact", head: true }),
  ]);

  const counts = {
    cities: city.count ?? 0,
    attractions: att.count ?? 0,
    restaurants: rest.count ?? 0,
    hotels: hot.count ?? 0,
  };

  return (
    <section className="bg-[#E9E4D8] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Nossos números" subtitle="Conteúdo sempre em expansão" />
        <StatsStripClient counts={counts} />
      </div>
    </section>
  );
}
