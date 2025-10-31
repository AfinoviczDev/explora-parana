"use client";

import { useEffect, useRef } from "react";

const logos = [
  "/logos/parceiro1.svg",
  "/logos/parceiro2.svg",
  "/logos/parceiro3.svg",
  "/logos/parceiro4.svg",
  "/logos/parceiro5.svg",
];

export default function PartnersStrip() {
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!track.current) return;
    let x = 0;
    let raf = 0;
    const step = () => {
      x = (x - 0.3) % (track.current!.scrollWidth / 2);
      track.current!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="min-h-[60svh] w-screen bg-[#E9E4D8] grid place-items-center px-6">
      <div className="w-full max-w-7xl">
        <p className="text-[#4A635F] text-sm mb-4">Apoio e parceiros</p>
        <div className="relative overflow-hidden rounded-xl bg-white/70 ring-1 ring-black/10">
          <div ref={track} className="flex gap-12 py-8 px-8 will-change-transform whitespace-nowrap">
            {[...logos, ...logos].map((src, i) => (
              <img key={i} src={src} alt="parceiro" className="h-8 md:h-10 opacity-80" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
