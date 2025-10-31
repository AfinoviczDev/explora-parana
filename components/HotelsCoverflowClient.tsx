"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { HotelItem } from "./HotelsCoverflowSection";

export default function HotelsCoverflowClient({ items }: { items: HotelItem[] }) {
  const scroller = useRef<HTMLDivElement | null>(null);

  // autoplay suave (não pausa no hover)
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let x = 0;

    const step = () => {
      x += 0.35; // velocidade
      el.scrollLeft = x;
      if (Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth) {
        x = 0; // loop
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!items.length) {
    return (
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">Hospedagem</p>
          <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#E5DCC9]">
            Hotéis & Pousadas
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
        </header>
        <div className="text-white/70">Ainda não há hotéis cadastrados.</div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">Hospedagem</p>
        <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#E5DCC9]">
          Hotéis & Pousadas
        </h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
      </header>

      <div
        ref={scroller}
        className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((h) => (
          <motion.article
            key={h.id}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20"
          >
            <Link href={h.slug ? `/hotel/${h.slug}` : "#"} className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={h.image_url || "/placeholder.jpg"}
                alt={h.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="text-xs text-white/70">{h.city_name || "Paraná"}</div>
                <h3 className="text-white font-semibold mt-1">{h.name}</h3>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
