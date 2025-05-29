// src/components/common/Button/styles.ts - Fixed for Tailwind CSS v4

import { cn } from "@/lib/utils/cn";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonStylesProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

// Base styles with v4 enhancements
const baseStyles = cn(
  // Core styles
  "font-medium rounded-full inline-flex items-center justify-center gap-2",
  // Transition
  "transition-all duration-200",
  // v4: Starting styles for enter animations
  "starting:scale-95 starting:opacity-0",
  // Focus styles
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  // Disabled state
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  // v4: Transform styles for micro-interactions
  "transform-gpu" // GPU acceleration
);

// Enhanced variants using CSS variables and v4 features
const variants = {
  primary: cn(
    // Use theme variables for consistency
    "bg-[var(--primary)] text-white",
    "hover:bg-[var(--accent)] hover:scale-105",
    "active:scale-95",
    // Enhanced shadows
    "shadow-md hover:shadow-lg",
    "shadow-[color-mix(in_oklch,var(--primary)_25%,transparent)]",
    // Focus with theme colors
    "focus-visible:outline-[var(--primary)]"
  ),
  
  secondary: cn(
    "bg-[color-mix(in_oklch,var(--muted)_20%,transparent)]",
    "text-[var(--foreground)]",
    "hover:bg-[color-mix(in_oklch,var(--muted)_30%,transparent)]",
    "hover:scale-[1.02]", // Subtle scale
    "active:scale-[0.98]",
    "shadow-sm hover:shadow-md",
    "focus-visible:outline-[var(--muted)]"
  ),
  
  outline: cn(
    "border-2 border-[var(--primary)]",
    "bg-transparent text-[var(--primary)]",
    "hover:bg-[color-mix(in_oklch,var(--primary)_10%,transparent)]",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
    "focus-visible:outline-[var(--primary)]"
  ),
  
  ghost: cn(
    "bg-transparent text-[var(--foreground)]",
    "hover:bg-[color-mix(in_oklch,var(--muted)_10%,transparent)]",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
    "focus-visible:outline-[var(--muted)]"
  ),
  
  danger: cn(
    // Using OKLCH for vibrant reds
    "bg-[oklch(0.55_0.22_25)] text-white",
    "hover:bg-[oklch(0.50_0.24_25)] hover:scale-105",
    "active:scale-95",
    "shadow-md hover:shadow-lg",
    "focus-visible:outline-[oklch(0.55_0.22_25)]"
  ),
  
  success: cn(
    // Using OKLCH for vibrant greens
    "bg-[oklch(0.55_0.20_145)] text-white",
    "hover:bg-[oklch(0.50_0.22_145)] hover:scale-105",
    "active:scale-95",
    "shadow-md hover:shadow-lg",
    "focus-visible:outline-[oklch(0.55_0.20_145)]"
  )
};

// Enhanced sizes with v4 dynamic spacing
const sizes = {
  xs: cn(
    "px-2.5 py-1 text-xs",
    "gap-1.5" // Smaller gap for tiny buttons
  ),
  sm: cn(
    "px-3 py-1.5 text-sm",
    "gap-1.5"
  ),
  md: cn(
    "px-6 py-3 text-base",
    "gap-2"
  ),
  lg: cn(
    "px-8 py-4 text-lg",
    "gap-2.5"
  ),
  xl: cn(
    "px-10 py-5 text-xl",
    "gap-3"
  )
};

// Loading state styles
const loadingStyles = cn(
  "relative",
  "text-transparent",
  "pointer-events-none",
  // Loading spinner styles
  "after:absolute after:inset-0",
  "after:m-auto after:h-4 after:w-4",
  "after:rounded-full",
  "after:border-2 after:border-current",
  "after:border-t-transparent",
  "after:animate-spin"
);

// Main function with all enhancements
export function getButtonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className
}: ButtonStylesProps = {}) {
  return cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    loading && loadingStyles,
    disabled && "opacity-50 cursor-not-allowed",
    className
  );
}

// Additional v4-specific enhancements that can be mixed in
export const buttonEnhancements = {
  // Gradient backgrounds using CSS variables
  "gradient": cn(
    "bg-[image:linear-gradient(135deg,var(--primary),var(--secondary))]",
    "hover:bg-[image:linear-gradient(135deg,var(--secondary),var(--accent))]",
    "transition-[background-image] duration-300"
  ),
  
  "gradient-radial": cn(
    "bg-[image:radial-gradient(circle_at_center,var(--primary),var(--secondary))]",
    "hover:bg-[image:radial-gradient(circle_at_center,var(--secondary),var(--accent))]"
  ),
  
  // Glassmorphism effect
  "glass": cn(
    "backdrop-blur-md",
    "bg-[color-mix(in_oklch,var(--card-bg)_30%,transparent)]",
    "border border-[color-mix(in_oklch,var(--border)_50%,transparent)]",
    "shadow-xl"
  ),
  
  // Neon glow effect using v4 shadows
  "neon": cn(
    "shadow-[0_0_20px_var(--primary)]",
    "hover:shadow-[0_0_30px_var(--primary)]",
    "transition-shadow duration-300"
  ),
  
  // Pulse animation for CTAs
  "pulse": "animate-pulse hover:animate-none",
  
  // Magnetic hover effect
  "magnetic": "hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0",
  
  // 3D transforms
  "3d": cn(
    "[transform-style:preserve-3d]",
    "hover:[transform:perspective(1000px)_rotateX(-10deg)]",
    "transition-transform duration-300"
  ),
  
  // Split color effect
  "split": cn(
    "relative overflow-hidden",
    "before:absolute before:inset-0",
    "before:bg-[var(--accent)]",
    "before:translate-y-full hover:before:translate-y-0",
    "before:transition-transform before:duration-300"
  )
};

// Helper function to combine button with enhancements
export function getEnhancedButtonStyles({
  enhancements = [],
  ...props
}: ButtonStylesProps & { enhancements?: (keyof typeof buttonEnhancements)[] }) {
  const enhancementClasses = enhancements
    .map(key => buttonEnhancements[key])
    .filter(Boolean);
    
  return cn(
    getButtonStyles(props),
    ...enhancementClasses
  );
}