"use client";

type Base = { id: number; name: string; description?: string | null; image_url?: string | null };

function Img({ src, alt }: { src?: string | null; alt: string }) {
  const url =
    src ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=60&auto=format&fit=crop";
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );
}

export function RestaurantDirectoryCard({
  item,
  href = "#",
  badge,
}: {
  item: Base & { cuisine?: string | null; price_range?: string | null; rating?: number | null };
  href?: string;
  badge?: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img src={item.image_url} alt={item.name} />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-1 text-[11px] text-white/90">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#E5DCC9]">{item.name}</h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2">{item.description}</p>
        <div className="mt-3 text-[12px] text-white/70 flex gap-3">
          {item.cuisine && <span>🍽 {item.cuisine}</span>}
          {item.price_range && <span>💲 {item.price_range}</span>}
          {item.rating ? <span>⭐ {item.rating.toFixed(1)}</span> : null}
        </div>
      </div>
    </a>
  );
}

export function HotelDirectoryCard({
  item,
  href = "#",
}: {
  item: Base & { daily_from?: number | null; rating?: number | null };
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img src={item.image_url} alt={item.name} />
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-1 text-[11px] text-white/90">
          Explora Paraná
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#E5DCC9]">{item.name}</h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2">{item.description}</p>
        <div className="mt-3 text-[12px] text-white/70 flex gap-3">
          {item.daily_from ? <span>🏷 Diária desde R$ {item.daily_from}</span> : null}
          {item.rating ? <span>⭐ {item.rating.toFixed(1)}</span> : null}
        </div>
      </div>
    </a>
  );
}

export function AttractionDirectoryCard({
  item,
  href = "#",
}: {
  item: Base & { category?: string | null };
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Img src={item.image_url} alt={item.name} />
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-1 text-[11px] text-white/90">
            {item.category}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#E5DCC9]">{item.name}</h3>
        {item.description ? (
          <p className="mt-1 text-sm text-white/80 line-clamp-2">{item.description}</p>
        ) : null}
        <div className="mt-3 text-[12px] text-white/70">Ver detalhes →</div>
      </div>
    </a>
  );
}
