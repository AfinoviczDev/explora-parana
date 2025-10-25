export type City = {
  id: number
  name: string
  slug: string
  description?: string | null
  state: string
  population?: number | null
  area_km2?: number | null
  lat?: number | null
  lng?: number | null
  banner_image_url?: string | null
}

export type Attraction = {
  id: number
  city_id: number
  name: string
  description?: string | null
  category?: string | null
  image_url?: string | null
  website_url?: string | null
  address?: string | null
  open_hours?: string | null
  price?: string | null
}

export type Restaurant = {
  id: number
  city_id: number
  name: string
  description?: string | null
  cuisine?: string | null
  price_range?: string | null
  image_url?: string | null
  website_url?: string | null
  address?: string | null
  phone?: string | null
  rating?: number | null
}

export type Hotel = {
  id: number
  city_id: number
  name: string
  description?: string | null
  stars?: number | null
  nightly_price?: number | null
  image_url?: string | null
  website_url?: string | null
  address?: string | null
  phone?: string | null
}
