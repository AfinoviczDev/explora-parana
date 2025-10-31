"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";

type Card = { title: string; desc: string; emoji: string };

export default function ParallaxShowcase() {
  const cards: Card[] = [
    { title: "Curadoria", desc: "Conteúdo revisado para inspirar com qualidade.", emoji: "✨" },
    { title: "Mapa inteligente", desc: "Navegue por interesse e descubra perto de você.", emoji: "🗺️" },
    { title: "Roteiros", desc: "Sugestões de 1–3 dias por tema e região.", emoji: "📍" },
  ];

  return (
    <section className="bg-[#F4F1EA] py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Destaques do projeto"
          subtitle="Alguns diferenciais que tornam o Explora Paraná especial"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <ParallaxCard key={c.title} {...c} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ title, desc, emoji, idx }: Card & { idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-20, 20], [8, -8]);
  const rotateY = useTransform(x, [-20, 20], [-8, 8]);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg h-full"
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const b = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        x.set((dx / b.width) * 40);
        y.set((dy / b.height) * 40);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className="text-4xl">{emoji}</div>
      <div className="font-semibold text-lg mt-3 text-[#23423C]">{title}</div>
      <p className="text-[#4A635F] mt-2">{desc}</p>
    </motion.div>
  );
}
