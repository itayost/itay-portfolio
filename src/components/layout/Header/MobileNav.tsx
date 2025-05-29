"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { NAV_ITEMS, SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { MobileNavProps } from "./Header.types";
import { cn } from "@/lib/utils/cn";

export default function MobileNav({ isOpen, onClose, activeSection }: MobileNavProps) {
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mobile-nav overflow-hidden md:hidden"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderTop: '1px solid var(--border)'
          }}
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col items-center space-y-3 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="w-full max-w-xs">
                {item.subItems ? (
                  <div className="px-4">
                    <button
                      onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                      className="w-full text-left py-2 flex justify-between items-center transition-all"
                      style={{ color: 'var(--nav-text)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nav-text-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nav-text)'}
                      aria-expanded={showProjectsSubmenu}
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
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 space-y-2 mt-1"
                        >
                          <ScrollLink
                            to={item.id}
                            smooth={true}
                            duration={SCROLL_DURATION}
                            offset={SCROLL_OFFSET}
                            onClick={() => {
                              setShowProjectsSubmenu(false);
                              onClose();
                            }}
                            className="block py-1 text-sm cursor-pointer transition-all"
                            style={{ color: 'var(--muted)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nav-text-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
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
                              onClick={() => {
                                setShowProjectsSubmenu(false);
                                onClose();
                              }}
                              className="block py-1 text-sm cursor-pointer transition-all"
                              style={{ color: 'var(--muted)' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nav-text-hover)'}
                              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
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
                    onClick={onClose}
                    className={cn(
                      "block text-center py-2 w-full cursor-pointer transition-all rounded-md mx-4",
                      activeSection === item.id && "font-medium shadow-sm"
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
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}