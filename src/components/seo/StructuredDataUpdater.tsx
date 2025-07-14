// src/components/seo/StructuredDataUpdater.tsx
'use client';

import { useEffect } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { breadcrumbSchema } from '@/lib/seo/structured-data';

export default function StructuredDataUpdater() {
  const activeSection = useActiveSection();

  useEffect(() => {
    // Update breadcrumb structured data based on active section
    const breadcrumbScript = document.getElementById('schema-BreadcrumbList');

    if (breadcrumbScript && activeSection) {
      const updatedBreadcrumb = {
        ...breadcrumbSchema,
        itemListElement: breadcrumbSchema.itemListElement.map(item => ({
          ...item,
          // Highlight current section in breadcrumb
          '@id': item.name.toLowerCase() === activeSection ? `${item.item}#current` : item['@id'],
        })),
      };

      breadcrumbScript.innerHTML = JSON.stringify(updatedBreadcrumb);
    }
  }, [activeSection]);

  return null;
}
