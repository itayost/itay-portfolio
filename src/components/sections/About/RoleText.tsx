"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="h-8 relative">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          className="absolute top-0 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          {role}
        </motion.div>
      ))}
    </div>
  );
}