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
import { useTheme } from "@/hooks/useTheme";
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
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isDarkMode = theme === 'dark';
  
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
        "w-full backdrop-blur-md fixed top-0 z-50 transition-all duration-300 header-fade-in",
        isDarkMode ? 'bg-black/95' : 'bg-white/70',
        scrolled ? "shadow-md py-2 scrolled" : "py-4",
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
              isDarkMode 
                ? scrolled ? 'text-gray-100' : 'text-white' 
                : scrolled ? 'text-gray-900' : 'text-gray-900',
              "hover:text-blue-600 dark:hover:text-blue-400"
            )}>
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
                "hover:bg-blue-100 dark:hover:bg-blue-900/30",
                "hover:text-blue-700 dark:hover:text-blue-400"
              )}
              isDarkMode={isDarkMode}
              scrolled={scrolled}
            />
            <SocialLink
              href={siteConfig.links.github}
              icon={<FaGithub />}
              title="View GitHub"
              label="GitHub Profile"
              className={cn(
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "hover:text-black dark:hover:text-white"
              )}
              isDarkMode={isDarkMode}
              scrolled={scrolled}
            />
          </div>
        </motion.div>

        {/* Desktop Navigation + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          <DesktopNav 
            activeSection={activeSection} 
            isDarkMode={isDarkMode} 
            scrolled={scrolled} 
          />
          
          <ThemeToggle />

          {/* Hamburger Button - Mobile only */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "text-2xl focus:outline-none transition rounded-md p-1",
                isDarkMode 
                  ? scrolled ? 'text-gray-300' : 'text-white' 
                  : scrolled ? 'text-gray-700' : 'text-gray-800',
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
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
          isDarkMode={isDarkMode} 
        />
      )}
      
      {/* Progress indicator */}
      <motion.div 
        className="h-0.5 bg-blue-600 dark:bg-blue-400 origin-left"
        style={{ 
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
  isDarkMode: boolean;
  scrolled: boolean;
}

function SocialLink({ href, icon, title, label, className, isDarkMode, scrolled }: SocialLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-xl transition rounded-full p-2",
        isDarkMode 
          ? scrolled ? 'text-gray-300' : 'text-white' 
          : scrolled ? 'text-gray-700' : 'text-gray-800',
        className
      )}
      title={title}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}