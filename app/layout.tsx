import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bharat Rathod | Portfolio',
  description: 'Created by Bharat Rathod',
  generator: 'Bharat Rathod',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
