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
  // Transition with v4 optimizations
  "transition-all duration-200",
  // v4: Starting styles for enter animations
  "starting:scale-95 starting:opacity-0",
  // v4: Native color scheme support
  "color-scheme-light dark:color-scheme-dark",
  // Focus styles with v4 improvements
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
    // v4: Enhanced shadows with layering
    "shadow-md hover:shadow-lg",
    "inset-shadow-sm", // Subtle inset shadow for depth
    // v4: Focus with theme colors
    "focus-visible:outline-[var(--primary)]"
  ),
  
  secondary: cn(
    "bg-gray-200 dark:bg-gray-700",
    "text-gray-900 dark:text-gray-100",
    "hover:bg-gray-300 dark:hover:bg-gray-600",
    "hover:scale-102", // Subtle scale
    "active:scale-98",
    "shadow-sm hover:shadow-md",
    "focus-visible:outline-gray-500"
  ),
  
  outline: cn(
    "border-2 border-current",
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    "hover:scale-102",
    "active:scale-98",
    // v4: Dynamic border color based on text color
    "hover:border-[var(--primary)]",
    "focus-visible:outline-current"
  ),
  
  ghost: cn(
    "bg-transparent",
    "hover:bg-gray-100 dark:hover:bg-gray-800",
    "hover:scale-102",
    "active:scale-98",
    "focus-visible:outline-gray-400"
  ),
  
  danger: cn(
    // v4: Using OKLCH for vibrant reds
    "bg-red-600 text-white",
    "hover:bg-red-700 hover:scale-105",
    "active:scale-95",
    "shadow-md hover:shadow-lg",
    "inset-shadow-sm",
    "focus-visible:outline-red-600"
  ),
  
  success: cn(
    // v4: Using OKLCH for vibrant greens
    "bg-green-600 text-white",
    "hover:bg-green-700 hover:scale-105",
    "active:scale-95",
    "shadow-md hover:shadow-lg",
    "inset-shadow-sm",
    "focus-visible:outline-green-600"
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
  "after:m-auto after:size-4",
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
  // 3D transforms for special buttons
  "3d": "transform-3d perspective-1000 hover:rotate-x-6 hover:rotate-y-6",
  
  // Gradient backgrounds using v4's improved gradient API
  "gradient": "bg-linear-to-r from-[var(--primary)] to-[var(--accent)]",
  "gradient-radial": "bg-radial from-[var(--primary)] to-[var(--accent)]",
  
  // Glassmorphism effect
  "glass": cn(
    "backdrop-blur-md",
    "bg-white/10 dark:bg-black/10",
    "border border-white/20 dark:border-white/10",
    "shadow-xl"
  ),
  
  // Neon glow effect using v4 shadows
  "neon": cn(
    "shadow-[0_0_20px_var(--primary)]",
    "hover:shadow-[0_0_30px_var(--primary)]",
    "inset-shadow-sm"
  ),
  
  // Pulse animation for CTAs
  "pulse": "animate-pulse hover:animate-none",
  
  // Magnetic hover effect
  "magnetic": "hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0",
  
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