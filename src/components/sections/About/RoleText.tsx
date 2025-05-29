// src/components/sections/About/RoleText.tsx - Modernized version

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoleTextProps {
  roles: string[];
  interval?: number;
}

export default function RoleText({ roles, interval = 3000 }: RoleTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [roles.length, interval]);
  
  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            filter: "blur(10px)",
            transition: {
              duration: 0.3,
              ease: "easeIn"
            }
          }}
        >
          {/* Role text with animated underline */}
          <span className="relative">
            {roles[currentIndex]}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
          </span>
        </motion.div>
      </AnimatePresence>
      
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, var(--primary), transparent)',
          filter: 'blur(40px)',
          transform: 'scale(2)',
        }}
      />
    </div>
  );
}