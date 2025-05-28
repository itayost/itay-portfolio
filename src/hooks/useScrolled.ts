import { useState, useEffect } from 'react';

/**
 * Hook to detect if the page has been scrolled past a certain threshold
 * @param threshold - The scroll position threshold (default: 50px)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrolled(threshold: number = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      setScrolled(isScrolled);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
}