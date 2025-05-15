"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaChevronUp, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCode
} from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animateIcons, setAnimateIcons] = useState(false);
  
  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Trigger icon animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIcons(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const socialLinks = [
    { 
      href: "https://www.linkedin.com/in/itayost", 
      icon: <FaLinkedin />, 
      label: "LinkedIn Profile"
    },
    { 
      href: "https://github.com/itayost", 
      icon: <FaGithub />, 
      label: "GitHub Profile"
    },
    { 
      href: "mailto:itayost1@gmail.com", 
      icon: <FaEnvelope />, 
      label: "Email Me"
    }
  ];
  
  const navLinks = [
    { id: "about", label: "About", icon: <FaMapMarkerAlt size={14} /> },
    { id: "resume", label: "Resume", icon: <FaGraduationCap size={14} /> },
    { id: "projects", label: "Projects", icon: <FaCode size={14} /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope size={14} /> }
  ];
  
  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <footer className="w-full pt-12 pb-6 mt-16" style={{ 
      background: 'var(--background)',
      color: 'var(--foreground)',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* About Column */}
          <div className="md:col-span-7">
            <div className="mb-2 inline-flex items-center">
              <div className="h-px w-10 mr-3" style={{ background: 'var(--primary)' }}></div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                Itay Ostraich
              </h3>
            </div>
            
            <p className="mb-6 max-w-lg" style={{ color: 'var(--muted)' }}>
              A passionate software engineer focused on creating intuitive, efficient, and enjoyable user experiences. Specialized in mobile, game, and web development.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  custom={i}
                  initial="hidden"
                  animate={animateIcons ? "visible" : "hidden"}
                  variants={iconVariants}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl transition-colors duration-300"
                  style={{ color: 'var(--muted)' }}
                  aria-label={link.label}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="mb-2 inline-flex items-center">
              <div className="h-px w-10 mr-3" style={{ background: 'var(--primary)' }}></div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Quick Links</h3>
            </div>
            
            <ul className="space-y-3 list-none">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <ScrollLink
                    to={link.id}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="cursor-pointer transition-colors duration-200 flex items-center group"
                    style={{ color: 'var(--muted)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <span className="mr-2 opacity-70 group-hover:opacity-100">
                      {link.icon}
                    </span>
                    <span className="capitalize border-b border-transparent" style={{ 
                      borderBottomColor: 'transparent',
                      transition: 'border-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                      {link.label}
                    </span>
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect Column */}
          <div className="md:col-span-2">
            <div className="mb-2 inline-flex items-center">
              <div className="h-px w-10 mr-3" style={{ background: 'var(--primary)' }}></div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>Connect</h3>
            </div>
            
            <div className="flex flex-col space-y-2" style={{ color: 'var(--muted)' }}>
              <p>Tel Aviv, Israel</p>
              <a 
                href="mailto:itayost1@gmail.com"
                className="transition-colors duration-200 mt-1 inline-block"
                style={{ color: 'var(--muted)' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
              >
                itayost1@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center" style={{ 
          borderTop: '1px solid var(--border)'
        }}>
          <p className="text-sm mb-4 md:mb-0 flex items-center" style={{ color: 'var(--muted)' }}>
            <span className="inline-block mr-2">
              &copy; {currentYear} Itay Ostraich
            </span>
            <span className="h-1 w-1 rounded-full inline-block mx-2" style={{ background: 'var(--muted)' }}></span>
            <span>All rights reserved</span>
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="/privacy-policy" 
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
            >
              Privacy Policy
            </a>
            
            <AnimatePresence>
              {showScrollTop && (
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
                    className="flex items-center gap-2 text-sm cursor-pointer transition group"
                    style={{ color: 'var(--muted)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <span>Back to top</span>
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="rounded-full p-1.5 transition-colors duration-200"
                      style={{ 
                        background: 'var(--border)'
                      }}
                    >
                      <FaChevronUp size={14} />
                    </motion.div>
                  </ScrollLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Credit */}
      <div className="mt-6 text-center text-xs" style={{ color: 'var(--muted)' }}>
        Made with ❤️ and Next.js
      </div>
    </footer>
  );
}