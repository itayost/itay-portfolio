"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function AboutSection() {
  const [loaded, setLoaded] = useState(false);
  
  // This handles a loading state for the background image
  useEffect(() => {
    const img = new Image();
    img.src = '/bg.jpg';
    img.onload = () => setLoaded(true);
  }, []);
  
  // Animated text for the role description
  const roles = ["Software Engineer", "Game Developer", "Mobile App Developer"];
  
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-fixed bg-center bg-cover bg-no-repeat flex items-center"
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
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl font-light mb-2"
          >
            Hello, I&apos;m
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text"
          >
            Itay Ostraich
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-xl md:text-2xl mb-6"
          >
            <RoleText roles={roles} />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
          >
            Software Engineering student with a passion for building clean, user-focused applications and games.
            I enjoy solving complex problems with elegant solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              offset={-80}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors cursor-pointer"
            >
              View My Work
            </ScrollLink>
            
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-80}
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-full transition-colors cursor-pointer"
            >
              Contact Me
            </ScrollLink>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10"
      >
        <ScrollLink
          to="resume"
          smooth={true}
          duration={500}
          offset={-80}
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
    </section>
  );
}

// Animated text component that cycles through different roles
function RoleText({ roles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [roles.length]);
  
  return (
    <div className="h-8 relative">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          className="absolute top-0 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          {role}
        </motion.div>
      ))}
    </div>
  );
}