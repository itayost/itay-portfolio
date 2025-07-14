'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { MotionCard } from '@/components/common/Card';
import { siteConfig } from '@/lib/config/site';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';
import { cn } from '@/lib/utils/cn';

export type ContactInfoItem = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  link?: string | null;
};

interface ContactInfoCardProps {
  className?: string;
}

export default function ContactInfoCard({ className = '' }: ContactInfoCardProps) {
  // Contact info data - simplified
  const contactInfo: ContactInfoItem[] = [
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: siteConfig.author.location,
      link: null,
    },
  ];

  // Social links for icon buttons
  const socialLinks = [
    {
      icon: FaEnvelope,
      label: 'Email',
      link: siteConfig.links.email,
      color: 'var(--primary)',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      link: siteConfig.links.linkedin,
      color: '#0077b5',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      link: siteConfig.links.github,
      color: 'var(--foreground)',
    },
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
      <motion.h3 variants={staggerItem} className="text-xl md:text-2xl font-semibold mb-6">
        Contact Information
      </motion.h3>

      {/* Location info */}
      <motion.div variants={staggerItem} className="mb-8">
        {contactInfo.map((item, index) => (
          <motion.div key={index} className="flex items-center gap-4" whileHover={{ x: 5 }}>
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
                {item.label}
              </p>
              <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social icon buttons */}
      <motion.div variants={staggerItem}>
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
          Connect with me
        </p>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target={social.link.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={cn(
                'relative w-14 h-14 rounded-full flex items-center justify-center',
                'transition-all duration-300 group'
              )}
              style={{
                backgroundColor: 'color-mix(in oklch, var(--muted) 10%, transparent)',
                border: '1px solid var(--border)',
              }}
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = `color-mix(in oklch, ${social.color} 20%, transparent)`;
                e.currentTarget.style.borderColor = social.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor =
                  'color-mix(in oklch, var(--muted) 10%, transparent)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
              aria-label={social.label}
            >
              <social.icon
                size={24}
                className="transition-colors duration-300"
                style={{ color: 'var(--muted)' }}
              />

              {/* Hover tooltip */}
              <span
                className="absolute -top-10 px-2 py-1 rounded text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                style={{
                  background: 'var(--foreground)',
                  color: 'var(--background)',
                }}
              >
                {social.label}
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                  style={{ background: 'var(--foreground)' }}
                />
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </MotionCard>
  );
}
