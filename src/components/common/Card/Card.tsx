"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  asMotion?: boolean;
  motionProps?: MotionProps;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    children,
    asMotion = false,
    motionProps,
    ...props 
  }, ref) => {
    const baseStyles = "rounded-2xl border transition-all";
    
    const variants = {
      default: "shadow-sm",
      hover: "shadow-sm hover:shadow-md",
      interactive: "shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1"
    };
    
    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };
    
    const cardClassName = cn(
      baseStyles,
      "border-[var(--border)]",
      "bg-[var(--card-bg)]",
      variants[variant],
      paddings[padding],
      className
    );
    
    if (asMotion && motionProps) {
      return (
        <motion.div
          ref={ref}
          className={cardClassName}
          {...motionProps}
        >
          {children}
        </motion.div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardClassName}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;