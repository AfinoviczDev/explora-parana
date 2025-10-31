type Theme = "beige" | "green";

export default function SectionWrap({
  theme = "beige",
  className = "",
  children,
}: {
  theme?: Theme;
  className?: string;
  children: React.ReactNode;
}) {
  const themeClasses =
    theme === "green"
      ? "bg-[#23423C] text-[#E5DCC9]"
      : "bg-[#F4F1EA] text-[#23423C]";

  return (
    <section className={`${themeClasses} py-16 md:py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
