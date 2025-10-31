"use client";

import { useState } from "react";
import SectionTitle from "./SectionTitle";

const data = [
  { q: "As fotos são próprias?", a: "Usamos imagens enviadas no painel e curadoria do time. Sempre com autorização ou fonte." },
  { q: "Posso sugerir lugares?", a: "Sim! Em breve abriremos um formulário para sugestões e correções." },
  { q: "Tem app?", a: "Estamos focados na experiência web responsiva. App nativo pode vir depois." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F4F1EA] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Perguntas frequentes" />
        <ul className="space-y-3">
          {data.map((f, i) => {
            const active = open === i;
            return (
              <li key={f.q} className="bg-white rounded-xl shadow">
                <button
                  className="w-full text-left p-4 font-medium text-[#23423C] flex justify-between items-center"
                  onClick={() => setOpen(active ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={`transition-transform ${active ? "rotate-90" : ""}`}>›</span>
                </button>
                {active && <div className="px-4 pb-4 text-[#4A635F]">{f.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
