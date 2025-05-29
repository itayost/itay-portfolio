// src/components/common/Card/Card.tsx - Modernized for Tailwind CSS v4

"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type CardVariant = 'default' | 'hover' | 'interactive' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'glow';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverEffect?: 'lift' | 'grow' | 'glow' | 'tilt' | 'float' | 'none';
  gradient?: 'none' | 'subtle' | 'vibrant' | 'radial' | 'mesh';
  glass?: boolean;
  noBorder?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'noise';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hoverEffect = variant === 'interactive' ? 'lift' : 'none',
    gradient = 'none',
    glass = false,
    noBorder = false,
    header,
    footer,
    backgroundPattern = 'none',
    children,
    ...props 
  }, ref) => {
    
    // Enhanced base styles with v4 features
    const baseStyles = cn(
      "relative rounded-2xl transition-all duration-300",
      // v4: Starting animation
      "starting:scale-95 starting:opacity-0",
      // v4: Better transform performance
      "transform-gpu",
      // Border handling with CSS variables
      !noBorder && "border border-[var(--border)]",
      // Background with CSS variable
      !glass && "[--card-bg-color:var(--card-bg)] bg-[var(--card-bg-color)]"
    );
    
    // Enhanced variants with v4 features
    const variants = {
      default: cn(
        "shadow-sm",
        "shadow-[color-mix(in_oklch,var(--foreground)_5%,transparent)]"
      ),
      
      hover: cn(
        "shadow-sm hover:shadow-md",
        "shadow-[color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        "hover:shadow-[color-mix(in_oklch,var(--primary)_10%,transparent)]",
        "hover:border-[color-mix(in_oklch,var(--primary)_50%,transparent)]"
      ),
      
      interactive: cn(
        "shadow-sm hover:shadow-lg cursor-pointer",
        "shadow-[color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        "hover:shadow-[color-mix(in_oklch,var(--primary)_15%,transparent)]",
        "active:scale-[0.98]"
      ),
      
      elevated: cn(
        "shadow-xl",
        "shadow-[color-mix(in_oklch,var(--foreground)_10%,transparent)]",
        "hover:shadow-2xl",
        "hover:shadow-[color-mix(in_oklch,var(--primary)_15%,transparent)]"
      ),
      
      outlined: cn(
        "border-2",
        "shadow-none",
        "hover:border-[var(--primary)]",
        "hover:shadow-md",
        "hover:shadow-[color-mix(in_oklch,var(--primary)_10%,transparent)]"
      ),
      
      glass: cn(
        "backdrop-blur-md saturate-150",
        "bg-[color-mix(in_oklch,var(--card-bg)_30%,transparent)]",
        "border border-[color-mix(in_oklch,var(--border)_50%,transparent)]",
        "shadow-xl shadow-[color-mix(in_oklch,var(--foreground)_5%,transparent)]",
        "hover:bg-[color-mix(in_oklch,var(--card-bg)_40%,transparent)]",
        "hover:shadow-2xl"
      ),
      
      gradient: cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:-z-10",
        "before:bg-[image:linear-gradient(135deg,var(--primary),var(--secondary))]",
        "before:opacity-10",
        "hover:before:opacity-15",
        "after:absolute after:inset-[1px] after:rounded-[inherit] after:-z-10",
        "after:bg-[var(--background)]",
        "hover:after:bg-[color-mix(in_oklch,var(--background)_95%,transparent)]"
      ),
      
      glow: cn(
        "relative",
        "shadow-[0_0_30px_color-mix(in_oklch,var(--primary)_20%,transparent)]",
        "hover:shadow-[0_0_40px_color-mix(in_oklch,var(--primary)_30%,transparent)]",
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:conic-gradient(from_180deg_at_50%_50%,var(--primary),var(--secondary),var(--accent),var(--primary))]",
        "before:opacity-0 hover:before:opacity-10",
        "before:blur-xl before:-z-10",
        "before:transition-opacity before:duration-500"
      )
    };
    
    // Enhanced padding scale
    const paddings = {
      none: "",
      xs: "p-3",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10"
    };
    
    // v4: Advanced hover effects
    const hoverEffects = {
      none: "",
      lift: cn(
        "hover:translate-y-[-4px]",
        "hover:shadow-xl",
        "transition-transform duration-300"
      ),
      grow: cn(
        "hover:scale-[1.02]",
        "transition-transform duration-300"
      ),
      glow: cn(
        "hover:shadow-[0_0_30px_color-mix(in_oklch,var(--primary)_20%,transparent)]",
        "transition-shadow duration-300"
      ),
      tilt: cn(
        "hover:[transform:perspective(1000px)_rotateX(5deg)_rotateY(-5deg)]",
        "transition-transform duration-300"
      ),
      float: cn(
        "hover:translate-y-[-8px]",
        "hover:shadow-2xl",
        "transition-all duration-500 ease-out"
      )
    };
    
    // v4: Gradient overlays
    const gradients = {
      none: "",
      subtle: cn(
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:linear-gradient(135deg,color-mix(in_oklch,var(--primary)_5%,transparent),transparent)]",
        "before:pointer-events-none"
      ),
      vibrant: cn(
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:linear-gradient(135deg,color-mix(in_oklch,var(--primary)_20%,transparent),color-mix(in_oklch,var(--secondary)_20%,transparent))]",
        "before:pointer-events-none"
      ),
      radial: cn(
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--primary)_15%,transparent),transparent)]",
        "before:pointer-events-none"
      ),
      mesh: cn(
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:radial-gradient(at_40%_20%,color-mix(in_oklch,var(--primary)_15%,transparent)_0%,transparent_50%),radial-gradient(at_80%_0%,color-mix(in_oklch,var(--secondary)_15%,transparent)_0%,transparent_50%),radial-gradient(at_0%_50%,color-mix(in_oklch,var(--accent)_15%,transparent)_0%,transparent_50%)]",
        "before:pointer-events-none"
      )
    };
    
    // Background patterns
    const patterns = {
      none: "",
      dots: cn(
        "after:absolute after:inset-0 after:rounded-[inherit]",
        "after:opacity-10",
        "after:bg-[image:radial-gradient(circle,var(--foreground)_1px,transparent_1px)]",
        "after:bg-[size:20px_20px]",
        "after:pointer-events-none"
      ),
      grid: cn(
        "after:absolute after:inset-0 after:rounded-[inherit]",
        "after:opacity-10",
        "after:bg-[image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)]",
        "after:bg-[size:20px_20px]",
        "after:pointer-events-none"
      ),
      noise: cn(
        "after:absolute after:inset-0 after:rounded-[inherit]",
        "after:opacity-20",
        "after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]",
        "after:mix-blend-mode-overlay",
        "after:pointer-events-none"
      )
    };
    
    const cardClassName = cn(
      baseStyles,
      variants[variant],
      paddings[padding],
      hoverEffects[hoverEffect],
      gradients[gradient],
      patterns[backgroundPattern],
      glass && variants.glass,
      className
    );
    
    // Card content with optional header/footer
    const cardContent = (
      <>
        {header && (
          <div className={cn(
            "border-b border-[var(--border)]",
            // Negative margin to align with card padding
            padding !== 'none' && "-mx-6 -mt-6 px-6 py-4 mb-6",
            "rounded-t-2xl",
            // Glass effect for header
            glass && "bg-[color-mix(in_oklch,var(--card-bg)_20%,transparent)]"
          )}>
            {header}
          </div>
        )}
        
        <div className="relative z-10">
          {children}
        </div>
        
        {footer && (
          <div className={cn(
            "border-t border-[var(--border)]",
            // Negative margin to align with card padding
            padding !== 'none' && "-mx-6 -mb-6 px-6 py-4 mt-6",
            "rounded-b-2xl",
            // Glass effect for footer
            glass && "bg-[color-mix(in_oklch,var(--card-bg)_20%,transparent)]"
          )}>
            {footer}
          </div>
        )}
      </>
    );
    
    return (
      <div
        ref={ref}
        className={cardClassName}
        {...props}
      >
        {cardContent}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

// Motion Card component
export const MotionCard = motion(Card);
MotionCard.displayName = "MotionCard";

// Specialized card variants for common use cases
export const GlassCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant' | 'glass'>>(
  (props, ref) => <Card ref={ref} variant="glass" glass {...props} />
);
GlassCard.displayName = "GlassCard";

export const GradientCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="gradient" {...props} />
);
GradientCard.displayName = "GradientCard";

export const InteractiveCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="interactive" hoverEffect="lift" {...props} />
);
InteractiveCard.displayName = "InteractiveCard";

export const GlowCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="glow" hoverEffect="glow" {...props} />
);
GlowCard.displayName = "GlowCard";