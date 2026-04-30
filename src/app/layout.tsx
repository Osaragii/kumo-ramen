import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kumo Ramen — 雲ラーメン | Bandra West, Mumbai',
  description: 'Authentic Japanese ramen bar in Bandra West, Mumbai. Open until 2AM. Tonkotsu, Shoyu, Miso broths. Reserve your table.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}