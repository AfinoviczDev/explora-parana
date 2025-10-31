"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { id: number; name: string; description?: string | null; image_url?: string | null };

export type FilterChip = { key: string; label: string; value: string };

export default function DirectoryShell<T extends Item>({
  title,
  eyebrow,
  items,
  placeholder = "Buscar...",
  chips = [],
  renderCard,
}: {
  title: string;
  eyebrow?: string;
  items: T[];
  placeholder?: string;
  chips?: FilterChip[];
  renderCard: (item: T) => React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState<string>("");

  // debounce simples
  const [query, setQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQuery(q.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    let base = items;
    if (query) {
      base = base.filter((i) => i.name?.toLowerCase().includes(query));
    }
    if (chip) {
      base = base.filter((i: any) => {
        // procura a chave do chip no item (ex.: cuisine, category, price_range)
        const v = String(i[chip] ?? "").toLowerCase();
        return v && v !== "null" && v !== "undefined";
      });
    }
    return base;
  }, [items, query, chip]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* título */}
      <div className="mb-6">
        {eyebrow ? (
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">{eyebrow}</div>
        ) : null}
        <h1 className="mt-1 text-3xl md:text-4xl font-extrabold text-[#E5DCC9]">
          {title}
        </h1>
      </div>

      {/* barra de busca + chips */}
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full md:w-[380px] rounded-xl px-4 bg-white/10 border border-white/15 text-white/90 outline-none focus:border-white/30"
        />
        <div className="flex gap-2 flex-wrap">
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => setChip((prev) => (prev === c.key ? "" : c.key))}
              className={`h-10 rounded-full px-3 text-sm border transition ${
                chip === c.key
                  ? "bg-[#E5DCC9] text-emerald-900 border-transparent"
                  : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
              }`}
              title={c.label}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* grid com animação */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={query + "|" + chip}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((it) => renderCard(it))}
          {filtered.length === 0 && (
            <div className="col-span-full text-white/70 text-sm">
              Nada encontrado com os filtros atuais.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
