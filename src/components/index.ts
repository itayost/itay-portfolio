// Layout components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as ThemeToggle } from './layout/ThemeToggle';

// Section components
export { About, Resume, Projects, Contact } from './sections';

// Common components
export { default as Button } from './common/Button';
export { default as Card } from './common/Card';

// UI components
export { default as LoadingSpinner } from './ui/LoadingSpinner';
export { default as AnimatedCircles } from './ui/AnimatedCircles';

// Re-export types
export type { ButtonProps } from './common/Button';
export type { CardProps } from './common/Card';
export type { HeaderProps } from './layout/Header';