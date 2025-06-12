import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Polyverse - Translation Made Simple",
  description: "Break down language barriers with our elegant translation platform",
  icons: {
    icon: '/favicon.ico', // Basic favicon
    apple: '/apple-touch-icon.png', // iOS icon (if you have it)
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}