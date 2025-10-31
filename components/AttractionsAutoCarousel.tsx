"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export type AttractionItem = {
  id: number | string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  href?: string;
  city_name?: string | null;
};

type Props = {
  items: AttractionItem[];
  speed?: number;      // px/s
  cardWidth?: number;  // largura fixa do card (mantida!)
  gap?: number;        // px
};

export default function AttractionsAutoCarousel({
  items,
  speed = 60,
  cardWidth = 460, // << mantém o tamanho anterior
  gap = 24,
}: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [viewportW, setViewportW] = useState<number>(0);
  const [trackW, setTrackW] = useState<number>(0);
  const controls = useAnimation();

  useEffect(() => {
    const read = () => setViewportW(viewportRef.current?.clientWidth || window.innerWidth);
    read();
    const ro = new ResizeObserver(read);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", read);
    return () => {
      if (viewportRef.current) ro.unobserve(viewportRef.current);
      window.removeEventListener("resize", read);
    };
  }, []);

  const base = useMemo(() => (items || []).filter((it) => it?.image_url), [items]);

  // quantos cards cabem na tela (para não deixar buracos)
  const perCard = cardWidth + gap;
  const needVisible = Math.max(1, Math.ceil((viewportW + cardWidth) / perCard) + 1);

  // replica itens o suficiente e duplica para loop perfeito
  const loopList = useMemo(() => {
    if (base.length === 0) return [];
    const minBase = Math.max(base.length, Math.min(4, needVisible));
    let grown = [] as AttractionItem[];
    while (grown.length < minBase) grown = [...grown, ...base];
    return [...grown, ...grown];
  }, [base, needVisible]);

  useEffect(() => {
    if (!trackRef.current) return;
    const w = trackRef.current.scrollWidth / 2; // metade (1 ciclo)
    setTrackW(w);
  }, [loopList, viewportW]);

  useEffect(() => {
    if (!trackW) return;
    const duration = trackW / speed;
    controls.start({
      x: -trackW,
      transition: { duration, ease: "linear", repeat: Infinity },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackW, speed]);

  if (!loopList.length) return null;

  return (
    <div ref={viewportRef} className="relative select-none overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex"
        animate={controls}
        style={{ willChange: "transform", gap }}
      >
        {loopList.map((it, i) => (
          <Card key={`${it.id}-${i}`} item={it} baseW={cardWidth} />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ item, baseW }: { item: AttractionItem; baseW: number }) {
  const img =
    item.image_url ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  return (
    <Link
      href={item.href || "#"}
      className="flex-none shrink-0 block rounded-3xl overflow-hidden ring-1 ring-black/10 bg-white shadow-[0_12px_30px_rgba(0,0,0,.12)] hover:shadow-[0_18px_40px_rgba(0,0,0,.16)] transition"
      style={{ width: baseW }} // << largura fixa garantida
    >
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-4 bottom-4 right-4">
          {item.city_name && (
            <div className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-white/90 text-[#23423C] ring-1 ring-black/10 mb-2">
              {item.city_name}
            </div>
          )}
          <div className="text-white text-lg font-semibold drop-shadow">{item.name}</div>
          {item.description && (
            <p className="text-white/90 text-sm drop-shadow line-clamp-2">{item.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
