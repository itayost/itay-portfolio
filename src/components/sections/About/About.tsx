"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import RoleText from "./RoleText";
import Button from "@/components/common/Button";
import { siteConfig } from "@/lib/config/site";
import { SCROLL_DURATION, SCROLL_OFFSET } from "@/lib/constants/navigation";

const ROLES = ["Software Engineer", "Game Developer", "Mobile App Developer"];

export default function AboutSection() {
  const [loaded, setLoaded] = useState(false);
  
  // Handle loading state for the background image
  useEffect(() => {
    const img = new Image();
    img.src = '/bg.jpg';
    img.onload = () => setLoaded(true);
  }, []);
  
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-fixed bg-center bg-cover bg-no-repeat flex items-center"
      aria-label={`About ${siteConfig.name}`}
      role="region"
      style={{ 
        backgroundImage: "url('/bg.jpg')",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center md:text-left md:max-w-2xl"
        >
          <Greeting />
          <Name />
          <RoleSection roles={ROLES} />
          <Description />
          <CTAButtons />
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}

// Greeting Component
function Greeting() {
  return (
    <motion.h2 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-xl md:text-2xl font-light mb-2"
    >
      Hello, I&apos;m
    </motion.h2>
  );
}

// Name Component
function Name() {
  return (
    <motion.h1 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text"
    >
      {siteConfig.name}
    </motion.h1>
  );
}

// Role Section Component
function RoleSection({ roles }: { roles: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="text-xl md:text-2xl mb-6"
    >
      <RoleText roles={roles} />
    </motion.div>
  );
}

// Description Component
function Description() {
  return (
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
    >
      {siteConfig.author.tagline}
    </motion.p>
  );
}

// CTA Buttons Component
function CTAButtons() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
    >
      <ScrollLink
        to="projects"
        smooth={true}
        duration={SCROLL_DURATION}
        offset={SCROLL_OFFSET}
      >
        <Button
          variant="primary"
          size="lg"
          className="cursor-pointer"
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
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
          size="lg"
          className="cursor-pointer text-white border-white hover:bg-white/10"
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
        >
          Contact Me
        </Button>
      </ScrollLink>
    </motion.div>
  );
}

// Scroll Indicator Component
function ScrollIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="absolute bottom-10 left-0 right-0 flex justify-center z-10"
    >
      <ScrollLink
        to="resume"
        smooth={true}
        duration={SCROLL_DURATION}
        offset={SCROLL_OFFSET}
        className="text-white/80 hover:text-white cursor-pointer transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaChevronDown size={24} />
        </motion.div>
      </ScrollLink>
    </motion.div>
  );
}