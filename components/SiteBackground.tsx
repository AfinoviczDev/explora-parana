// components/SiteBackground.tsx
'use client'

export default function SiteBackground({
  variant = 'parana', // 'parana' | 'grid' | 'waves'
  className = '',
}: {
  variant?: 'parana' | 'grid' | 'waves'
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`site-bg site-bg--${variant} ${className}`}
    />
  )
}
