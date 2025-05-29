"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { MotionCard } from "@/components/common/Card";
import SocialLinks from "@/components/layout/Footer/SocialLinks";
import { siteConfig } from "@/lib/config/site";
import { staggerContainer, staggerItem } from "@/lib/utils/animations";

export type ContactInfoItem = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  link?: string | null;
};

interface ContactInfoCardProps {
  className?: string;
}

export default function ContactInfoCard({ className = "" }: ContactInfoCardProps) {
  // Contact info data
  const contactInfo: ContactInfoItem[] = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: siteConfig.author.email,
      link: siteConfig.links.email
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/itayost",
      link: siteConfig.links.linkedin
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/itayost",
      link: siteConfig.links.github
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: siteConfig.author.location,
      link: null
    }
  ];

  return (
    <MotionCard
      variant="hover"
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h3 
        variants={staggerItem}
        className="text-xl md:text-2xl font-semibold mb-6"
      >
        Contact Information
      </motion.h3>
      
      <motion.ul 
        variants={staggerContainer} 
        className="space-y-6 list-none"
      >
        {contactInfo.map((item, index) => (
          <ContactInfoItem key={index} item={item} />
        ))}
      </motion.ul>
      
      <SocialMediaSection />
    </MotionCard>
  );
}

// Contact Info Item Component
function ContactInfoItem({ item }: { item: ContactInfoItem }) {
  const Icon = item.icon;
  
  return (
    <motion.li 
      variants={staggerItem}
      className="flex items-center gap-4"
      whileHover={{ x: 5 }}
    >
      <div 
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)',
          color: 'var(--primary)'
        }}
      >
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
          {item.label}
        </p>
        {item.link ? (
          <a 
            href={item.link} 
            target={item.link.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="text-lg font-medium transition-colors no-underline hover:underline"
            style={{ color: 'var(--primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
          >
            {item.value}
          </a>
        ) : (
          <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>
            {item.value}
          </p>
        )}
      </div>
    </motion.li>
  );
}

// Social Media Section Component
function SocialMediaSection() {
  return (
    <motion.div 
      variants={staggerItem}
      className="mt-10 pt-6 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <p style={{ color: 'var(--muted)' }} className="mb-4">
        Connect with me on social media
      </p>
      <div className="flex space-x-4">
        <SocialLinks animated={false} />
      </div>
    </motion.div>
  );
}