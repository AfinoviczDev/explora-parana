"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ShowcaseItem = {
  id: number | string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  href?: string;
};

type Theme = "beige" | "green";
type Align = "left" | "right";

export default function ShowcaseCarouselClient({
  items,
  title,
  subtitle,
  theme = "beige",
  interval = 3000,
  align = "left",
}: {
  items: ShowcaseItem[];
  title: string;
  subtitle?: string;
  theme?: Theme;
  interval?: number;
  align?: Align;
}) {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const setPV = () => {
      const w = window.innerWidth;
      if (w < 768) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    setPV();
    window.addEventListener("resize", setPV);
    return () => window.removeEventListener("resize", setPV);
  }, []);

  const baseItems = Array.isArray(items) ? items.filter(i => !!i && !!i.image_url) : [];
  const hasEnough = baseItems.length > 0;

  const extended = useMemo(() => {
    if (!hasEnough) return [];
    const buffer = baseItems.slice(0, perView);
    return [...baseItems, ...buffer];
  }, [baseItems, perView, hasEnough]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (paused || !hasEnough || extended.length <= perView) return;
    const t = window.setInterval(() => next(), interval);
    return () => window.clearInterval(t);
  }, [paused, hasEnough, extended.length, perView, interval]);

  function next() { setIndex((p) => p + 1); setAnimate(true); }
  function prev() {
    setAnimate(false);
    setIndex((p) => (p === 0 ? baseItems.length - 1 : p - 1));
    requestAnimationFrame(() => setAnimate(true));
  }

  useEffect(() => {
    if (!hasEnough) return;
    if (index >= baseItems.length) {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [index, baseItems.length, hasEnough]);

  const cardWidthPct = 100 / perView;

  const themeClasses = theme === "green"
    ? { section: "bg-[#23423C] text-[#E5DCC9]", sub: "text-white/80", dot: "bg-white/80" }
    : { section: "bg-[#F4F1EA] text-[#23423C]", sub: "text-[#4A635F]", dot: "bg-black/40" };

  const alignWrap = align === "right" ? "md:pl-24" : "md:pr-24"; // joga o bloco pro lado
  const alignInner = align === "right" ? "ml-auto" : "mr-auto";   // alinha o container do carrossel

  if (!hasEnough) {
    return (
      <section className={`${themeClasses.section} py-16 md:py-20 px-6`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {subtitle && <p className={`mt-2 ${themeClasses.sub}`}>{subtitle}</p>}
          <div className="mt-8 rounded-2xl border border-white/10 p-8 opacity-70">
            <p>Nenhum item com imagem ainda. Cadastre pelo admin e esta vitrine ficará linda 😊</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${themeClasses.section} py-16 md:py-20 px-6 ${alignWrap}`}>
      <div className="max-w-6xl mx-auto">
        <div className={`max-w-[980px] ${alignInner}`}>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          {subtitle && <p className={`mt-2 ${themeClasses.sub}`}>{subtitle}</p>}

          <div
            className="mt-8 relative rounded-2xl overflow-hidden shadow-xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              className="flex"
              style={{
                width: `${(extended.length * cardWidthPct)}%`,
                translateX: `-${index * cardWidthPct}%`,
                willChange: "transform",
              }}
              animate={{}}
              transition={animate ? { duration: 0.6, ease: "easeInOut" } : { duration: 0 }}
            >
              {extended.map((it, i) => (
                <div key={`${it.id}-${i}`} className="p-3" style={{ width: `${cardWidthPct}%`, flex: "0 0 auto" }}>
                  <Card item={it} theme={theme} />
                </div>
              ))}
            </motion.div>

            {baseItems.length > perView && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Próximo"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {baseItems.length > perView && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {baseItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIndex(i); setAnimate(true); }}
                    aria-label={`Ir ao slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === (index % baseItems.length) ? "w-6" : "w-2"} ${themeClasses.dot}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item, theme }: { item: ShowcaseItem; theme: Theme }) {
  const href = item.href || "#";
  const img = item.image_url!;
  return (
    <Link href={href} className="group block relative rounded-xl overflow-hidden ring-1 ring-black/10">
      <div className="relative" style={{ aspectRatio: "16 / 10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${theme === "green"
          ? "bg-gradient-to-t from-[#23423C]/70 via-[#23423C]/10 to-transparent"
          : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
          }`} />
        <div className="absolute left-4 right-4 bottom-4">
          <div className={`inline-block text-[10px] px-2 py-1 rounded-md mb-2 ${
            theme === "green" ? "bg-[#E5DCC9] text-[#23423C]" : "bg-white/90 text-[#23423C]"
          }`}>
            Explora Paraná
          </div>
          <div className="text-white text-lg font-semibold drop-shadow">{item.name}</div>
          {item.description && (
            <p className="text-white/90 text-sm drop-shadow line-clamp-2">{item.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
