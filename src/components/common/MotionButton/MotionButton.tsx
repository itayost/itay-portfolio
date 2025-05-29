"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Button, { ButtonProps } from "../Button";

// Create the motion-wrapped Button component
const MotionButtonPrimitive = motion(Button);

// Animation presets for common use cases
export const buttonAnimations = {
  scale: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  lift: {
    whileHover: { y: -4 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  glow: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0)",
        "0 0 20px 10px rgba(59, 130, 246, 0.3)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  pulse: {
    animate: {
      scale: [1, 1.05, 1]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  shake: {
    whileHover: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  },
  
  rotate: {
    whileHover: { rotate: 360 },
    transition: { duration: 0.5 }
  },
  
  bounce: {
    whileHover: {
      y: [0, -10, 0]
    },
    transition: {
      y: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  },
  
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  
  zoom: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  
  success: {
    initial: { scale: 0 },
    animate: { 
      scale: [0, 1.2, 1],
      transition: { duration: 0.5, ease: "backOut" }
    }
  }
} as const;

// Type for animation names
export type AnimationName = keyof typeof buttonAnimations;

// Props type that combines Button props with Motion props
export type MotionButtonProps = ButtonProps & 
  HTMLMotionProps<"button"> & {
    animation?: AnimationName | AnimationName[];
  };

// Main MotionButton component
const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ animation, ...props }, ref) => {
    // If animation preset is specified, merge with props
    if (animation) {
      const animations = Array.isArray(animation) ? animation : [animation];
      const animationProps = animations.reduce((acc, name) => ({
        ...acc,
        ...buttonAnimations[name]
      }), {});
      
      return (
        <MotionButtonPrimitive
          ref={ref}
          {...animationProps}
          {...props}
        />
      );
    }
    
    // Otherwise, just pass through all props
    return <MotionButtonPrimitive ref={ref} {...props} />;
  }
);

MotionButton.displayName = "MotionButton";

export default MotionButton;

// Preset components for common use cases
export const ScaleButton = forwardRef<HTMLButtonElement, Omit<MotionButtonProps, 'animation'>>(
  (props, ref) => <MotionButton ref={ref} animation="scale" {...props} />
);
ScaleButton.displayName = "ScaleButton";

export const LiftButton = forwardRef<HTMLButtonElement, Omit<MotionButtonProps, 'animation'>>(
  (props, ref) => <MotionButton ref={ref} animation="lift" {...props} />
);
LiftButton.displayName = "LiftButton";

export const GlowButton = forwardRef<HTMLButtonElement, Omit<MotionButtonProps, 'animation'>>(
  (props, ref) => <MotionButton ref={ref} animation="glow" {...props} />
);
GlowButton.displayName = "GlowButton";

export const PulseButton = forwardRef<HTMLButtonElement, Omit<MotionButtonProps, 'animation'>>(
  (props, ref) => <MotionButton ref={ref} animation="pulse" {...props} />
);
PulseButton.displayName = "PulseButton";

// Utility component for button groups with stagger
export function ButtonGroup({ 
  children,
  stagger = 0.1,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        animate: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}