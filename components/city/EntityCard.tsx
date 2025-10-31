"use client";

import Link from "next/link";

export default function EntityCard({
  type,
  item,
}: {
  type: "attraction" | "restaurant" | "hotel";
  item: any;
}) {
  const img =
    item.image_url ||
    item.banner_image_url ||
    item.hero_image_url ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop";

  const href =
    type === "restaurant"
      ? "/restaurantes"
      : type === "hotel"
      ? "/hoteis"
      : "/pontos-turisticos";

  return (
    <Link
      href={href}
      className="group rounded-2xl overflow-hidden bg-white ring-1 ring-black/10 shadow-[0_10px_30px_rgba(0,0,0,.10)] hover:shadow-[0_16px_44px_rgba(0,0,0,.16)] transition block"
    >
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute left-4 bottom-4 right-4">
          <div className="text-white font-semibold text-lg drop-shadow">{item.name}</div>

          {type === "restaurant" && (
            <p className="text-white/90 text-sm">
              {item.cuisine || "Culinária local"} • {item.price_range ? `R$ ${item.price_range}` : "Preço variado"}{" "}
              {item.rating ? `• ⭐ ${item.rating}` : ""}
            </p>
          )}

          {type === "hotel" && (
            <p className="text-white/90 text-sm">
              {item.daily_from ? `Diárias desde R$ ${item.daily_from}` : "Diárias variam"}{" "}
              {item.rating ? `• ⭐ ${item.rating}` : ""} {item.benefits ? `• ${item.benefits}` : ""}
            </p>
          )}

          {type === "attraction" && (
            <p className="text-white/90 text-sm line-clamp-2">{item.description || "Conheça esse lugar!"}</p>
          )}
        </div>
      </div>

      {/* rodapé leve */}
      <div className="px-4 py-3 text-[#23423C] text-sm flex items-center justify-between">
        <span className="opacity-70">
          {type === "restaurant" ? "Restaurante" : type === "hotel" ? "Hotel/Pousada" : "Ponto turístico"}
        </span>
        <span className="group-hover:translate-x-0.5 transition">Ver detalhes →</span>
      </div>
    </Link>
  );
}
