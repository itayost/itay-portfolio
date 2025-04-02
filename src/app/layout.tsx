import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Itay Ostraich | Software Engineer & Developer",
  description: "Personal portfolio website of Itay Ostraich, a Software Engineering student specializing in mobile, game, and web development.",
  metadataBase: new URL("https://www.itayost.com"),
  keywords: "Software Engineer, Mobile Developer, Game Developer, Web Developer, Java, Python, C#, Unity, React",
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
    description: "Personal portfolio website showcasing my projects and skills as a software engineering student specializing in mobile and game development",
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
    description: "Portfolio showcasing my software engineering projects and skills in mobile, game, and web development",
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.itayost.com',
  },
};

// JSON-LD structured data for the Person schema
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Itay Ostraich",
  "url": "https://www.itayost.com",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://www.linkedin.com/in/itayost",
    "https://github.com/itayost"
  ],
  "knowsAbout": [
    "Software Engineering",
    "Game Development",
    "Mobile App Development",
    "Web Development"
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans">
        {/* Add structured data directly with Script component */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}