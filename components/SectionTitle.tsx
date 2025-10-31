type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({ title, subtitle, align = "center", className }: Props) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""} ${className || ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#23423C]">{title}</h2>
      {subtitle && (
        <p className="text-[#4A635F] mt-2 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
