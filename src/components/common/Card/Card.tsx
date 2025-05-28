"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  motionProps?: HTMLMotionProps<"div">;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    children,
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
    
    const Component = motionProps ? motion.div : 'div';
    const componentProps = motionProps ? { ...props, ...motionProps } : props;
    
    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          "border-[var(--border)]",
          "bg-[var(--card-bg)]",
          variants[variant],
          paddings[padding],
          className
        )}
        {...componentProps}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

export default Card;