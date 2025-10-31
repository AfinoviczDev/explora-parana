"use client";

import { useState } from "react";

export default function CityTabsClient({
  tabs,
}: {
  tabs: { key: string; label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div className="text-[#F7F3EB]">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={[
                "px-4 py-2 rounded-full text-sm whitespace-nowrap transition",
                on
                  ? "bg-white/90 text-[#23423C] ring-1 ring-black/10"
                  : "bg-white/10 hover:bg-white/15 ring-1 ring-white/15",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tabs.map((t) => (
          <div key={t.key} className={t.key === active ? "block" : "hidden"}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
