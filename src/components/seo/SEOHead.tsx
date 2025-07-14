/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogTitle?: string;
  url?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

export default function SEOHead({
  title = 'Itay Ostraich | Software Engineer & Developer',
  description = 'Personal portfolio website of Itay Ostraich, a Software Engineering student specializing in mobile, game, and web development.',
  ogImage = '/og-image.jpg',
  ogTitle,
  url = 'https://www.itayost.com',
  keywords = 'Software Engineer, Mobile Developer, Game Developer, Web Developer, Java, Python, C#, Unity, React',
  author = 'Itay Ostraich',
  robots = 'index, follow',
}: SEOHeadProps) {
  const pageTitle = title;
  const pageOgTitle = ogTitle || title;

  // @ts-ignore - Temporarily ignoring type issues
  const getMetaTags = (): any => {
    return {
      title: pageTitle,
      description,
      ogTitle: pageOgTitle,
      ogImage,
      url,
      keywords,
      author,
      robots,
    };
  };

  const metaTags = getMetaTags();

  // These were causing prefer-const errors
  let descriptionTag = metaTags.description;
  let ogTitleTag = metaTags.ogTitle;
  let ogImageTag = metaTags.ogImage;
  let robotsTag = metaTags.robots;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={descriptionTag} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsTag} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitleTag} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageTag} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageOgTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
}
