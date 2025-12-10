import './globals.css'
import type { ReactNode } from 'react'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'Tobiya Game Studio',
  description: 'XR/VR/AR game studio from Ethiopia — immersive experiences.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <NavBar />
        <main className="min-h-screen pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
