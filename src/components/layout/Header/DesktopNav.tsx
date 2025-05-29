// src/components/layout/Header/DesktopNav.tsx - Fixed & Theme-Aligned Version

"use client";

import { useState, useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { NAV_ITEMS, SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { DesktopNavProps } from "./Header.types";
import { cn } from "@/lib/utils/cn";

export default function DesktopNav({ activeSection }: DesktopNavProps) {
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const projectsMenuRef = useOutsideClick<HTMLDivElement>(() => {
    setShowProjectsSubmenu(false);
  });

  // Update indicator position when active section changes
  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width
        });
      }
    }
  }, [activeSection]);

  return (
    <nav className="hidden lg:flex items-center">
      {/* Navigation pill background */}
      <div 
        ref={navRef}
        className={cn(
          "relative flex items-center gap-1 p-1 rounded-full",
          "backdrop-blur-md",
          "shadow-inner"
        )}
        style={{
          backgroundColor: 'color-mix(in oklch, var(--muted) 10%, transparent)',
          boxShadow: 'inset 0 2px 4px color-mix(in oklch, var(--foreground) 5%, transparent)'
        }}
      >
        {/* Active indicator */}
        {activeSection && (
          <motion.div
            className="absolute h-[calc(100%-8px)] top-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              opacity: 0.15,
            }}
            animate={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}
        
        {NAV_ITEMS.map((item, index) => (
          <div 
            key={item.id} 
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="relative"
          >
            {item.subItems ? (
              <div ref={item.id === "projects" ? projectsMenuRef : null}>
                <button
                  onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full flex items-center gap-1.5",
                    "font-medium text-sm transition-all duration-300",
                    activeSection === item.id && "text-current"
                  )}
                  style={{
                    color: activeSection === item.id ? 'var(--foreground)' : 'var(--muted)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = 'var(--foreground)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = 'var(--muted)';
                    }
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <FaChevronDown 
                    size={10} 
                    className={cn(
                      "relative z-10 transform transition-transform duration-300",
                      showProjectsSubmenu && "rotate-180"
                    )}
                  />
                </button>
                
                <AnimatePresence>
                  {showProjectsSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-3 px-2 rounded-2xl shadow-xl min-w-[200px] z-50"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px color-mix(in oklch, var(--foreground) 10%, transparent)'
                      }}
                    >
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                        style={{
                          backgroundColor: 'var(--card-bg)',
                          borderLeft: '1px solid var(--border)',
                          borderTop: '1px solid var(--border)',
                        }}
                      />
                      
                      <ScrollLink
                        to={item.id}
                        smooth={true}
                        duration={SCROLL_DURATION}
                        offset={SCROLL_OFFSET}
                        onClick={() => setShowProjectsSubmenu(false)}
                        className={cn(
                          "block px-4 py-2.5 rounded-lg text-sm cursor-pointer",
                          "transition-all duration-200"
                        )}
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--foreground)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 10%, transparent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div className="font-medium mb-0.5">All Projects</div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>
                          View complete portfolio
                        </div>
                      </ScrollLink>
                      
                      <div className="my-2 mx-4 h-px" style={{ backgroundColor: 'var(--border)' }} />
                      
                      {item.subItems.map(subItem => (
                        <ScrollLink
                          key={subItem.id}
                          to={subItem.id}
                          smooth={true}
                          duration={SCROLL_DURATION}
                          offset={SCROLL_OFFSET}
                          onClick={() => setShowProjectsSubmenu(false)}
                          className={cn(
                            "block px-4 py-2.5 rounded-lg text-sm cursor-pointer",
                            "transition-all duration-200",
                            "group"
                          )}
                          style={{
                            backgroundColor: 'transparent',
                            color: 'var(--foreground)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 10%, transparent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform"
                              style={{ backgroundColor: 'var(--primary)' }}
                            />
                            {subItem.label}
                          </span>
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
                  "relative px-5 py-2.5 rounded-full inline-block",
                  "font-medium text-sm transition-all duration-300 cursor-pointer"
                )}
                style={{
                  color: activeSection === item.id ? 'var(--foreground)' : 'var(--muted)'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--foreground)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.color = 'var(--muted)';
                  }
                }}
              >
                <span className="relative z-10">{item.label}</span>
              </ScrollLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}