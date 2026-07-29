import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AnnouncementBanner } from "@/components/features/announcement-banner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "World Professors Association | WPA",
  description:
    "Uniting professors worldwide to advance excellence in education, research, innovation, and academic leadership for sustainable global development.",
  keywords: [
    "professors",
    "academia",
    "research",
    "education",
    "global network",
    "WPA",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnnouncementBanner />
        {children}
      </body>
    </html>
  )
}
