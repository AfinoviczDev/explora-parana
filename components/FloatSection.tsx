"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FloatSection({
  children,
  className = "",
  dense = true,
  padYClass,
}: {
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
  /** opcional: override do padding vertical (ex.: "py-6 md:py-8") */
  padYClass?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  const py = padYClass ?? (dense ? "py-10 md:py-14" : "py-14 md:py-20");

  return (
    <section className={`${py} px-6`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 22, scale: 0.985, rotateX: 6, transformPerspective: 900 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-7xl mx-auto ${className}`}
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
