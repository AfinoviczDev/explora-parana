import Link from "next/link";

export default function ExploreSection() {
  const items = [
    { href: "/pontos-turisticos", title: "Pontos Turísticos", desc: "Explore os principais destinos e atrações do Paraná", icon: "🏛️" },
    { href: "/hoteis", title: "Hotéis & Pousadas", desc: "Hospedagens selecionadas para sua estadia perfeita", icon: "🏨" },
    { href: "/restaurantes", title: "Restaurantes", desc: "Saboreie a culinária típica paranaense", icon: "🍴" },
    { href: "/cidades", title: "Todas as Cidades", desc: "Navegue por todas as cidades do estado", icon: "📍" },
  ];

  return (
    <section className="text-[#F7F3EB]">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">O que você quer explorar?</h2>
        <p className="text-white/80 mt-2 max-w-3xl mx-auto">
          Um guia turístico visual do Paraná. Explore cidades, pontos turísticos, restaurantes e hotéis — tudo num só lugar.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_8px_24px_rgba(0,0,0,.08)] p-6 hover:shadow-[0_12px_36px_rgba(0,0,0,.12)] transition"
          >
            <div className="h-14 w-14 rounded-xl bg-black/5 grid place-items-center text-2xl mb-4">
              <span>{it.icon}</span>
            </div>
            <div className="text-[#0E1E1A] font-semibold">{it.title}</div>
            <p className="text-[#334B47] text-sm mt-1">{it.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
