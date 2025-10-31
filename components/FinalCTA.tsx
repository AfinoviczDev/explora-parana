import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#23423C] text-[#E5DCC9] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold">Pronto para explorar?</h3>
        <p className="mt-2 opacity-90">
          Descubra cidades, encontre lugares e monte seu próximo roteiro pelo Paraná.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/cidades" className="btn bg-[#E5DCC9] text-[#23423C] hover:opacity-90 px-5 py-2 rounded-md font-semibold">
            Ver cidades
          </Link>
          <Link href="/pontos-turisticos" className="btn border border-[#E5DCC9] px-5 py-2 rounded-md font-semibold hover:bg-white/10">
            Pontos turísticos
          </Link>
        </div>
      </div>
    </section>
  );
}
