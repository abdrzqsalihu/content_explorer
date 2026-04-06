import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import './globals.css'

const font = Exo_2({
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata: Metadata = {
  title: 'Content Explorer',
  description: 'Explore products with search, filtering, and sorting',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
