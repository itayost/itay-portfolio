// src/components/sections/About/About.tsx - Modernized with Tailwind CSS v4

"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown, FaCode, FaGamepad, FaMobile } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import MotionButton from "@/components/common/MotionButton";
import { siteConfig } from "@/lib/config/site";
import { SCROLL_DURATION, SCROLL_OFFSET } from "@/lib/constants/navigation";

const ROLES = ["Software Engineer", "Game Developer", "Mobile App Developer"];
const ROLE_ICONS = [FaCode, FaGamepad, FaMobile];

export default function AboutSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 300], [0, -50]);
  
  // Handle loading state for the background
  useEffect(() => {
    // For gradient background, we can set loaded immediately
    setLoaded(true);
  }, []);
  
  // Rotate through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const CurrentIcon = ROLE_ICONS[currentRoleIndex];
  
  return (
    <section
      id="about"
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden pt-20 md:pt-24"
      aria-label={`About ${siteConfig.name}`}
      role="region"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
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
        
        {/* Noise texture for depth */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 pb-20"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting with icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'color-mix(in oklch, var(--card-bg) 80%, transparent)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CurrentIcon className="text-2xl" style={{ color: 'var(--primary)' }} />
            </motion.div>
            <span className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>
              Hello, I&apos;m
            </span>
          </motion.div>
          
          {/* Name with gradient */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span 
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 5s ease infinite',
              }}
            >
              {siteConfig.name}
            </span>
          </motion.h1>
          
          {/* Animated role text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl mb-8 h-12 relative"
            style={{ color: 'var(--muted)' }}
          >
            {ROLES.map((role, index) => (
              <motion.div
                key={role}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentRoleIndex ? 1 : 0,
                  y: index === currentRoleIndex ? 0 : 20
                }}
                transition={{ duration: 0.5 }}
              >
                {role}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Description with glass card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-10 max-w-2xl mx-auto"
          >
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'color-mix(in oklch, var(--card-bg) 60%, transparent)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px color-mix(in oklch, var(--foreground) 5%, transparent)',
              }}
            >
              <p 
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--foreground)' }}
              >
                {siteConfig.author.tagline}
              </p>
            </div>
          </motion.div>
          
          {/* CTA Buttons with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ScrollLink
              to="projects"
              smooth={true}
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
            >
              <MotionButton
                variant="primary"
                size="lg"
                className="cursor-pointer group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  boxShadow: '0 4px 15px color-mix(in oklch, var(--primary) 30%, transparent)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px color-mix(in oklch, var(--primary) 40%, transparent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px color-mix(in oklch, var(--primary) 30%, transparent)';
                }}
              >
                <span className="relative z-10">View My Work</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                  }}
                />
              </MotionButton>
            </ScrollLink>
            
            <ScrollLink
              to="contact"
              smooth={true}
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
            >
              <MotionButton
                variant="outline"
                size="lg"
                className="cursor-pointer group"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  background: 'color-mix(in oklch, var(--card-bg) 50%, transparent)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'color-mix(in oklch, var(--primary) 10%, transparent)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'color-mix(in oklch, var(--card-bg) 50%, transparent)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                Contact Me
              </MotionButton>
            </ScrollLink>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none"
      >
        <ScrollLink
          to="resume"
          smooth={true}
          duration={SCROLL_DURATION}
          offset={SCROLL_OFFSET}
          className="cursor-pointer group pointer-events-auto"
        >
          <motion.div
            className="p-2 sm:p-3 rounded-full"
            style={{
              background: 'color-mix(in oklch, var(--card-bg) 80%, transparent)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
          >
            <FaChevronDown 
              size={20} 
              style={{ color: 'var(--primary)' }}
              className="group-hover:scale-110 transition-transform sm:w-6 sm:h-6"
            />
          </motion.div>
        </ScrollLink>
      </motion.div>
      
      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}