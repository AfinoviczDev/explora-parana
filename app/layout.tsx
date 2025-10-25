import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import SiteBackground from '@/components/SiteBackground'
import RouteProgress from '@/components/RouteProgress'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Paraná em Foto',
  description: 'Guia turístico do Paraná',
  icons: { icon: '/favicon.ico' },
}

// Carrega Poppins para todo o site
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins', // útil se você quiser integrar ao Tailwind
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      {/* opção 1 (bem simples): aplica direto a classe global da fonte */}
      <body className={`${poppins.className} font-sans text-foreground`}>
        <SiteBackground variant="parana" />
        <Header />
        <RouteProgress />
        {children}
        <Footer />
      </body>
    </html>
  )
}
