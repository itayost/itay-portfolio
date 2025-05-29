"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type CardVariant = 'default' | 'hover' | 'interactive' | 'elevated' | 'outlined' | 'glass' | 'gradient';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverEffect?: 'lift' | 'grow' | 'glow' | 'tilt' | 'none';
  gradient?: 'none' | 'subtle' | 'vibrant' | 'radial';
  glass?: boolean;
  noBorder?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
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
    children,
    ...props 
  }, ref) => {
    
    // Enhanced base styles with v4 features
    const baseStyles = cn(
      "rounded-2xl transition-all duration-300",
      // v4: Starting animation
      "starting:scale-95 starting:opacity-0",
      // v4: Better transform performance
      "transform-gpu",
      // Border handling
      !noBorder && "border border-[var(--border)]",
      // Background
      !glass && "bg-[var(--card-bg)]"
    );
    
    // Enhanced variants with v4 features
    const variants = {
      default: "shadow-sm",
      hover: cn(
        "shadow-sm hover:shadow-md",
        // v4: Enhanced shadow layering
        "hover:shadow-[var(--primary)]/5"
      ),
      interactive: cn(
        "shadow-sm hover:shadow-lg cursor-pointer",
        // v4: Smooth transform with starting state
        "active:scale-[0.98]"
      ),
      elevated: cn(
        // v4: Multiple shadow layers
        "shadow-lg shadow-[var(--primary)]/5",
        "inset-shadow-sm",
        "hover:shadow-xl hover:shadow-[var(--primary)]/10"
      ),
      outlined: cn(
        "border-2",
        "shadow-none",
        "hover:border-[var(--primary)]",
        "hover:shadow-sm"
      ),
      glass: cn(
        // v4: Glassmorphism with backdrop filters
        "backdrop-blur-md",
        "bg-white/5 dark:bg-black/5",
        "border border-white/10 dark:border-white/5",
        "shadow-xl shadow-black/5",
        "hover:bg-white/10 dark:hover:bg-black/10"
      ),
      gradient: cn(
        // v4: Gradient border effect
        "relative",
        "before:absolute before:inset-0",
        "before:rounded-2xl",
        "before:p-[1px]",
        "before:bg-linear-to-r before:from-[var(--primary)] before:to-[var(--accent)]",
        "before:-z-10",
        "bg-[var(--background)]",
        "hover:before:p-[2px]"
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
      lift: "hover:-translate-y-1",
      grow: "hover:scale-[1.02]",
      glow: cn(
        "hover:shadow-lg",
        "hover:shadow-[var(--primary)]/20",
        "dark:hover:shadow-[var(--primary)]/10"
      ),
      tilt: "hover:rotate-1"
    };
    
    // v4: Gradient overlays
    const gradients = {
      none: "",
      subtle: cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-linear-to-br before:from-[var(--primary)]/5 before:to-transparent",
        "before:pointer-events-none"
      ),
      vibrant: cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-linear-to-br before:from-[var(--primary)]/20 before:to-[var(--accent)]/20",
        "before:pointer-events-none"
      ),
      radial: cn(
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-radial before:from-[var(--primary)]/10 before:to-transparent",
        "before:pointer-events-none"
      )
    };
    
    const cardClassName = cn(
      baseStyles,
      variants[variant],
      paddings[padding],
      hoverEffects[hoverEffect],
      gradients[gradient],
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
            "rounded-t-2xl"
          )}>
            {header}
          </div>
        )}
        
        {children}
        
        {footer && (
          <div className={cn(
            "border-t border-[var(--border)]",
            // Negative margin to align with card padding
            padding !== 'none' && "-mx-6 -mb-6 px-6 py-4 mt-6",
            "rounded-b-2xl"
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