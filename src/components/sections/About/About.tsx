// src/components/sections/About/About.tsx - Mobile-optimized version

"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FaChevronDown, FaCode, FaGamepad, FaMobile } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { GlassCard } from "@/components/common/Card";
import Button from "@/components/common/Button";
import AnimatedCircles from "@/components/ui/AnimatedCircles";
import { siteConfig } from "@/lib/config/site";
import { SCROLL_DURATION, SCROLL_OFFSET } from "@/lib/constants/navigation";
import { useIsMobile } from "@/hooks/useMediaQuery";

const ROLES = ["Software Engineer", "Game Developer", "Mobile App Developer"];
const ROLE_ICONS = [FaCode, FaGamepad, FaMobile];

export default function AboutSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Detect mobile and reduced motion preferences
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  
  // Parallax scroll effect - disabled on mobile for performance
  const { scrollY } = useScroll();
  const backgroundY = useTransform(
    scrollY, 
    [0, 500], 
    isMobile || shouldReduceMotion ? [0, 0] : [0, 150]
  );
  const contentY = useTransform(
    scrollY, 
    [0, 300], 
    isMobile || shouldReduceMotion ? [0, 0] : [0, -50]
  );
  
  // Handle loading state
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  // Rotate through roles - slower on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, isMobile ? 4000 : 3000);
    return () => clearInterval(interval);
  }, [isMobile]);
  
  const CurrentIcon = ROLE_ICONS[currentRoleIndex];
  
  return (
    <section
      id="about"
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden pt-20 md:pt-24"
      aria-label={`About ${siteConfig.name}`}
      role="region"
    >
      {/* Simplified gradient background for mobile */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {isMobile ? <SimplifiedBackground /> : <AnimatedBackground />}
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pb-20"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting Badge using GlassCard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: isMobile ? 0.3 : 0.5 }}
            className="mb-6 inline-block"
          >
            <GlassCard 
              padding="none" 
              className="!rounded-full px-5 py-2.5"
              noBorder={false}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    duration: isMobile ? 30 : 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="inline-flex"
                >
                  <CurrentIcon className="text-xl" style={{ color: 'var(--primary)' }} />
                </motion.div>
                <span className="text-base font-medium whitespace-nowrap" style={{ color: 'var(--foreground)' }}>
                  Hello, I&apos;m
                </span>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Name with gradient - simplified animation on mobile */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: isMobile ? 0.3 : 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span 
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))',
                backgroundSize: '200% 200%',
                animation: isMobile ? 'none' : 'gradient-shift 5s ease infinite',
              }}
            >
              {siteConfig.name}
            </span>
          </motion.h1>
          
          {/* Animated role text - simplified on mobile */}
          <RoleDisplay 
            roles={ROLES} 
            currentIndex={currentRoleIndex} 
            isMobile={isMobile}
          />
          
          {/* Description using GlassCard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: isMobile ? 0.3 : 0.5 }}
            className="mb-10 max-w-2xl mx-auto"
          >
            <GlassCard padding={isMobile ? "md" : "lg"}>
              <p 
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--foreground)' }}
              >
                {siteConfig.author.tagline}
              </p>
            </GlassCard>
          </motion.div>
          
          {/* CTA Buttons using our Button component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: isMobile ? 0.3 : 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ScrollLink
              to="projects"
              smooth={true}
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
            >
              <Button
                variant="primary"
                size={isMobile ? "md" : "lg"}
                className="cursor-pointer min-w-[160px] w-full sm:w-auto"
                enhancements={isMobile ? [] : ['gradient', 'magnetic']}
              >
                View My Work
              </Button>
            </ScrollLink>
            
            <ScrollLink
              to="contact"
              smooth={true}
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
            >
              <Button
                variant="outline"
                size={isMobile ? "md" : "lg"}
                className="cursor-pointer min-w-[160px] w-full sm:w-auto backdrop-blur-md"
                style={{
                  background: 'color-mix(in oklch, var(--card-bg) 50%, transparent)',
                }}
              >
                Contact Me
              </Button>
            </ScrollLink>
          </motion.div>
          
          {/* Decorative elements - hidden on mobile */}
          {!isMobile && (
            <>
              <div className="absolute -top-20 -right-20 opacity-20 hidden lg:block">
                <AnimatedCircles size={200} />
              </div>
              <div className="absolute -bottom-20 -left-20 opacity-20 hidden lg:block">
                <AnimatedCircles size={150} />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator isMobile={isMobile} />
      
      {/* CSS for gradient animation - only on desktop */}
      {!isMobile && (
        <style jsx>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      )}
    </section>
  );
}

// Simplified background for mobile
function SimplifiedBackground() {
  return (
    <>
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            color-mix(in oklch, var(--primary) 10%, transparent) 0%,
            color-mix(in oklch, var(--secondary) 10%, transparent) 100%
          )`,
        }}
      />
      
      {/* Noise texture overlay - optimized for mobile */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}

// Animated background for desktop
function AnimatedBackground() {
  return (
    <>
      {/* Primary gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            color-mix(in oklch, var(--primary) 20%, transparent) 0%,
            color-mix(in oklch, var(--secondary) 15%, transparent) 50%,
            color-mix(in oklch, var(--accent) 10%, transparent) 100%
          )`,
        }}
      />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, var(--primary), transparent)',
          filter: 'blur(80px)',
          opacity: 0.3,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, var(--secondary), transparent)',
          filter: 'blur(80px)',
          opacity: 0.3,
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}

// Optimized role display
function RoleDisplay({ roles, currentIndex, isMobile }: { 
  roles: string[], 
  currentIndex: number,
  isMobile: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: isMobile ? 0.3 : 0.5 }}
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 h-12 relative"
      style={{ color: 'var(--muted)' }}
    >
      {roles.map((role, index) => (
        <motion.div
          key={role}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20
          }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
        >
          {role}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Optimized scroll indicator
function ScrollIndicator({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: isMobile ? 1.5 : 2, duration: 0.5 }}
      className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none"
    >
      <ScrollLink
        to="resume"
        smooth={true}
        duration={SCROLL_DURATION}
        offset={SCROLL_OFFSET}
        className="pointer-events-auto"
      >
        <motion.div
          animate={isMobile ? {} : { y: [0, 8, 0] }}
          transition={{ 
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="!rounded-full backdrop-blur-md"
            style={{
              background: 'color-mix(in oklch, var(--card-bg) 80%, transparent)',
              border: '1px solid var(--border)',
            }}
          >
            <FaChevronDown size={20} style={{ color: 'var(--primary)' }} />
          </Button>
        </motion.div>
      </ScrollLink>
    </motion.div>
  );
}