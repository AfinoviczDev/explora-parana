"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fullscreen overlay que faz o fade do escuro para a paleta do site
 * ao entrar na página. Respeita prefers-reduced-motion.
 */
export default function PageEntryFX() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 1, filter: "brightness(0.5)" }}
      animate={reduce ? { opacity: 0 } : { opacity: 0, filter: "brightness(1)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ background: "linear-gradient(180deg,#0d1b18 0%, rgba(13,27,24,0.7) 40%, transparent 100%)" }}
    />
  );
}
