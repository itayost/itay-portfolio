// src/lib/seo/metadata.ts

import { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = '',
}: GenerateMetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: `${siteConfig.name} Portfolio`,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.author.role}`,
        },
        {
          url: `${siteConfig.url}/og-image-square.jpg`,
          width: 600,
          height: 600,
          alt: `${siteConfig.name} - ${siteConfig.author.role}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      creator: '@itayost', // Add your Twitter handle
      images: [metaImage],
    },
    verification: {
      google: 'your-google-verification-code', // Add after Google Search Console verification
      yandex: 'your-yandex-verification-code', // Optional
      yahoo: 'your-yahoo-verification-code', // Optional
    },
    category: 'technology',
    classification: 'Portfolio',
  };
}

// Section-specific metadata
export const sectionMetadata = {
  about: {
    title: 'About',
    description: `Learn about ${siteConfig.name}, a ${siteConfig.author.role} specializing in mobile, game, and web development.`,
  },
  resume: {
    title: 'Resume & Skills',
    description: `Explore ${siteConfig.name}'s technical skills, education, and expertise in software development.`,
  },
  projects: {
    title: 'Projects & Portfolio',
    description: `View ${siteConfig.name}'s portfolio of software projects including mobile apps, games, and web applications.`,
  },
  contact: {
    title: 'Contact',
    description: `Get in touch with ${siteConfig.name} for software development opportunities and collaborations.`,
  },
};

// Additional meta tags for enhanced SEO
export const additionalMetaTags = [
  { name: 'theme-color', content: '#2563eb' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  { name: 'apple-mobile-web-app-title', content: siteConfig.name },
  { name: 'application-name', content: `${siteConfig.name} Portfolio` },
  { name: 'msapplication-TileColor', content: '#2563eb' },
  { name: 'msapplication-config', content: '/browserconfig.xml' },
  { property: 'og:latitude', content: '32.0853' }, // Ramat Gan coordinates
  { property: 'og:longitude', content: '34.8128' },
  { property: 'og:street-address', content: 'Ramat Gan' },
  { property: 'og:locality', content: 'Tel Aviv' },
  { property: 'og:region', content: 'IL' },
  { property: 'og:postal-code', content: '5200000' }, // Add your postal code
  { property: 'og:country-name', content: 'Israel' },
];

// Generate link tags
export const linkTags = [
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#2563eb' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
];

// Performance hints
export const performanceHints = {
  'X-DNS-Prefetch-Control': 'on',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
