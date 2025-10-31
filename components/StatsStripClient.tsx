"use client";

import { useEffect, useRef, useState } from "react";

type Counts = {
  cities: number;
  attractions: number;
  restaurants: number;
  hotels: number;
};

export default function StatsStripClient({ counts }: { counts: Counts }) {
  const stats = [
    { label: "Cidades", value: counts.cities },
    { label: "Pontos Turísticos", value: counts.attractions },
    { label: "Restaurantes", value: counts.restaurants },
    { label: "Hotéis", value: counts.hotels },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl p-6 shadow text-center">
          <div className="text-3xl md:text-4xl font-bold text-[#23423C]">
            <AnimatedCounter value={s.value} />
          </div>
          <div className="text-[#4A635F] mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const duration = 900;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setDisplay(Math.floor(value * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return <div ref={ref}>{display}+</div>;
}
