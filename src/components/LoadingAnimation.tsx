"use client";
import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)] z-50">
      <div className="relative w-24 h-24">
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 border-t-4 border-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner circle */}
        <motion.div
          className="absolute inset-4 border-t-4 border-r-4 border-cyan-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-9 bg-blue-600 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.p
        className="absolute mt-32 text-gray-700 dark:text-gray-300 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}