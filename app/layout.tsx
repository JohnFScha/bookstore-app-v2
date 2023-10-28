import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Bookstore App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className='grid grid-rows[2rem, 1fr, 2rem] gap-5'>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  )
}
