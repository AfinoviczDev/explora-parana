"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PostcardItem = {
  id: number | string;
  title: string;
  description: string;
  image_url: string;
};

export default function PostcardsClient({ items }: { items: PostcardItem[] }) {
  const [i, setI] = useState(0);
  const has = items.length > 0;

  useEffect(() => {
    if (!has) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length, has]);

  if (!has) {
    return (
      <section className="bg-[#F4F1EA] text-[#23423C] py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Pontos Turísticos</h2>
          <p className="text-[#4A635F] mt-2">Em breve cartões do Paraná em Foto</p>
        </div>
      </section>
    );
  }

  const it = items[i];

  return (
    <section className="bg-[#F4F1EA] text-[#23423C] py-16 md:py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Pontos Turísticos</h2>
        <p className="text-[#4A635F] mt-2">Postcards animados — Paraná em Foto</p>

        <div className="mt-10 grid place-items-center">
          <div className="relative w-full max-w-[720px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 12, rotate: -1.5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, rotate: 1.5, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
              >
                <div className="relative" style={{ aspectRatio: "16 / 9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image_url}
                    alt={it.title}
                    className="h-full w-full object-cover"
                  />
                  {/* “selo”/carimbo */}
                  <div className="absolute left-5 top-5">
                    <div className="uppercase tracking-wider text-[10px] px-2 py-1 rounded-md bg-[#E5DCC9] text-[#23423C]">
                      Paraná em Foto
                    </div>
                  </div>
                  {/* vinheta leve */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="p-5 text-left">
                  <div className="text-lg font-semibold">{it.title}</div>
                  {it.description && (
                    <p className="text-[#4A635F] text-sm mt-1 line-clamp-2">{it.description}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
