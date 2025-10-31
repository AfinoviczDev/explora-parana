"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type City = {
  id: number;
  name: string;
  slug: string;
  banner_image_url?: string | null;
  description?: string | null;
};

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/cidades", label: "Cidades" },
  { href: "/pontos-turisticos", label: "Pontos turísticos" },
  { href: "/restaurantes", label: "Restaurantes" },
  { href: "/hoteis", label: "Hotéis" },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/cities", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setCities(d) })
      .catch(() => setCities([]));
  }, []);

  const results = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return [];
    return cities.filter(c => c.name.toLowerCase().includes(qq)).slice(0, 6);
  }, [q, cities]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function goTo(index: number) {
    const item = results[index];
    if (!item) return;
    router.push(`/cidade/${item.slug}`);
    setQ("");
    setFocused(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0E1E1A]/80 backdrop-blur border-b border-white/10">
      {/* Container alinhado com as seções */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Grid: logo | links (centro) | busca */}
        <div className="h-[84px] grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT — logo (tamanho preservado) */}
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Explora Paraná"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[#E5DCC9] font-bold text-lg md:text-xl whitespace-nowrap"
            >
              Explora Paraná
            </motion.span>
          </Link>

          {/* CENTER — navegação centralizada */}
          <nav className="hidden md:flex justify-center items-center gap-x-6 gap-y-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — busca (com largura limitada para caber no container) */}
          <div ref={boxRef} className="relative hidden md:block w-full max-w-[420px] justify-self-end">
            <div className="flex items-center bg-white rounded-xl overflow-hidden ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-[#2F5F55] transition">
              <Search className="w-5 h-5 text-[#2F5F55] ml-3" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setActiveIndex(0); }}
                onFocus={() => setFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)); }
                  if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
                  if (e.key === "Enter")     { e.preventDefault(); goTo(activeIndex); }
                  if (e.key === "Escape")    { setFocused(false); }
                }}
                placeholder="Busque por uma cidade..."
                className="flex-1 px-3 py-2.5 outline-none text-sm text-[#0E1E1A]"
              />
            </div>

            <AnimatePresence>
              {focused && q && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl ring-1 ring-black/10 overflow-hidden"
                >
                  {results.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => goTo(i)}
                      className={`w-full text-left flex gap-3 p-3 items-center hover:bg-[#EEF4F1] transition ${
                        i === activeIndex ? "bg-[#EEF4F1]" : ""
                      }`}
                    >
                      <div className="relative w-14 h-10 rounded-md overflow-hidden ring-1 ring-black/10 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {c.banner_image_url
                          ? <img src={c.banner_image_url} alt={c.name} className="h-full w-full object-cover" />
                          : <div className="h-full w-full bg-[#DDE7E2]" />
                        }
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0E1E1A]">{c.name}</div>
                        {c.description && (
                          <div className="text-xs text-[#4A635F] line-clamp-1">{c.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE — botão menu (coluna da direita em mobile) */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden justify-self-end text-[#E5DCC9] border border-[#E5DCC9]/30 rounded-lg px-3 py-2"
          >
            Menu
          </button>
        </div>

        {/* Mobile dropdown (mesmos links) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden pb-3"
            >
              <nav className="flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="text-[#E5DCC9] py-2 border-b border-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
