"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

// Types
export type ContactInfoItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string | null;
};

type ContactInfoCardProps = {
  className?: string;
  variants?: Variants;
};

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function ContactInfoCard({ className = "", variants }: ContactInfoCardProps) {
  // Contact info data
  const contactInfo: ContactInfoItem[] = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "itayost1@gmail.com",
      link: "mailto:itayost1@gmail.com"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/itayost",
      link: "https://www.linkedin.com/in/itayost"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/itayost",
      link: "https://github.com/itayost"
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Ramat Gan, Israel",
      link: null
    }
  ];

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`project-card ${className}`}
    >
      <motion.h3 
        variants={itemVariants}
        className="text-xl md:text-2xl font-semibold mb-6"
      >
        Contact Information
      </motion.h3>
      
      <motion.ul 
        variants={variants} 
        className="space-y-6 list-none"
      >
        {contactInfo.map((item, index) => (
          <ContactInfoItem key={index} item={item} />
        ))}
      </motion.ul>
      
      <SocialMediaLinks />
    </motion.div>
  );
}

// ContactInfoItem component
function ContactInfoItem({ item }: { item: ContactInfoItem }) {
  return (
    <motion.li 
      variants={itemVariants}
      className="flex items-center gap-4"
      whileHover={{ x: 5 }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-blue-100 dark:bg-blue-900/30">
        <span className="text-xl text-blue-600 dark:text-blue-400">
          {item.icon}
        </span>
      </div>
      <div>
        <p className="text-sm mb-1 text-gray-500 dark:text-gray-400">{item.label}</p>
        {item.link ? (
          <a 
            href={item.link} 
            target={item.link.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="text-lg font-medium transition-colors no-underline hover:underline text-blue-600 dark:text-blue-400"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-lg font-medium">{item.value}</p>
        )}
      </div>
    </motion.li>
  );
}

// SocialMediaLinks component
function SocialMediaLinks() {
  return (
    <motion.div 
      variants={itemVariants}
      className="mt-10 pt-6 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <p className="text-gray-600 dark:text-gray-400 mb-4">Connect with me on social media</p>
      <div className="flex space-x-4">
        {/* LinkedIn Button - Using text colors */}
        <motion.a
          href="https://www.linkedin.com/in/itayost"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition-all"
          aria-label="Visit Itay Ostraich's LinkedIn profile"
          style={{ 
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            backgroundColor: 'var(--card-bg)' 
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -2, 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: 'var(--primary)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin className="text-lg" />
        </motion.a>
        
        {/* GitHub Button - Using text colors */}
        <motion.a
          href="https://github.com/itayost"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition-all"
          style={{ 
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            backgroundColor: 'var(--card-bg)' 
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -2, 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: 'var(--primary)'
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Visit Itay Ostraich's GitHub profile"
        >
          <FaGithub className="text-lg" />
        </motion.a>
        
        {/* Email Button - Using text colors */}
        <motion.a
          href="mailto:itayost1@gmail.com"
          className="w-10 h-10 flex items-center justify-center rounded-full border shadow-sm transition-all"
          style={{ 
            borderColor: 'var(--border)',
            color: 'var(--foreground)',
            backgroundColor: 'var(--card-bg)' 
          }}
          whileHover={{ 
            scale: 1.1, 
            y: -2, 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: 'var(--primary)'
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Send email to Itay Ostraich at itayost1@gmail.com"
        >
          <FaEnvelope className="text-lg" />
        </motion.a>
      </div>
    </motion.div>
  );
}
