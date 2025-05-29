"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ size = 'md', className, text = "Loading..." }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };
  
  const borderSizes = {
    sm: 'border-t-2',
    md: 'border-t-4',
    lg: 'border-t-4'
  };
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("relative", sizes[size])}>
        {/* Outer circle */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full",
            borderSizes[size],
            "border-blue-600"
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner circle */}
        <motion.div
          className={cn(
            "absolute inset-4 rounded-full",
            borderSizes[size],
            "border-r-4 border-cyan-500"
          )}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center dot for large size */}
        {size === 'lg' && (
          <motion.div
            className="absolute inset-9 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      
      {text && (
        <motion.p
          className="mt-4 text-gray-700 dark:text-gray-300 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}