// Server Component
import Container from "@/components/Container";
import { getSupabasePublic } from "@/lib/supabasePublic";


export const revalidate = 60;

type AnyRec = Record<string, any>;

function pickCover(item: AnyRec) {
  return (
    item.cover_url ||
    item.image_url ||
    item.photo_url ||
    item.banner ||
    item.banner_image_url ||
    ""
  );
}

export default async function HotelsCoverflowSection() {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("hotels")
    .select("*")
    .order("name", { ascending: true })
    .limit(12);

  const items: AnyRec[] = data || [];
  const featured = items[0];

  return (
    <Container>
      <section className="py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* texto da seção (igual conceito dos restaurantes, sem painel branco) */}
          <div className="order-1">
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              Hospedagem
            </div>
            <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-[#E5DCC9]">
              Hotéis & Pousadas
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
            <p className="mt-4 text-white/85 max-w-xl leading-relaxed">
              Hotéis, pousadas e refúgios que combinam aconchego e natureza.
              Dicas de onde ficar, como economizar e aproveitar mais sua estadia.
            </p>
          </div>

          {/* card visual do hotel (mesmo estilo dos restaurantes) */}
          <div className="order-2">
            {featured ? (
              <a
                href={
                  featured.city_slug ? `/cidade/${featured.city_slug}` : `/cidades`
                }
                className="block group rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl relative aspect-[16/10] md:aspect-[4/3] bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pickCover(featured)}
                  alt={featured.name || "Hotel"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute left-4 right-4 bottom-4">
                  {featured.city_name ? (
                    <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-black/40 text-white/90">
                      {featured.city_name}
                    </span>
                  ) : null}
                  <h3 className="mt-2 text-white font-semibold text-xl drop-shadow">
                    {featured.name || "Hotel"}
                  </h3>
                  {featured.subtitle ? (
                    <p className="text-white/85 text-sm">{featured.subtitle}</p>
                  ) : null}
                </div>
              </a>
            ) : (
              <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-8 text-white/70">
                Em breve hotéis nesta seção.
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
