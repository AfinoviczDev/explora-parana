export default function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl overflow-hidden",                      // recorta tudo dentro do raio
        "bg-[#E5DCC9]/90 backdrop-blur-md",                 // << bege do projeto
        "ring-1 ring-black/10 border border-black/5",
        "shadow-[0_10px_30px_rgba(0,0,0,.10)]",
        "p-6 md:p-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
