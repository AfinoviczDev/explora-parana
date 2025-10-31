"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Restaurant = {
  id: number;
  name: string;
  city_name?: string | null;
  image_url?: string | null;
  description?: string | null;
  slug?: string | null;
};

export default function RestaurantsIndexClient({ items }: { items: Restaurant[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter(i =>
      i.name.toLowerCase().includes(qq) ||
      (i.city_name || "").toLowerCase().includes(qq)
    );
  }, [q, items]);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">Sabores</p>
        <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#E5DCC9]">Restaurantes</h1>
        <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
        <div className="mt-5">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar restaurante…"
            className="w-full md:w-[420px] rounded-xl bg-white/95 text-[#0E1E1A] px-4 py-2.5 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-[#2F5F55]"
          />
        </div>
      </header>

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={q}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition group"
            >
              <Link href={r.slug ? `/restaurante/${r.slug}` : "#"} className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image_url || "/placeholder.jpg"}
                  alt={r.name}
                  className="h-44 w-full object-cover group-hover:scale-[1.02] transition"
                />
                <div className="p-4">
                  <div className="text-xs text-white/70">{r.city_name || "Paraná"}</div>
                  <h3 className="text-white font-semibold mt-1">{r.name}</h3>
                  {r.description && (
                    <p className="text-white/70 text-sm mt-1 line-clamp-2">{r.description}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
          {!filtered.length && (
            <div className="col-span-full text-white/70">Nenhum restaurante encontrado.</div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
