"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Props = {
  title: string;
  paragraphs: string[];
  theme?: "beige" | "green";
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const word = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SmoothTyping({ title, paragraphs, theme = "beige" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });

  return (
    <div
      ref={ref}
      className={theme === "green" ? "text-[#E5DCC9]" : "text-[#23423C]"}
      style={{ willChange: "transform" }}
    >
      <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>

      <div className="mt-4 space-y-3 max-w-prose">
        {paragraphs.map((p, idx) => (
          <Paragraph key={idx} text={p} theme={theme} inView={inView} />
        ))}
      </div>
    </div>
  );
}

function Paragraph({ text, theme, inView }: { text: string; theme: "beige" | "green"; inView: boolean }) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  return (
    <motion.p
      className={theme === "green" ? "text-white/85" : "text-[#4A635F]"}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {tokens.map((t, i) =>
        t.trim() ? (
          <motion.span key={i} variants={word} className="inline-block">
            {t}
          </motion.span>
        ) : (
          <span key={i}>{t}</span>
        )
      )}
    </motion.p>
  );
}
