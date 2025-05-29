// src/components/layout/Footer/Footer.tsx - Modernized version

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaMapMarkerAlt, FaEnvelope, FaCode, FaHeart } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import SocialLinks from "./SocialLinks";
import { GlassCard } from "@/components/common/Card";
import MotionButton from "@/components/common/MotionButton";
import AnimatedCircles from "@/components/ui/AnimatedCircles";
import { useScrolled } from "@/hooks/useScrolled";
import { siteConfig } from "@/lib/config/site";
import { FOOTER_NAV_ITEMS, SCROLL_DURATION, SCROLL_OFFSET } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const showScrollTop = useScrolled(500);
  const [animateIcons, setAnimateIcons] = useState(false);
  
  // Trigger icon animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIcons(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <footer 
      className={cn(
        "relative w-full mt-16 overflow-hidden",
        className
      )}
      style={{ 
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%,
              color-mix(in oklch, var(--primary) 5%, transparent) 50%,
              color-mix(in oklch, var(--secondary) 5%, transparent) 100%
            )`,
          }}
        />
        
        {/* Animated orb */}
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, var(--primary), transparent)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      
      {/* Main footer content */}
      <div className="relative z-10">
        {/* Top wave border */}
        <svg 
          className="w-full h-16 md:h-24 -mb-1"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{ fill: 'var(--border)' }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
        
        <div 
          className="pt-12 pb-6"
          style={{ 
            borderTop: '1px solid var(--border)',
            background: 'color-mix(in oklch, var(--card-bg) 50%, transparent)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Main footer grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              {/* Brand section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-5"
              >
                <BrandSection animateIcons={animateIcons} />
              </motion.div>
              
              {/* Quick Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-4"
              >
                <QuickLinksSection />
              </motion.div>
              
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-3"
              >
                <ContactSection />
              </motion.div>
            </div>
            
            {/* Bottom section */}
            <BottomSection currentYear={currentYear} showScrollTop={showScrollTop} />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-12 left-12 opacity-10 pointer-events-none hidden lg:block">
        <AnimatedCircles size={100} />
      </div>
    </footer>
  );
}

// Brand Section Component
function BrandSection({ animateIcons }: { animateIcons: boolean }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        {/* Logo/Name with gradient */}
        <h3 
          className="text-2xl font-bold bg-clip-text text-transparent inline-block mb-2"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary))'
          }}
        >
          {siteConfig.name}
        </h3>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {siteConfig.author.role}
        </p>
      </motion.div>
      
      <GlassCard padding="sm" className="inline-block mb-6">
        <p className="text-sm max-w-sm" style={{ color: 'var(--foreground)' }}>
          {siteConfig.author.tagline}
        </p>
      </GlassCard>
      
      <SocialLinks animated={animateIcons} className="mt-4" />
    </div>
  );
}

// Quick Links Section Component
function QuickLinksSection() {
  return (
    <div>
      <SectionHeader title="Quick Links" icon={<FaCode />} />
      
      <nav>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
          {FOOTER_NAV_ITEMS.map((link) => {
            const Icon = link.icon;
            
            return (
              <motion.li 
                key={link.id}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ScrollLink
                  to={link.id}
                  smooth={true}
                  duration={SCROLL_DURATION}
                  offset={SCROLL_OFFSET}
                  className="cursor-pointer transition-all duration-200 flex items-center group"
                  style={{ color: 'var(--muted)' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {Icon && (
                    <span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Icon size={14} />
                    </span>
                  )}
                  <span className="capitalize relative">
                    {link.label}
                    <span 
                      className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: 'var(--primary)' }}
                    />
                  </span>
                </ScrollLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <div>
      <SectionHeader title="Get in Touch" icon={<FaEnvelope />} />
      
      <div className="space-y-4">
        <motion.div 
          className="flex items-start gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <FaMapMarkerAlt 
            className="mt-1 flex-shrink-0" 
            style={{ color: 'var(--primary)' }}
          />
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {siteConfig.author.location}
          </p>
        </motion.div>
        
        <motion.a 
          href={siteConfig.links.email}
          className="flex items-start gap-3 transition-colors duration-200"
          style={{ color: 'var(--muted)' }}
          whileHover={{ scale: 1.02 }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          <FaEnvelope 
            className="mt-1 flex-shrink-0" 
            style={{ color: 'var(--primary)' }}
          />
          <span className="text-sm break-all">{siteConfig.author.email}</span>
        </motion.a>
      </div>
    </div>
  );
}

// Section Header Component
function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <span style={{ color: 'var(--primary)' }}>{icon}</span>
      <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
      <div 
        className="h-px flex-1 ml-2"
        style={{ 
          background: 'linear-gradient(to right, var(--border), transparent)'
        }}
      />
    </div>
  );
}

// Bottom Section Component
interface BottomSectionProps {
  currentYear: number;
  showScrollTop: boolean;
}

function BottomSection({ currentYear, showScrollTop }: BottomSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" 
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <Copyright currentYear={currentYear} />
      
      <div className="flex items-center gap-6">
        <MadeWithLove />
        
        <AnimatePresence>
          {showScrollTop && <ScrollToTop />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Copyright Component
function Copyright({ currentYear }: { currentYear: number }) {
  return (
    <p className="text-sm flex items-center flex-wrap justify-center md:justify-start gap-1" style={{ color: 'var(--muted)' }}>
      <span>&copy; {currentYear}</span>
      <span className="font-medium" style={{ color: 'var(--foreground)' }}>
        {siteConfig.name}
      </span>
      <span className="hidden sm:inline">•</span>
      <span className="hidden sm:inline">All rights reserved</span>
    </p>
  );
}

// Made with Love Component
function MadeWithLove() {
  return (
    <motion.div 
      className="flex items-center gap-1 text-sm"
      style={{ color: 'var(--muted)' }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Made with 
      <motion.span
        animate={{ 
          rotate: [0, 15, -15, 0],
          scale: [1, 1.2, 1.2, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: 'var(--primary)' }}
      >
        <FaHeart />
      </motion.span>
      and Next.js
    </motion.div>
  );
}

// Scroll to Top Component
function ScrollToTop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <ScrollLink
        to="about"
        smooth={true}
        duration={800}
        className="cursor-pointer"
      >
        <MotionButton
          variant="ghost"
          size="sm"
          className="rounded-full backdrop-blur-md group"
          style={{
            background: 'color-mix(in oklch, var(--primary) 10%, transparent)',
            border: '1px solid var(--border)',
          }}
          whileHover={{ 
            scale: 1.1,
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'color-mix(in oklch, var(--primary) 20%, transparent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'color-mix(in oklch, var(--primary) 10%, transparent)';
          }}
        >
          <span className="mr-2 text-xs">Back to top</span>
          <motion.div
            animate={{ y: [-2, 0, -2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaChevronUp size={14} />
          </motion.div>
        </MotionButton>
      </ScrollLink>
    </motion.div>
  );
}