export default function Testimonials() {
  const data = [
    { quote: "Finalmente um lugar com tudo do Paraná num só site!", author: "Douglas, Curitiba" },
    { quote: "Roteiros certeiros e fotos lindas. Ajudou muito meu fim de semana em família.", author: "Ana, Londrina" },
    { quote: "Mapa e filtros fáceis. Salvou meu rolê!", author: "Marcos, Cascavel" },
  ];

  return (
    <section className="text-[#F7F3EB]">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
        Quem já explorou aprova
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((t, i) => (
          <figure
            key={i}
            className="rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_8px_24px_rgba(0,0,0,.08)] p-6"
          >
            <blockquote className="text-[#0E1E1A]">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-[#334B47] text-sm">— {t.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
