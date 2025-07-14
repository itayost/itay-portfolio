// src/hooks/useSEOOptimization.ts
import { useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useSEOOptimization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    // Lazy load images when in view
    if (isInView && ref.current) {
      const images = ref.current.querySelectorAll('img[data-src]');
      images.forEach((img: HTMLImageElement) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }
  }, [isInView]);

  return { ref, isInView };
}
