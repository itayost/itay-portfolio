"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { HeaderProps } from "./Header.types";

export default function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use custom hooks
  const scrolled = useScrolled(50);
  const activeSection = useActiveSection();
  const isMobile = useIsMobile();
  
  // Keyboard shortcuts
  useKeyboard('Escape', () => {
    setIsOpen(false);
  });

  const scrollProgress = scrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) : 0;

  return (
    <header
      role="navigation"
      aria-label="Main navigation" 
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300 header-fade-in",
        // Background with backdrop blur
        "backdrop-blur-md",
        // Different styles when scrolled
        scrolled ? [
          "bg-[var(--nav-bg-solid)]",
          "shadow-md",
          "border-b border-[var(--border)]"
        ] : [
          "bg-[var(--nav-bg)]"
        ],
        // Padding
        scrolled ? "py-2" : "py-4",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / Name + Icons */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <ScrollLink
            to="about"
            smooth={true}
            duration={SCROLL_DURATION}
            offset={SCROLL_OFFSET}
            className="cursor-pointer"
            aria-label={`${siteConfig.name} - Go to home`}
          >
            <h1 className={cn(
              "font-bold text-lg md:text-xl transition-all duration-300",
              scrolled ? 'scale-90' : 'scale-100',
              "hover:text-[var(--primary)]"
            )}
            style={{ color: 'var(--foreground)' }}
            >
              {siteConfig.name}
            </h1>
          </ScrollLink>
          
          <div className="flex items-center gap-3">
            <SocialLink
              href={siteConfig.links.linkedin}
              icon={<FaLinkedin />}
              title="View LinkedIn"
              label="LinkedIn Profile"
              className={cn(
                "hover:bg-[var(--primary)]/10",
                "hover:text-[var(--primary)]"
              )}
            />
            <SocialLink
              href={siteConfig.links.github}
              icon={<FaGithub />}
              title="View GitHub"
              label="GitHub Profile"
              className={cn(
                "hover:bg-[var(--muted)]/10",
                "hover:text-[var(--foreground)]"
              )}
            />
          </div>
        </motion.div>

        {/* Desktop Navigation + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          <DesktopNav 
            activeSection={activeSection} 
            scrolled={scrolled} 
          />
          
          <ThemeToggle />

          {/* Hamburger Button - Mobile only */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "text-2xl focus:outline-none transition-all rounded-md p-1"
              )}
              style={{
                color: 'var(--nav-text)',
                backgroundColor: isOpen ? 'var(--muted)/10' : 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--nav-text-hover)';
                e.currentTarget.style.backgroundColor = 'var(--muted)/10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--nav-text)';
                e.currentTarget.style.backgroundColor = isOpen ? 'var(--muted)/10' : 'transparent';
              }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNav 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          activeSection={activeSection} 
        />
      )}
      
      {/* Progress indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        style={{ 
          backgroundColor: 'var(--primary)',
          scaleX: scrollProgress,
          opacity: scrolled ? 1 : 0
        }}
      />
    </header>
  );
}

// Social Link Component
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  label: string;
  className?: string;
}

function SocialLink({ href, icon, title, label, className }: SocialLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-xl transition-all rounded-full p-2",
        className
      )}
      style={{ 
        color: 'var(--muted)'
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        if (className?.includes('hover:text-[var(--primary)]')) {
          target.style.color = 'var(--primary)';
        } else {
          target.style.color = 'var(--foreground)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--muted)';
      }}
      title={title}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}