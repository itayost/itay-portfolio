"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import SocialLinks from "./SocialLinks";
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
        "w-full pt-12 pb-6 mt-16",
        className
      )}
      style={{ 
        background: 'var(--background)',
        color: 'var(--foreground)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* About Column */}
          <AboutColumn animateIcons={animateIcons} />
          
          {/* Quick Links */}
          <QuickLinksColumn />
          
          {/* Connect Column */}
          <ConnectColumn />
        </div>
        
        {/* Bottom Bar */}
        <BottomBar currentYear={currentYear} showScrollTop={showScrollTop} />
      </div>
      
      {/* Credit */}
      <FooterCredit />
    </footer>
  );
}

// About Column Component
function AboutColumn({ animateIcons }: { animateIcons: boolean }) {
  return (
    <div className="md:col-span-7">
      <SectionHeader title={siteConfig.name} />
      
      <p className="mb-6 max-w-lg" style={{ color: 'var(--muted)' }}>
        {siteConfig.author.tagline}
      </p>
      
      <SocialLinks animated={animateIcons} />
    </div>
  );
}

// Quick Links Column Component
function QuickLinksColumn() {
  return (
    <div className="md:col-span-3">
      <SectionHeader title="Quick Links" />
      
      <ul className="space-y-3 list-none">
        {FOOTER_NAV_ITEMS.map((link) => (
          <li key={link.id}>
            <FooterNavLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Connect Column Component
function ConnectColumn() {
  return (
    <div className="md:col-span-2">
      <SectionHeader title="Connect" />
      
      <div className="flex flex-col space-y-2" style={{ color: 'var(--muted)' }}>
        <p>{siteConfig.author.location}</p>
        <a 
          href={siteConfig.links.email}
          className="transition-colors duration-200 mt-1 inline-block hover-primary"
          style={{ color: 'var(--muted)' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          {siteConfig.author.email}
        </a>
      </div>
    </div>
  );
}

// Bottom Bar Component
interface BottomBarProps {
  currentYear: number;
  showScrollTop: boolean;
}

function BottomBar({ currentYear, showScrollTop }: BottomBarProps) {
  return (
    <div 
      className="pt-6 flex flex-col md:flex-row justify-between items-center" 
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <Copyright currentYear={currentYear} />
      
      <div className="flex items-center gap-6">
        <FooterLink href="/privacy-policy" text="Privacy Policy" />
        
        <AnimatePresence>
          {showScrollTop && <ScrollToTop />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Section Header Component
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2 inline-flex items-center">
      <div className="h-px w-10 mr-3" style={{ background: 'var(--primary)' }}></div>
      <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
    </div>
  );
}

// Footer Nav Link Component
function FooterNavLink({ link }: { link: typeof FOOTER_NAV_ITEMS[0] }) {
  const Icon = link.icon;
  
  return (
    <ScrollLink
      to={link.id}
      smooth={true}
      duration={SCROLL_DURATION}
      offset={SCROLL_OFFSET}
      className="cursor-pointer transition-colors duration-200 flex items-center group hover-primary"
      style={{ color: 'var(--muted)' }}
      onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
      onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
    >
      <span className="mr-2 opacity-70 group-hover:opacity-100">
        {Icon && <Icon size={14} />}
      </span>
      <span 
        className="capitalize border-b border-transparent hover-underline"
        style={{ 
          borderBottomColor: 'transparent',
          transition: 'border-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary)'}
        onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
      >
        {link.label}
      </span>
    </ScrollLink>
  );
}

// Copyright Component
function Copyright({ currentYear }: { currentYear: number }) {
  return (
    <p className="text-sm mb-4 md:mb-0 flex items-center" style={{ color: 'var(--muted)' }}>
      <span className="inline-block mr-2">
        &copy; {currentYear} {siteConfig.name}
      </span>
      <span className="h-1 w-1 rounded-full inline-block mx-2" style={{ background: 'var(--muted)' }}></span>
      <span>All rights reserved</span>
    </p>
  );
}

// Footer Link Component
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <a 
      href={href} 
      className="text-sm transition-colors duration-200 hover-primary"
      style={{ color: 'var(--muted)' }}
      onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
      onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
    >
      {text}
    </a>
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
        className="flex items-center gap-2 text-sm cursor-pointer transition group hover-primary"
        style={{ color: 'var(--muted)' }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
      >
        <span>Back to top</span>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="rounded-full p-1.5 transition-colors duration-200"
          style={{ background: 'var(--border)' }}
        >
          <FaChevronUp size={14} />
        </motion.div>
      </ScrollLink>
    </motion.div>
  );
}

// Footer Credit Component
function FooterCredit() {
  return (
    <div className="mt-6 text-center text-xs" style={{ color: 'var(--muted)' }}>
      Made with ❤️ and Next.js
    </div>
  );
}