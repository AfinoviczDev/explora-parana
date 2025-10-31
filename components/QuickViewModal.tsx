"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function QuickViewModal({ open, onClose, children, title }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 20, opacity: 0, scale: .98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: .98 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative z-[61] w-full max-w-lg rounded-2xl bg-white text-[#0E1E1A] shadow-2xl overflow-hidden"
          >
            {title ? (
              <div className="px-5 py-4 border-b border-black/10 font-semibold">{title}</div>
            ) : null}
            <div className="p-5">{children}</div>
            <div className="px-5 py-4 border-t border-black/10 text-right">
              <button
                onClick={onClose}
                className="inline-flex items-center rounded-lg bg-[#2F5F55] text-white px-4 py-2"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
