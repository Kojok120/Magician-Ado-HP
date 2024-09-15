import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Noto_Serif_JP } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const notoSerifJP = Noto_Serif_JP({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Magician ADO',
  description: 'Professional magician ADO\'s official website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${notoSerifJP.className} bg-magic-blue min-h-screen`}>
        {children}
      </body>
    </html>
  )
}