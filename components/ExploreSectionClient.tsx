"use client";

import Link from "next/link";
import { Landmark, Hotel, Utensils, MapPin } from "lucide-react";

type Counts = {
  attractions: number;
  hotels: number;
  restaurants: number;
  cities: number;
};

type Card = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function ExploreSectionClient({ counts }: { counts: Counts }) {
  const cards: Card[] = [
    {
      title: "Pontos Turísticos",
      subtitle: `${counts.attractions ?? 0}+ locais`,
      description: "Explore os principais destinos e atrações do Paraná",
      href: "/pontos-turisticos",
      Icon: Landmark,
    },
    {
      title: "Hotéis & Pousadas",
      subtitle: `${counts.hotels ?? 0}+ opções`,
      description: "Hospedagens selecionadas para sua estadia perfeita",
      href: "/hoteis",
      Icon: Hotel,
    },
    {
      title: "Restaurantes",
      subtitle: `${counts.restaurants ?? 0}+ locais`,
      description: "Saboreie a culinária típica paranaense",
      href: "/restaurantes",
      Icon: Utensils,
    },
    {
      title: "Todas as Cidades",
      subtitle: `${counts.cities ?? 0}+ cidades`,
      description: "Navegue por todas as cidades do estado",
      href: "/cidades",
      Icon: MapPin,
    },
  ];

  return (
    <section className="bg-[#F4F1EA] py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#23423C] mb-3">
          O que você quer explorar?
        </h2>
        <p className="text-[#4A635F] mb-12 max-w-2xl mx-auto">
          Um guia turístico visual do Paraná. Explore cidades, pontos turísticos,
          restaurantes e hotéis — tudo num só lugar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map(({ href, title, subtitle, description, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={title}
              className="group block bg-white shadow-md rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#23423C]"
            >
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-xl grid place-items-center transition-transform duration-300 group-hover:scale-105"
                     style={{ background: "linear-gradient(135deg, #DDE7E2, #CFE0DA)" }}>
                  <Icon className="h-10 w-10 text-[#23423C]" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#23423C]">{title}</h3>
              <p className="text-sm font-medium text-[#678A83]">{subtitle}</p>
              <p className="text-sm text-[#4A635F] mt-2">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
