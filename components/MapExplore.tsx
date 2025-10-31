"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function MapExplore() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.06, 1],
      x: [0, 10, 0],
      y: [0, -8, 0],
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <section className="min-h-[100svh] w-screen bg-[#23423C] text-[#E5DCC9] grid place-items-center px-6">
      <div className="w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
          <motion.div animate={controls} className="relative" style={{ aspectRatio: "16/7" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1526779259212-756e4d0f9f45?w=2000&q=80&auto=format&fit=crop"
              alt="Mapa do Paraná"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#23423C] via-[#23423C]/30 to-transparent" />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold">Navegue pelo mapa</h2>
              <p className="text-white/85 mt-2">
                Explore as cidades do estado, descubra hotéis, restaurantes e pontos turísticos perto de você.
              </p>
              <div className="mt-5">
                <Link
                  href="/cidades"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-[#E5DCC9] text-[#23423C] font-semibold hover:opacity-90"
                >
                  Abrir mapa de cidades
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
