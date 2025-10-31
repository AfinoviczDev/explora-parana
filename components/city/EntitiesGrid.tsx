"use client";

import { useMemo, useState } from "react";
import EntityCard from "./EntityCard";
import { motion } from "framer-motion";

type FilterDef = { key: string; label: string };

export default function EntitiesGrid({
  type, // "attraction" | "restaurant" | "hotel"
  items,
  filters = [],
  sortable = ["name"],
}: {
  type: "attraction" | "restaurant" | "hotel";
  items: any[];
  filters?: FilterDef[];
  sortable?: string[];
}) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<string>(sortable[0]);

  const filtered = useMemo(() => {
    let arr = [...items];

    // busca
    if (q.trim()) {
      arr = arr.filter((it) =>
        [it.name, it.description].some((v: string) =>
          (v || "").toLowerCase().includes(q.toLowerCase())
        )
      );
    }

    // filtros simples por igualdade
    for (const f of filters) {
      const v = selected[f.key];
      if (v && v !== "todos") {
        arr = arr.filter((it) => (it?.[f.key] || "").toString() === v);
      }
    }

    // ordenação básica
    arr.sort((a: any, b: any) => {
      const av = a?.[sort];
      const bv = b?.[sort];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return bv - av; // desc p/ nota/preço
      return String(av).localeCompare(String(bv));
    });

    return arr;
  }, [items, q, selected, sort, filters]);

  // opções únicas para filtros
  const filterOptions = useMemo(() => {
    const obj: Record<string, string[]> = {};
    for (const f of filters) {
      const set = new Set<string>();
      items.forEach((it) => {
        const v = it?.[f.key];
        if (v != null && v !== "") set.add(String(v));
      });
      obj[f.key] = ["todos", ...Array.from(set)];
    }
    return obj;
  }, [items, filters]);

  return (
    <div>
      {/* Barra de ferramentas */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar…"
          className="px-3 py-2 rounded-lg bg-white/90 text-[#23423C] ring-1 ring-black/10 w-full sm:w-64"
        />

        {filters.map((f) => (
          <select
            key={f.key}
            value={selected[f.key] ?? "todos"}
            onChange={(e) => setSelected((s) => ({ ...s, [f.key]: e.target.value }))}
            className="px-3 py-2 rounded-lg bg-white/90 text-[#23423C] ring-1 ring-black/10"
          >
            {filterOptions[f.key].map((opt) => (
              <option key={opt} value={opt}>
                {opt === "todos" ? `${f.label}: Todos` : opt}
              </option>
            ))}
          </select>
        ))}

        {sortable.length > 0 && (
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/90 text-[#23423C] ring-1 ring-black/10"
          >
            {sortable.map((s) => (
              <option key={s} value={s}>
                Ordenar por: {s}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {filtered.map((it) => (
          <EntityCard key={it.id} type={type} item={it} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-white/80">Nada encontrado com os filtros atuais.</div>
        )}
      </motion.div>
    </div>
  );
}
