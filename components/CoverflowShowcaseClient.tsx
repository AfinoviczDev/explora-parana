"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Star, Ticket } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SmoothTyping from "./SmoothTyping";

export type CoverflowItem = {
  id: number | string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  href?: string;
  city_name?: string | null;
  cuisine?: string | null;
  price_range?: string | null;
  rating?: number | null;
  daily_from?: number | null;
  benefits?: string | null;
};

type Theme = "beige" | "green";
type Align = "left" | "right";

export default function CoverflowShowcaseClient({
  items,
  title,
  subtitle,
  theme = "beige",
  align = "left",
  autoplayMs = 3800,
  textBlocks,
  showHeading = true,
  cardHeight = "h-[520px] md:h-[600px] lg:h-[680px]",
  minHClass = "min-h-[100svh]",
  padXClass = "px-6",
  showDetailPanel = true,
  useSectionBg = true,
}: {
  items: CoverflowItem[];
  title: string;
  subtitle?: string;
  theme?: Theme;
  align?: Align;
  autoplayMs?: number;
  textBlocks?: { title: string; paragraphs: string[] };
  showHeading?: boolean;
  cardHeight?: string;
  minHClass?: string;
  padXClass?: string;
  showDetailPanel?: boolean;
  useSectionBg?: boolean;
}) {
  const clean = useMemo(() => (items || []).filter((i) => i && i.image_url && i.image_url.trim() !== ""), [items]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4, once: false });

  useEffect(() => {
    if (!inView || paused || clean.length <= 1) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % clean.length), autoplayMs);
    return () => clearInterval(t);
  }, [inView, paused, clean.length, autoplayMs]);

  const windowItems = getWindowItems(clean, index);

  const themeIsGreen = theme === "green";
  const themeClasses = {
    sub: themeIsGreen ? "text-white/80" : "text-[#4A635F]",
    chip: themeIsGreen ? "bg-[#E5DCC9] text-[#23423C]" : "bg-white/90 text-[#23423C]",
    bg: themeIsGreen ? "bg-[#23423C] text-[#E5DCC9]" : "bg-[#F4F1EA] text-[#23423C]",
    text: themeIsGreen ? "text-[#E5DCC9]" : "text-[#23423C]",
    dot: themeIsGreen ? "bg-white/80" : "bg-black/40",
  };

  const flip = align === "right";
  const current = clean[index];

  return (
    <section
      ref={sectionRef}
      className={`${useSectionBg ? themeClasses.bg : ""} ${minHClass} ${padXClass} ${!useSectionBg ? themeClasses.text : ""}`}
      style={{ display: "grid", placeItems: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* CARDS */}
          <div className={flip ? "md:order-2" : ""}>
            {showHeading && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                {subtitle && <p className={`mt-2 ${themeClasses.sub}`}>{subtitle}</p>}
              </>
            )}

            <div className="mt-6 relative">
              {clean.length > 1 && (
                <>
                  <button
                    aria-label="Anterior"
                    onClick={() => setIndex((i) => (i - 1 + clean.length) % clean.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white p-2 hover:bg-black/40 backdrop-blur"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    aria-label="Próximo"
                    onClick={() => setIndex((i) => (i + 1) % clean.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white p-2 hover:bg-black/40 backdrop-blur"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className={`relative ${cardHeight}`}>
                <AnimatePresence mode="popLayout">
                  {windowItems.map(({ item, pos, key }) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.96, x: posToX(pos, flip), filter: "blur(4px)" }}
                      animate={{
                        opacity: pos === 0 ? 1 : 0.85,
                        scale: pos === 0 ? 1 : 0.94,
                        x: posToX(pos, flip),
                        filter: pos === 0 ? "blur(0px)" : "blur(2px)",
                      }}
                      exit={{ opacity: 0, scale: 0.96, x: posToX(pos, flip), filter: "blur(4px)" }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Card item={item} chipClass={themeClasses.chip} pointer={pos === 0} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {clean.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {clean.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Ir ao slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${i === index ? "w-6" : "w-2"} ${themeClasses.dot}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TEXTO + DETALHES */}
          <div className={flip ? "md:order-1" : ""}>
            {textBlocks && <SmoothTyping title={textBlocks.title} paragraphs={textBlocks.paragraphs} theme={theme} />}

            {showDetailPanel && current && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-black/10 p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-base font-semibold text-[#0E1E1A]">{current.name}</span>
                    {current.city_name && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#E5DCC9] text-[#23423C]">
                        <MapPin className="w-3.5 h-3.5" /> {current.city_name}
                      </span>
                    )}
                    {typeof current.rating === "number" && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#FFE8A3] text-[#6A4B00]">
                        <Star className="w-3.5 h-3.5" /> {current.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {current.description && <p className="text-sm text-[#1A2A27]/80">{current.description}</p>}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {current.cuisine && <DetailStat label="Culinária" value={current.cuisine} />}
                    {current.price_range && <DetailStat label="Faixa de preço" value={current.price_range} />}
                    {typeof current.daily_from === "number" && (
                      <DetailStat label="Diária a partir de" value={`R$ ${current.daily_from.toFixed(0)}`} />
                    )}
                    {current.benefits && (
                      <DetailStat label="Vantagens" value={current.benefits} icon={<Ticket className="w-3.5 h-3.5" />} />
                    )}
                  </div>

                  <div className="mt-4">
                    <Link href={current.href || "#"} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#23423C] text-[#E5DCC9] text-sm font-semibold hover:opacity-90">
                      Ver detalhes
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function getWindowItems(arr: CoverflowItem[], idx: number) {
  const n = arr.length;
  if (n === 0) return [];
  if (n === 1) return [{ item: arr[0], pos: 0 as const, key: `only-0` }];
  const pick = (o: number) => arr[(idx + o + n) % n];
  const res = [
    { item: pick(-2), pos: -2 as const, key: `${idx}-m2` },
    { item: pick(-1), pos: -1 as const, key: `${idx}-m1` },
    { item: pick(0), pos: 0 as const, key: `${idx}-0` },
    { item: pick(1), pos: 1 as const, key: `${idx}+1` },
    { item: pick(2), pos: 2 as const, key: `${idx}+2` },
  ];
  return res.filter((_, i) => (n === 2 ? i === 1 || i === 2 || i === 3 : n === 3 ? i !== 0 && i !== 4 : true));
}

function posToX(pos: -2 | -1 | 0 | 1 | 2, flip: boolean) {
  const base = { "-2": -300, "-1": -170, "0": 0, "1": 170, "2": 300 }[pos.toString() as "-2" | "-1" | "0" | "1" | "2"];
  return flip ? -base : base;
}

function Card({ item, chipClass, pointer }: { item: CoverflowItem; chipClass: string; pointer: boolean }) {
  const href = item.href || "#";
  const img = item.image_url || "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1600&q=80&auto=format&fit=crop";

  return (
    <Link
      href={href}
      className={`pointer-events-auto block w-[92%] md:w-[86%] lg:w-[82%] max-w-[820px] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg transition-transform duration-500 ${pointer ? "hover:scale-[1.02]" : "opacity-90"}`}
    >
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4 right-4">
          <div className={`inline-block text-[10px] px-2 py-1 rounded-md mb-2 ${chipClass}`}>Explora Paraná</div>
          <div className="text-white text-xl font-semibold drop-shadow">{item.name}</div>
          {item.description && <p className="text-white/90 text-sm drop-shadow line-clamp-2">{item.description}</p>}
        </div>
      </div>
    </Link>
  );
}

function DetailStat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white/60 ring-1 ring-black/10 p-3">
      <div className="text-[11px] uppercase tracking-wide text-[#0E1E1A]/60">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-[#0E1E1A] flex items-center gap-1">
        {icon} {value}
      </div>
    </div>
  );
}
