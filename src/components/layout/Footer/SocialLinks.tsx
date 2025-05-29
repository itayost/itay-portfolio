// src/components/layout/Footer/SocialLinks.tsx

"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { siteConfig } from "@/lib/config/site";
import { staggerItem } from "@/lib/utils/animations";

interface SocialLinksProps {
  animated?: boolean;
  className?: string;
}

// Icon mapping
const iconMap = {
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
  FaEnvelope: FaEnvelope,
};

export default function SocialLinks({ animated = true, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {siteConfig.social.map((social, i) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap];
        
        return (
          <motion.a
            key={social.name}
            custom={i}
            initial={animated ? "hidden" : undefined}
            animate={animated ? "visible" : undefined}
            variants={animated ? staggerItem : undefined}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl transition-colors duration-300"
            style={{ color: 'var(--muted)' }}
            aria-label={`${social.name} Profile`}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
          >
            <Icon />
          </motion.a>
        );
      })}
    </div>
  );
}