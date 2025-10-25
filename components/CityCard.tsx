import Image from 'next/image'
import TransitionLink from '@/components/TransitionLink'
import type { City } from '@/types'

export default function CityCard({ city }: { city: City }) {
  return (
    <TransitionLink href={`/cidade/${city.slug}`} className="group block">
      <div
        className="relative h-56 rounded-xl overflow-hidden"
        style={{ viewTransitionName: `city-image-${city.id}` }}
      >
        <Image
          src={city.banner_image_url || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'}
          alt={city.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="mt-3">
        <h3 className="text-white text-lg font-semibold">{city.name}</h3>
        {city.description && (
          <p className="text-white/80 text-sm line-clamp-2">{city.description}</p>
        )}
      </div>
    </TransitionLink>
  )
}
