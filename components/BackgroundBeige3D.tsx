"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function BackgroundBeige3D() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1200], [0, -40]);
  const y2 = useTransform(scrollY, [0, 1200], [0, 60]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#F4F1EA]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "18px 18px",
          mixBlendMode: "multiply",
        }}
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-1/4 -left-1/4 w-[140vmin] h-[140vmin] rounded-full blur-[80px]"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,.45)_0%,_rgba(255,255,255,0)_65%)]" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-20vmin] right-[-10vmin] w-[120vmin] h-[120vmin] rounded-full blur-[90px]"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_40%_60%,_rgba(229,220,201,.55)_0%,_rgba(229,220,201,0)_70%)]" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[10%] top-[30%] w-[42vmin] h-[42vmin] rounded-[40%] bg-[#E8E0CF] blur-[50px] opacity-60"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[12%] top-[10%] w-[32vmin] h-[32vmin] rounded-[40%] bg-[#EFE8D9] blur-[50px] opacity-70"
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,.05)_100%)]" />
    </div>
  );
}
