"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { NAV_ITEMS, SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { DesktopNavProps } from "./Header.types";
import { cn } from "@/lib/utils/cn";

export default function DesktopNav({ activeSection, isDarkMode, scrolled }: DesktopNavProps) {
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);
  
  const projectsMenuRef = useOutsideClick<HTMLDivElement>(() => {
    setShowProjectsSubmenu(false);
  });

  return (
    <nav className="hidden md:flex space-x-1">
      {NAV_ITEMS.map((item) => (
        <div key={item.id} className="relative" ref={item.id === "projects" ? projectsMenuRef : null}>
          {item.subItems ? (
            <div>
              <button
                onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                className={cn(
                  "px-3 py-2 rounded-md flex items-center gap-1 transition-colors duration-200",
                  activeSection === item.id 
                    ? isDarkMode 
                      ? 'text-blue-400 bg-blue-900/20' 
                      : 'text-blue-600 bg-blue-50'
                    : isDarkMode 
                      ? scrolled ? 'text-gray-300' : 'text-white' 
                      : scrolled ? 'text-gray-700' : 'text-gray-800',
                  "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                aria-expanded={showProjectsSubmenu}
                aria-haspopup="true"
              >
                {item.label}
                <FaChevronDown 
                  size={12} 
                  className={cn(
                    "transform transition-transform",
                    showProjectsSubmenu && "rotate-180"
                  )}
                />
              </button>
              
              <AnimatePresence>
                {showProjectsSubmenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute top-full left-0 mt-1 py-2 rounded-md shadow-lg w-48 z-20",
                      isDarkMode 
                        ? 'bg-gray-900 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    )}
                  >
                    <ScrollLink
                      to={item.id}
                      smooth={true}
                      duration={SCROLL_DURATION}
                      offset={SCROLL_OFFSET}
                      onClick={() => setShowProjectsSubmenu(false)}
                      className={cn(
                        "block px-4 py-2 text-sm cursor-pointer",
                        isDarkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-700 hover:text-black hover:bg-gray-100'
                      )}
                    >
                      All Projects
                    </ScrollLink>
                    
                    {item.subItems.map(subItem => (
                      <ScrollLink
                        key={subItem.id}
                        to={subItem.id}
                        smooth={true}
                        duration={SCROLL_DURATION}
                        offset={SCROLL_OFFSET}
                        onClick={() => setShowProjectsSubmenu(false)}
                        className={cn(
                          "block px-4 py-2 text-sm cursor-pointer",
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                            : 'text-gray-700 hover:text-black hover:bg-gray-100'
                        )}
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
              duration={SCROLL_DURATION}
              offset={SCROLL_OFFSET}
              className={cn(
                "px-3 py-2 rounded-md inline-block transition-colors duration-200 cursor-pointer",
                activeSection === item.id 
                  ? isDarkMode 
                    ? 'text-blue-400 bg-blue-900/20' 
                    : 'text-blue-600 bg-blue-50'
                  : isDarkMode 
                    ? scrolled ? 'text-gray-300' : 'text-white' 
                    : scrolled ? 'text-gray-700' : 'text-gray-800',
                "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {item.label}
            </ScrollLink>
          )}
        </div>
      ))}
    </nav>
  );
}