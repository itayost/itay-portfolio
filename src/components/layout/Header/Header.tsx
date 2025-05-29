// src/components/layout/Header/Header.tsx - Theme-aligned version

"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
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
  
  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to gradient coordinates
  const gradientX = useTransform(mouseX, [0, 300], [0, 100]);
  const gradientY = useTransform(mouseY, [0, 100], [0, 100]);
  
  // Handle mouse move for gradient effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  // Keyboard shortcuts
  useKeyboard('Escape', () => {
    setIsOpen(false);
  });

  const scrollProgress = scrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) : 0;

  return (
    <>
      <motion.header
        role="navigation"
        aria-label="Main navigation" 
        className={cn(
          "w-full fixed top-0 z-50 transition-all duration-500",
          className
        )}
        onMouseMove={handleMouseMove}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, var(--primary) 0%, transparent 50%)`,
            opacity: 0.1,
          }}
        />
        
        {/* Glass morphism background - using CSS variables */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled ? "shadow-lg" : ""
          )}
          style={{
            backgroundColor: scrolled 
              ? 'color-mix(in oklch, var(--background) 80%, transparent)' 
              : 'color-mix(in oklch, var(--background) 40%, transparent)',
            borderBottom: scrolled 
              ? '1px solid var(--border)' 
              : '1px solid transparent',
            boxShadow: scrolled 
              ? '0 10px 30px -10px color-mix(in oklch, var(--foreground) 10%, transparent)' 
              : 'none'
          }}
        />
        
        <div className={cn(
          "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300",
          scrolled ? "py-3" : "py-4 md:py-6"
        )}>
          <div className="flex justify-between items-center">
            {/* Logo Section with animation */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <ScrollLink
                to="about"
                smooth={true}
                duration={SCROLL_DURATION}
                offset={SCROLL_OFFSET}
                className="cursor-pointer group flex items-center gap-2"
                aria-label={`${siteConfig.name} - Go to home`}
              >
                {/* Animated logo/avatar */}
                <motion.div
                  className={cn(
                    "relative rounded-full overflow-hidden transition-all duration-300",
                    scrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"
                  )}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {siteConfig.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </motion.div>
                
                {/* Name with gradient */}
                <div className="hidden sm:block">
                  <motion.h1 
                    className={cn(
                      "font-bold transition-all duration-300",
                      scrolled ? 'text-lg' : 'text-xl md:text-2xl'
                    )}
                  >
                    <span 
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))'
                      }}
                    >
                      {siteConfig.name}
                    </span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: scrolled ? 0 : 1 }}
                    className="text-xs transition-all duration-300"
                    style={{ color: 'var(--muted)' }}
                  >
                    {siteConfig.author.role}
                  </motion.p>
                </div>
              </ScrollLink>
            </motion.div>

            {/* Center Navigation - Desktop */}
            <DesktopNav 
              activeSection={activeSection} 
              scrolled={scrolled} 
            />

            {/* Right Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 md:gap-3"
            >

              
              {/* Social Links with hover effects */}
              <div className="hidden md:flex items-center gap-2">
                <SocialLink
                  href={siteConfig.links.linkedin}
                  icon={<FaLinkedin />}
                />
                <SocialLink
                  href={siteConfig.links.github}
                  icon={<FaGithub />}
                />
              </div>
              
              <ThemeToggle />

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "relative w-10 h-10 rounded-xl flex items-center justify-center",
                    "transition-all duration-300"
                  )}
                  style={{
                    backgroundColor: 'color-mix(in oklch, var(--muted) 20%, transparent)',
                    color: 'var(--foreground)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 30%, transparent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 20%, transparent)';
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaTimes className="text-xl" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaBars className="text-xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: 'var(--border)' }}
        >
          <motion.div 
            className="h-full"
            style={{ 
              background: 'linear-gradient(to right, var(--primary), var(--secondary))',
              scaleX: scrollProgress,
              transformOrigin: '0%'
            }}
          />
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNav 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          activeSection={activeSection} 
        />
      )}

    </>
  );
}

// Social Link Component - theme aligned
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative w-9 h-9 rounded-lg flex items-center justify-center",
        "overflow-hidden group transition-all duration-300"
      )}
      style={{
        backgroundColor: 'color-mix(in oklch, var(--muted) 20%, transparent)',
        color: 'var(--muted)'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--primary)';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 20%, transparent)';
        e.currentTarget.style.color = 'var(--muted)';
      }}
    >
      <span className="relative">
        {icon}
      </span>
    </motion.a>
  );
}