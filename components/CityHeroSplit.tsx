import Image from 'next/image'

export default function CityHeroSplit({
  name,
  description,
  banner,
  transitionName, // <- novo
}: {
  name: string
  description?: string | null
  banner?: string | null
  transitionName?: string
}) {
  return (
    <section className="relative text-white">
      <div className="container py-10 md:py-14">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="chip mb-3">Paraná</span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight">{name}</h1>
            {description && (
              <p className="mt-3 md:mt-4 text-white/90 text-base md:text-lg max-w-prose">
                {description}
              </p>
            )}
          </div>

          <div className="md:col-span-7 relative">
            <div className="absolute -inset-4 rounded-[28px] border-2 border-white/20 rotate-[-2deg]" />
            <div className="absolute -inset-1 rounded-[28px] border border-white/40 rotate-[1.2deg]" />

            <div
              className="relative rounded-[24px] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_120px_rgba(0,0,0,.45)]"
              style={{ aspectRatio: '5 / 4', ...(transitionName ? { viewTransitionName: transitionName } : {}) }}
            >
              <Image
                src={banner || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'}
                alt={name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#2B4940]/20" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
