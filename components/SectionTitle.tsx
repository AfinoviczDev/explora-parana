'use client'

type Props = {
  eyebrow?: string // subtítulo pequeno (opcional)
  title: string
  className?: string
}

export default function SectionTitle({ eyebrow, title, className }: Props) {
  const base = 'mb-6'
  return (
    <div className={className ? `${base} ${className}` : base}>
      {eyebrow ? (
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">{eyebrow}</div>
      ) : null}

      <h2 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#E5DCC9] drop-shadow-[0_1px_8px_rgba(0,0,0,.25)]">
        {title}
      </h2>
      <div className="mt-2 h-1 w-16 rounded-full bg-[#E5DCC9]/90" />
    </div>
  )
}
