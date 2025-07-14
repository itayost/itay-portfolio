// src/app/layout.tsx - Enhanced with comprehensive SEO

import './globals.css';
import { Header, Footer } from '@/components/layout';
import { ReactNode } from 'react';
import Script from 'next/script';
import { generateMetadata, additionalMetaTags, linkTags } from '@/lib/seo/metadata';
import { getAllSchemas } from '@/lib/seo/structured-data';

// Generate metadata using the enhanced function
export const metadata = generateMetadata();

// Viewport configuration for optimal mobile experience
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schemas = getAllSchemas();

  return (
    <html lang="en" dir="ltr" prefix="og: https://ogp.me/ns#">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Additional meta tags */}
        {additionalMetaTags.map((tag, index) => (
          <meta key={index} {...tag} />
        ))}

        {/* Link tags */}
        {linkTags.map((link, index) => (
          <link key={index} {...link} />
        ))}

        {/* Structured Data */}
        {schemas.map((schema, index) => (
          <Script
            key={`schema-${index}`}
            id={`schema-${schema['@type']}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TN5KN4H0XT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TN5KN4H0XT');
          `}
        </Script>

        {/* Microsoft Clarity (optional - replace with your ID) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
          `}
        </Script>
      </head>

      <body
        className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link" aria-label="Skip to main content">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" itemProp="mainContentOfPage" role="main">
          {children}
        </main>

        <Footer />

        {/* Noscript fallback */}
        <noscript>
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              color: '#1f2937',
            }}
          >
            This website requires JavaScript for full functionality. Please enable JavaScript in
            your browser settings.
          </div>
        </noscript>
      </body>
    </html>
  );
}
