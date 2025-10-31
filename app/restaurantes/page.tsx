import { Metadata } from "next";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Restaurantes — Explora Paraná",
  description: "Veja os restaurantes cadastrados no Explora Paraná.",
};

type Restaurant = {
  id: number;
  name: string;
  city_name?: string | null;
  image_url?: string | null;
  description?: string | null;
  slug?: string | null;
};

export default async function Page() {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .order("name", { ascending: true });

  const items = (data || []) as Restaurant[];

  return <RestaurantsIndexClient items={items} />;
}

import RestaurantsIndexClient from "./_client";
