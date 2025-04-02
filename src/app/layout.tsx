import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ReactNode } from "react";

export const metadata = {
  title: "Itay Ostraich | Portfolio",
  description: "Personal portfolio website of Itay Ostraich",
  metadataBase: new URL("https://www.itayost.com"),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  openGraph: {
    title: "Itay Ostraich | Software Engineer",
    description: "Personal portfolio website showcasing my projects and skills as a software engineering student",
    url: 'https://www.itayost.com/',
    siteName: 'Itay Ostraich Portfolio',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Itay Ostraich - Software Engineering Student',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Itay Ostraich | Software Engineer",
    description: "Portfolio showcasing my software engineering projects and skills",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans">
        <SEO>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}