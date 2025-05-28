import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  offset?: number;
  sections?: string[];
}

/**
 * Hook to detect which section is currently in view
 * @param options - Configuration options
 * @returns The ID of the currently active section
 */
export function useActiveSection(options: UseActiveSectionOptions = {}): string {
  const { 
    offset = 100, 
    sections = ['about', 'resume', 'projects', 'contact'] 
  } = options;
  
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, sections]);

  return activeSection;
}