import type React from "react"
import type { Metadata } from "next"
import { Inter, Old_Standard_TT } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oldStandard = Old_Standard_TT({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-old-standard",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abdulrasheedolabanji.com"),
  title: {
    default: "Abdulrasheed Olabanji | Software Engineer & AI Builder",
    template: "%s | Abdulrasheed Olabanji",
  },
  description:
    "Software engineer and AI builder building secure, scalable digital products across web, mobile, AI, and cybersecurity spaces.",
  applicationName: "Abdulrasheed Olabanji",
  authors: [{ name: "Abdulrasheed Olabanji", url: "https://www.abdulrasheedolabanji.com" }],
  keywords: [
    "Abdulrasheed Olabanji",
    "Software Engineer",
    "AI Engineer",
    "Next.js Developer",
    "Full-Stack Developer",
    "Cybersecurity",
    "React Native",
    "Portfolio",
    "Web Development",
    "Nigeria Tech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdulrasheed Olabanji | Software Engineer & AI Builder",
    description:
      "Portfolio of Abdulrasheed Olabanji, a software engineer creating secure, scalable digital experiences with AI, web, and mobile technologies.",
    url: "https://www.abdulrasheedolabanji.com",
    siteName: "Abdulrasheed Olabanji",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Abdulrasheed Olabanji portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrasheed Olabanji | Software Engineer & AI Builder",
    description:
      "Software engineer and AI builder building secure, scalable digital products across web, mobile, AI, and cybersecurity spaces.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oldStandard.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'