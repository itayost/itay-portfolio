// src/lib/seo/performance.ts
export const reportWebVitals = (metric: any) => {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      send_to: 'G-TN5KN4H0XT',
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};
