// src/lib/analytics/events.ts
// Comprehensive event tracking for your portfolio

export const GA_TRACKING_ID = 'G-TN5KN4H0XT';

// Event categories
export const EventCategory = {
  USER_INTERACTION: 'User Interaction',
  NAVIGATION: 'Navigation',
  CONTACT: 'Contact',
  PROJECTS: 'Projects',
  RESUME: 'Resume',
  SOCIAL: 'Social Media',
  PERFORMANCE: 'Performance',
} as const;

// Event actions
export const EventAction = {
  CLICK: 'click',
  SCROLL: 'scroll',
  VIEW: 'view',
  DOWNLOAD: 'download',
  SUBMIT: 'submit',
  SHARE: 'share',
  HOVER: 'hover',
  PLAY: 'play',
} as const;

// Main event logging function
export const logEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_TRACKING_ID,
      ...additionalParams,
    });
  }
};

// Specific event tracking functions

// Navigation events
export const trackNavigation = (from: string, to: string) => {
  logEvent(EventAction.CLICK, EventCategory.NAVIGATION, `${from} → ${to}`);
};

// Project interactions
export const trackProjectView = (projectName: string) => {
  logEvent(EventAction.VIEW, EventCategory.PROJECTS, projectName);
};

export const trackProjectGitHub = (projectName: string) => {
  logEvent(EventAction.CLICK, EventCategory.PROJECTS, `GitHub: ${projectName}`);
};

// Resume actions
export const trackResumeDownload = () => {
  logEvent(EventAction.DOWNLOAD, EventCategory.RESUME, 'PDF Resume');
};

// Contact interactions
export const trackContactClick = (method: 'email' | 'linkedin' | 'github') => {
  logEvent(EventAction.CLICK, EventCategory.CONTACT, method);
};

// Social media
export const trackSocialClick = (platform: string, location: 'header' | 'footer' | 'contact') => {
  logEvent(EventAction.CLICK, EventCategory.SOCIAL, `${platform} - ${location}`);
};

// Scroll depth tracking
export const trackScrollDepth = (percentage: number) => {
  logEvent(EventAction.SCROLL, EventCategory.USER_INTERACTION, 'Page Scroll', percentage);
};

// Time on page tracking
export const trackTimeOnPage = (seconds: number) => {
  logEvent('timing_complete', EventCategory.PERFORMANCE, 'Time on Page', seconds);
};
