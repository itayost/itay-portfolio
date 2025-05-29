// src/components/layout/Footer/SocialLinks.tsx - Modernized version

"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site";
import { staggerItem } from "@/lib/utils/animations";
import Button from "@/components/common/Button";
import { cn } from "@/lib/utils/cn";

interface SocialLinksProps {
  animated?: boolean;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Icon mapping
const iconMap = {
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
  FaEnvelope: FaEnvelope,
};

// Color mapping for each social platform
const colorMap = {
  LinkedIn: { 
    primary: '#0077b5',
    hover: '#005885' 
  },
  GitHub: { 
    primary: 'var(--foreground)',
    hover: 'var(--primary)' 
  },
  Email: { 
    primary: 'var(--primary)',
    hover: 'var(--secondary)' 
  },
};

export default function SocialLinks({ 
  animated = true, 
  className = "", 
  showLabels = false,
  size = 'md' 
}: SocialLinksProps) {
  
  const sizeMap = {
    sm: { icon: 16, button: 'sm' as const },
    md: { icon: 20, button: 'md' as const },
    lg: { icon: 24, button: 'lg' as const },
  };
  
  return (
    <div className={cn(
      "flex items-center",
      showLabels ? "flex-col sm:flex-row gap-3" : "gap-2",
      className
    )}>
      {siteConfig.social.map((social, i) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap];
        const colors = colorMap[social.name as keyof typeof colorMap];
        
        return (
          <motion.div
            key={social.name}
            custom={i}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
            variants={animated ? staggerItem : undefined}
          >
            {showLabels ? (
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size={sizeMap[size].button}
                  className="backdrop-blur-md"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'color-mix(in oklch, var(--card-bg) 50%, transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.background = `color-mix(in oklch, ${colors.primary} 10%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'color-mix(in oklch, var(--card-bg) 50%, transparent)';
                  }}
                >
                  <Icon 
                    size={sizeMap[size].icon} 
                    style={{ color: colors.primary }}
                    className="transition-colors"
                  />
                  <span className="ml-2">{social.name}</span>
                </Button>
              </motion.a>
            ) : (
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative rounded-lg flex items-center justify-center",
                  "transition-all duration-300 group overflow-hidden"
                )}
                style={{
                  width: `${sizeMap[size].icon * 2}px`,
                  height: `${sizeMap[size].icon * 2}px`,
                  background: 'color-mix(in oklch, var(--muted) 10%, transparent)',
                }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`${social.name} Profile`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `color-mix(in oklch, ${colors.primary} 20%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'color-mix(in oklch, var(--muted) 10%, transparent)';
                }}
              >
                {/* Background gradient effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${colors.primary}40, transparent)`,
                  }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <Icon 
                  size={sizeMap[size].icon} 
                  style={{ color: 'var(--muted)' }}
                  className="relative z-10 transition-colors duration-300 group-hover:text-white"
                />
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 px-2 py-1 rounded text-xs font-medium pointer-events-none"
                  style={{
                    background: 'var(--foreground)',
                    color: 'var(--background)',
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.name}
                  <div 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ background: 'var(--foreground)' }}
                  />
                </motion.div>
              </motion.a>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}