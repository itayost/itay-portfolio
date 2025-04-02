// SEO.tsx
import Head from 'next/head';
import Script from 'next/script';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

export default function SEO({
  title = "Itay Ostraich | Software Engineer",
  description = "Personal portfolio website of Itay Ostraich, a Software Engineering student specializing in mobile, game, and web development.",
  canonicalUrl = "https://www.itayost.com",
  ogImage = "/og-image.jpg",
  ogType = "website",
  keywords = "software engineer, game developer, mobile developer, web developer, portfolio, Itay Ostraich"
}: SEOProps) {
  // Structured data for Person
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

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Itay Ostraich" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
      </Head>
      
      {/* Structured data */}
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}