type Theme = "beige" | "green";

export default function ViewportSection({
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
    <section
      className={`${themeClasses} min-h-[100svh] px-6`}
      style={{ display: "grid", placeItems: "center" }}
    >
      <div className={`w-full max-w-6xl ${className}`}>{children}</div>
    </section>
  );
}
