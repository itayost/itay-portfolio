"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { NAV_ITEMS, SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { DesktopNavProps } from "./Header.types";
import { cn } from "@/lib/utils/cn";

export default function DesktopNav({ activeSection }: DesktopNavProps) {
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
                  "px-3 py-2 rounded-md flex items-center gap-1 transition-all duration-200",
                  activeSection === item.id && [
                    "shadow-sm",
                    "font-medium"
                  ]
                )}
                style={{
                  color: activeSection === item.id ? 'var(--nav-active)' : 'var(--nav-text)',
                  backgroundColor: activeSection === item.id ? 'var(--nav-active-bg)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--nav-text-hover)';
                    e.currentTarget.style.backgroundColor = 'var(--muted)/10';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--nav-text)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
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
                    className="absolute top-full left-0 mt-1 py-2 rounded-md shadow-lg w-48 z-20"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <ScrollLink
                      to={item.id}
                      smooth={true}
                      duration={SCROLL_DURATION}
                      offset={SCROLL_OFFSET}
                      onClick={() => setShowProjectsSubmenu(false)}
                      className="block px-4 py-2 text-sm cursor-pointer transition-all"
                      style={{ color: 'var(--nav-text)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--nav-text-hover)';
                        e.currentTarget.style.backgroundColor = 'var(--muted)/10';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--nav-text)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
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
                        className="block px-4 py-2 text-sm cursor-pointer transition-all"
                        style={{ color: 'var(--nav-text)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'var(--nav-text-hover)';
                          e.currentTarget.style.backgroundColor = 'var(--muted)/10';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--nav-text)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
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
                "px-3 py-2 rounded-md inline-block transition-all duration-200 cursor-pointer",
                activeSection === item.id && [
                  "shadow-sm",
                  "font-medium"
                ]
              )}
              style={{
                color: activeSection === item.id ? 'var(--nav-active)' : 'var(--nav-text)',
                backgroundColor: activeSection === item.id ? 'var(--nav-active-bg)' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.color = 'var(--nav-text-hover)';
                  e.currentTarget.style.backgroundColor = 'var(--muted)/10';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.color = 'var(--nav-text)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </ScrollLink>
          )}
        </div>
      ))}
    </nav>
  );
}