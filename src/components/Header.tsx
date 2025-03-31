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
  
  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`w-full backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md py-3" 
          : "bg-white/70 dark:bg-gray-900/70 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo / Name + Icons */}
        <div className="flex items-center gap-4">
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <h1>
              Itay Ostraich
            </h1>
          </ScrollLink>
          
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 text-xl transition"
              title="View LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/itayost"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl transition"
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
                className="cursor-pointer no-underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Hamburger Button - Mobile only */}
          <button
            className="block md:hidden text-2xl text-gray-700 dark:text-gray-300 focus:outline-none transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="mobile-nav md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md animate-fade-in">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer no-underline text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
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