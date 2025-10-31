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

export default async function RestaurantsCoverflowSection() {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .order("name", { ascending: true })
    .limit(12);

  const items: AnyRec[] = data || [];
  const featured = items[0];

  return (
    <Container>
      <section className="py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* card visual (mantido, sem painel branco de detalhes) */}
          <div className="order-2 lg:order-1">
            {featured ? (
              <a
                href={
                  featured.city_slug
                    ? `/cidade/${featured.city_slug}`
                    : `/cidades`
                }
                className="block group rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl relative aspect-[16/10] md:aspect-[4/3] bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pickCover(featured)}
                  alt={featured.name || "Restaurante"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute left-4 right-4 bottom-4">
                  {featured.city_name ? (
                    <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-black/40 text-white/90">
                      {featured.city_name}
                    </span>
                  ) : null}
                  <h3 className="mt-2 text-white font-semibold text-xl drop-shadow">
                    {featured.name || "Restaurante"}
                  </h3>
                  {featured.subtitle ? (
                    <p className="text-white/85 text-sm">
                      {featured.subtitle}
                    </p>
                  ) : null}
                </div>
              </a>
            ) : (
              <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-8 text-white/70">
                Em breve restaurantes nesta seção.
              </div>
            )}
          </div>

          {/* texto da seção (sem o card branco à direita) */}
          <div className="order-1 lg:order-2">
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              Sabores do Paraná
            </div>
            <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-[#E5DCC9]">
              Restaurantes em destaque
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
            <p className="mt-4 text-white/85 max-w-xl leading-relaxed">
              Da barreado às delícias do litoral: sabores que contam histórias.
              Pequenos produtores, comida de raiz e experiências autênticas —
              um convite para provar, conhecer e compartilhar o Paraná.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
