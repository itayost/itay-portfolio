// src/components/seo/SEOHead.tsx

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { sectionMetadata } from '@/lib/seo/metadata';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  section?: keyof typeof sectionMetadata;
}

export default function SEOHead({
  title,
  description,
  image,
  noIndex = false,
  section,
}: SEOHeadProps) {
  const pathname = usePathname();

  // Get section-specific metadata if available
  const sectionMeta = section ? sectionMetadata[section] : null;
  const metaTitle = title || sectionMeta?.title;
  const metaDescription = description || sectionMeta?.description;

  useEffect(() => {
    // Update document title dynamically if needed
    if (metaTitle) {
      document.title = `${metaTitle} | ${siteConfig.name}`;
    }

    // Send pageview to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: metaTitle || document.title,
        page_location: window.location.href,
        page_path: pathname,
        send_to: 'G-TN5KN4H0XT',
      });
    }

    // Log Core Web Vitals
    if ('web-vital' in window) {
      // Report Core Web Vitals to analytics
      ['CLS', 'FID', 'LCP', 'FCP', 'TTFB'].forEach(metric => {
        try {
          // @ts-ignore
          window.webVitals[metric]((result: any) => {
            if (window.gtag) {
              window.gtag('event', metric, {
                value: result.value,
                metric_id: result.id,
                metric_value: result.value,
                metric_delta: result.delta,
                send_to: 'G-TN5KN4H0XT',
              });
            }
          });
        } catch (e) {
          console.error(`Error tracking ${metric}:`, e);
        }
      });
    }
  }, [pathname, metaTitle]);

  // Update meta tags dynamically
  useEffect(() => {
    // Update description
    if (metaDescription) {
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute('content', metaDescription);
      }
    }

    // Update OG tags
    if (metaTitle) {
      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) {
        ogTitleTag.setAttribute('content', `${metaTitle} | ${siteConfig.name}`);
      }
    }

    if (image) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        ogImageTag.setAttribute('content', image);
      }
    }

    // Update robots meta if needed
    if (noIndex) {
      let robotsTag = document.querySelector('meta[name="robots"]');
      if (robotsTag) {
        robotsTag.setAttribute('content', 'noindex, nofollow');
      }
    }
  }, [metaTitle, metaDescription, image, noIndex]);

  return null;
}
