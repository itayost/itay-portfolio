// src/lib/seo/structured-data.ts

import { siteConfig } from '@/lib/config/site';
import { projects } from '@/data/projects';

// Person Schema - Enhanced
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteConfig.url}#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/profile-photo.jpg`, // Add your profile photo
  jobTitle: siteConfig.author.role,
  description: siteConfig.author.tagline,
  email: siteConfig.author.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ramat Gan',
    addressRegion: 'Tel Aviv',
    addressCountry: 'IL',
  },
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  knowsAbout: [
    'Software Engineering',
    'Mobile Development',
    'Android Development',
    'Game Development',
    'Unity',
    'React',
    'Next.js',
    'Java',
    'Python',
    'C#',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Afeka College of Engineering',
    url: 'https://www.afeka.ac.il',
  },
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} Portfolio`,
  description: siteConfig.description,
  publisher: {
    '@id': `${siteConfig.url}#person`,
  },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Portfolio/CreativeWork Schema for Projects
export const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteConfig.url}#portfolio`,
  url: `${siteConfig.url}#projects`,
  name: 'Software Development Portfolio',
  description:
    'A collection of software development projects including mobile apps, games, and web applications',
  creator: {
    '@id': `${siteConfig.url}#person`,
  },
  hasPart: projects.map(project => ({
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}#${project.id}`,
    name: project.title,
    description: project.shortDescription,
    applicationCategory: getProjectCategory(project.technologies),
    operatingSystem: getOperatingSystem(project.technologies),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@id': `${siteConfig.url}#person`,
    },
    programmingLanguage: project.technologies.filter(tech =>
      ['Java', 'C#', 'JavaScript', 'Python', 'C'].includes(tech)
    ),
    softwareRequirements: project.technologies,
    codeRepository: project.githubUrl,
    url: project.liveUrl || project.githubUrl,
    screenshot: `${siteConfig.url}${project.imageUrl}`,
    featureList: project.features,
    keywords: project.technologies.join(', '),
  })),
};

// BreadcrumbList Schema
export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteConfig.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: `${siteConfig.url}#about`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Resume',
      item: `${siteConfig.url}#resume`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Projects',
      item: `${siteConfig.url}#projects`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contact',
      item: `${siteConfig.url}#contact`,
    },
  ],
};

// FAQ Schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What technologies do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I specialize in Java, Python, C#, Android development, Unity game development, and modern web technologies like React and Next.js.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you available for freelance work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, I'm open to freelance opportunities and collaborations. Feel free to contact me to discuss your project.",
      },
    },
    {
      '@type': 'Question',
      name: 'What types of projects do you work on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I work on mobile applications (Android), game development (Unity), web applications (React/Next.js), and database systems.',
      },
    },
  ],
};

// Helper functions
function getProjectCategory(technologies: string[]): string {
  if (technologies.includes('Unity')) return 'GameApplication';
  if (technologies.includes('Android SDK')) return 'MobileApplication';
  if (technologies.includes('React') || technologies.includes('Next.js')) return 'WebApplication';
  if (technologies.includes('SQL')) return 'DesktopSoftwareApplication';
  return 'SoftwareApplication';
}

function getOperatingSystem(technologies: string[]): string {
  if (technologies.includes('Android SDK')) return 'Android';
  if (technologies.includes('React') || technologies.includes('Next.js')) return 'Web browser';
  if (technologies.includes('Unity')) return 'Windows, MacOS, Linux';
  return 'Cross-platform';
}

// Combine all schemas
export const getAllSchemas = () => [
  personSchema,
  websiteSchema,
  portfolioSchema,
  breadcrumbSchema,
  faqSchema,
];
