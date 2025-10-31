import { Metadata } from "next";
import { getSupabasePublic } from "@/lib/supabasePublic";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hotéis — Explora Paraná",
  description: "Hotéis e pousadas cadastrados no Explora Paraná.",
};

type Hotel = {
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
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });

  const items = (data || []) as Hotel[];

  return <HotelsIndexClient items={items} />;
}

import HotelsIndexClient from "./_client";
