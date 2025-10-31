"use client";

import { motion } from "framer-motion";

export default function CityHeaderHero({
  title,
  description,
  imageUrl,
  chips = [],
}: {
  title: string;
  description: string;
  imageUrl: string;
  chips?: { label: string; icon?: string }[];
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center mt-6">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F7F3EB]">{title}</h1>
        <p className="text-white/85 mt-3 max-w-xl">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md bg-white/90 text-[#23423C] text-sm">
              {c.icon && <span className="mr-1">{c.icon}</span>}
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: .98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: .6 }}
        className="rounded-3xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,.35)] ring-1 ring-black/20"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={title} className="w-full h-[320px] md:h-[420px] object-cover" />
      </motion.div>
    </div>
  );
}
