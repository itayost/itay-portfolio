/* eslint-disable @typescript-eslint/no-explicit-any */

export function measurePerformance(metric: any): void {
  // Performance measurement logic
  if (typeof window !== 'undefined' && window.performance) {
    const entry = performance.getEntriesByName(metric.name)[0];
    if (entry) {
      console.log(`Performance metric ${metric.name}:`, entry);
    }
  }
}

export function reportWebVitals(onPerfEntry?: (metric: any) => void): void {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

export function optimizeImages(): void {
  if (typeof window !== 'undefined') {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

export function preloadCriticalAssets(): void {
  // Preload critical fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.href = '/fonts/Inter-var.woff2';
  fontPreload.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreload);
}

// Performance monitoring utilities
export const performanceUtils = {
  measurePerformance,
  reportWebVitals,
  optimizeImages,
  preloadCriticalAssets,
};
