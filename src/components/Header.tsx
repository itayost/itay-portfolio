"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header 
      className={`w-full backdrop-blur-md sticky top-0 z-50 transition-all duration-300 
        ${isDarkMode 
          ? 'bg-black/95' 
          : 'bg-white/70'
        } 
        ${scrolled 
          ? "shadow-md py-3" 
          : "py-4"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / Name + Icons */}
        <div className="flex items-center gap-4">
          <h1 className={`
            ${isDarkMode 
              ? 'text-gray-100' 
              : 'text-gray-900'
            }
          `}> Itay Ostraich </h1>
          
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl transition
                ${isDarkMode 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-700 hover:text-blue-700'
                }
              `}
              title="View LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl transition
                ${isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-black'
                }
              `}
              title="View GitHub"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                offset={-80}
                className={`
                  cursor-pointer no-underline transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-black'
                  }
                `}
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger Button - Mobile only */}
          <button
            className={`
              block md:hidden text-2xl focus:outline-none transition
              ${isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-700'
              }
            `}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav 
          className={`
            mobile-nav md:hidden border-t shadow-md animate-fade-in
            ${isDarkMode 
              ? 'bg-black border-gray-700' 
              : 'bg-white border-gray-200'
            }
          `}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className={`
                    cursor-pointer no-underline transition
                    ${isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-black'
                    }
                  `}
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}