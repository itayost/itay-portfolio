"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedCirclesProps {
  size?: number;
  className?: string;
}

export default function AnimatedCircles({ size = 120, className = "" }: AnimatedCirclesProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path 
        d="M20,60a40,40 0 1,0 80,0a40,40 0 1,0 -80,0"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeDasharray="251"
        strokeDashoffset="251"
        fill="none"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path 
        d="M30,60a30,30 0 1,0 60,0a30,30 0 1,0 -60,0"
        stroke="var(--secondary)"
        strokeWidth="2"
        strokeDasharray="188"
        strokeDashoffset="188"
        fill="none"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.circle 
        cx="60" 
        cy="60" 
        r="20"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeDasharray="126"
        strokeDashoffset="126"
        fill="none"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1.1 }}
      />
    </svg>
  );
}