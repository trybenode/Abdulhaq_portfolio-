import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import BrandIntro from "@/components/layout/brand-intro";
import { introBootstrap } from "@/config/intro";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Experience from "@/components/motion/experience";
import StoryMotion from "@/components/motion/story-motion";
import { site } from "@/config/site";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Abdulhaq.it — Software Engineer & IT Geek",
    template: "%s | Abdulhaq.it",
  },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title: "Abdulhaq — Engineering systems. Securing the future.",
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Abdulhaq — Software engineer and security-minded builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulhaq.it — Software Engineer & IT Geek",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = {
  themeColor: "#05070A",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          id="brand-intro-bootstrap"
          dangerouslySetInnerHTML={{ __html: introBootstrap }}
        />
      </head>
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable}`}
      >
        <BrandIntro />
        <div id="site-content">
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <Navigation />
          {children}
          <Footer />
        </div>
        <Experience />
        <StoryMotion />
      </body>
    </html>
  );
}
