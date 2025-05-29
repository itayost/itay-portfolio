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
          className="mobile-nav border-t overflow-hidden md:hidden bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
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
                      className="w-full text-left py-2 flex justify-between items-center transition-colors text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white"
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
                            className="block py-1 text-sm cursor-pointer transition-colors text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
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
                              className="block py-1 text-sm cursor-pointer transition-colors text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
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
                      "block text-center py-2 w-full cursor-pointer transition-colors rounded-md mx-4",
                      activeSection === item.id 
                        ? "text-blue-600 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-400/20"
                        : "text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
                    )}
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