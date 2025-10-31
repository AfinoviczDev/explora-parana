export default function AboutExplora() {
  return (
    <section className="select-none text-[#23423C]">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">O que é o Explora Paraná?</h2>
        <p className="text-[#4A635F] mt-2 max-w-2xl mx-auto">
          Um guia visual e curado para você descobrir cidades, pontos turísticos,
          restaurantes e hotéis.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Descubra", desc: "Inspiração com fotos e descrições curadas." },
          { title: "Planeje", desc: "Salve cidades, veja destaques e crie seu roteiro." },
          { title: "Explore", desc: "Vá do digital ao real com informações práticas." },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white backdrop-blur-md ring-1 ring-black/10 shadow-[0_10px_30px_rgba(0,0,0,.08)] p-6 hover:shadow-[0_14px_40px_rgba(0,0,0,.12)] transition"
          >
            <div className="text-lg font-semibold text-[#0E1E1A]">{c.title}</div>
            <p className="text-[#334B47] mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
