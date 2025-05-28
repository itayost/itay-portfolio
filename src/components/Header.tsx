// src/components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink, Events } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  {
    id: "projects", label: "Projects", subItems: [
      { id: "personal-projects", label: "Personal Projects" },
      { id: "academic-projects", label: "Academic Projects" }
    ]
  },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);
  const projectsMenuRef = useRef<HTMLDivElement>(null);
  
  // Register scroll events to update active section
  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    
    Events.scrollEvent.register('end', (to) => {
      setActiveSection(to);
    });
    
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Check which section is in view for highlighting
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    // Check initial dark mode state
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();
    
    // Listen for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on initial load
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);
  
  // Close submenu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (projectsMenuRef.current && !projectsMenuRef.current.contains(event.target as Node)) {
        setShowProjectsSubmenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle escape key to close menus
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setShowProjectsSubmenu(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <header
      role="navigation"
      aria-label="Main navigation" 
      className={`w-full backdrop-blur-md fixed top-0 z-50 transition-all duration-300 header-fade-in
        ${isDarkMode 
          ? 'bg-black/95' 
          : 'bg-white/70'
        } 
        ${scrolled 
          ? "shadow-md py-2 scrolled" 
          : "py-4"
        }`}
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
            duration={800}
            offset={-80}
            className="cursor-pointer"
            aria-label="Itay Ostraich - Go to home"
          >
            <h1 className={`
              font-bold text-lg md:text-xl transition-all duration-300
              ${scrolled ? 'scale-90' : 'scale-100'}
              ${isDarkMode 
                ? scrolled ? 'text-gray-100' : 'text-white' 
                : scrolled ? 'text-gray-900' : 'text-gray-900'
              } hover:text-blue-600 dark:hover:text-blue-400
            `}>
              Itay Ostraich
            </h1>
          </ScrollLink>
          
          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl transition rounded-full p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30
                ${isDarkMode 
                  ? scrolled ? 'text-gray-300' : 'text-white' 
                  : scrolled ? 'text-gray-700' : 'text-gray-800'
                } hover:text-blue-700 dark:hover:text-blue-400
              `}
              title="View LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl transition rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800
                ${isDarkMode 
                  ? scrolled ? 'text-gray-300' : 'text-white' 
                  : scrolled ? 'text-gray-700' : 'text-gray-800'
                } hover:text-black dark:hover:text-white
              `}
              title="View GitHub"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative" ref={item.id === "projects" ? projectsMenuRef : null}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                      className={`
                        px-3 py-2 rounded-md flex items-center gap-1 transition-colors duration-200
                        ${activeSection === item.id 
                          ? isDarkMode 
                            ? 'text-blue-400 bg-blue-900/20' 
                            : 'text-blue-600 bg-blue-50' 
                          : isDarkMode 
                            ? scrolled ? 'text-gray-300' : 'text-white' 
                            : scrolled ? 'text-gray-700' : 'text-gray-800'
                        } hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800
                      `}
                      aria-expanded={showProjectsSubmenu}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <FaChevronDown 
                        size={12} 
                        className={`transform transition-transform ${showProjectsSubmenu ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {showProjectsSubmenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`
                            absolute top-full left-0 mt-1 py-2 rounded-md shadow-lg w-48 z-20
                            ${isDarkMode 
                              ? 'bg-gray-900 border border-gray-700' 
                              : 'bg-white border border-gray-200'
                            }
                          `}
                        >
                          <ScrollLink
                            to={item.id}
                            smooth={true}
                            duration={500}
                            offset={-80}
                            onClick={() => setShowProjectsSubmenu(false)}
                            className={`
                              block px-4 py-2 text-sm
                              ${isDarkMode 
                                ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                                : 'text-gray-700 hover:text-black hover:bg-gray-100'
                              }
                            `}
                          >
                            All Projects
                          </ScrollLink>
                          
                          {item.subItems.map(subItem => (
                            <ScrollLink
                              key={subItem.id}
                              to={subItem.id}
                              smooth={true}
                              duration={500}
                              offset={-80}
                              onClick={() => setShowProjectsSubmenu(false)}
                              className={`
                                block px-4 py-2 text-sm
                                ${isDarkMode 
                                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
                                }
                              `}
                            >
                              {subItem.label}
                            </ScrollLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <ScrollLink
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className={`
                      px-3 py-2 rounded-md inline-block transition-colors duration-200
                      ${activeSection === item.id 
                        ? isDarkMode 
                          ? 'text-blue-400 bg-blue-900/20' 
                          : 'text-blue-600 bg-blue-50' 
                        : isDarkMode 
                          ? scrolled ? 'text-gray-300' : 'text-white' 
                          : scrolled ? 'text-gray-700' : 'text-gray-800'
                      } hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800
                    `}
                  >
                    {item.label}
                  </ScrollLink>
                )}
              </div>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger Button - Mobile only */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              block md:hidden text-2xl focus:outline-none transition rounded-md p-1
              ${isDarkMode 
                ? scrolled ? 'text-gray-300' : 'text-white' 
                : scrolled ? 'text-gray-700' : 'text-gray-800'
              } hover:bg-gray-100 dark:hover:bg-gray-800
            `}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              mobile-nav md:hidden border-t overflow-hidden
              ${isDarkMode 
                ? 'bg-black border-gray-700' 
                : 'bg-white border-gray-200'
              }
            `}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col items-center space-y-3 py-4">
              {navItems.map((item) => (
                <li key={item.id} className="w-full max-w-xs">
                  {item.subItems ? (
                    <div className="px-4">
                      <button
                        onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                        className={`
                          w-full text-left py-2 flex justify-between items-center
                          ${isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-black'
                          }
                        `}
                        aria-expanded={showProjectsSubmenu}
                      >
                        {item.label}
                        <FaChevronDown 
                          size={12} 
                          className={`transform transition-transform ${showProjectsSubmenu ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {showProjectsSubmenu && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 space-y-2 mt-1"
                          >
                            <ScrollLink
                              to={item.id}
                              smooth={true}
                              duration={500}
                              offset={-80}
                              onClick={() => {
                                setShowProjectsSubmenu(false);
                                setIsOpen(false);
                              }}
                              className={`
                                block py-1 text-sm
                                ${isDarkMode 
                                  ? 'text-gray-400 hover:text-white' 
                                  : 'text-gray-600 hover:text-black'
                                }
                              `}
                            >
                              All Projects
                            </ScrollLink>
                            
                            {item.subItems.map(subItem => (
                              <ScrollLink
                                key={subItem.id}
                                to={subItem.id}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                onClick={() => {
                                  setShowProjectsSubmenu(false);
                                  setIsOpen(false);
                                }}
                                className={`
                                  block py-1 text-sm
                                  ${isDarkMode 
                                    ? 'text-gray-400 hover:text-white' 
                                    : 'text-gray-600 hover:text-black'
                                  }
                                `}
                              >
                                {subItem.label}
                              </ScrollLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <ScrollLink
                      to={item.id}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block text-center py-2 w-full
                        ${activeSection === item.id 
                          ? isDarkMode 
                            ? 'text-blue-400 bg-blue-900/20' 
                            : 'text-blue-600 bg-blue-50' 
                          : isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-black'
                        }
                      `}
                    >
                      {item.label}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      
      {/* Progress indicator */}
      <motion.div 
        className="h-0.5 bg-blue-600 dark:bg-blue-400 origin-left"
        style={{ 
          scaleX: scrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) : 0,
          opacity: scrolled ? 1 : 0
        }}
      />
    </header>
  );
}