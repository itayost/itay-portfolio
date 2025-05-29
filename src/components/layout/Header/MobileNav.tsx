// src/components/layout/Header/MobileNav.tsx - Theme-Aligned Version

"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown, FaHome, FaUser, FaGraduationCap, FaProjectDiagram, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_ITEMS, SCROLL_OFFSET, SCROLL_DURATION } from "@/lib/constants/navigation";
import { MobileNavProps } from "./Header.types";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

// Icon mapping for nav items
const iconMap = {
  about: FaUser,
  resume: FaGraduationCap,
  projects: FaProjectDiagram,
  contact: FaEnvelope,
};

export default function MobileNav({ isOpen, onClose, activeSection }: MobileNavProps) {
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: 'color-mix(in oklch, var(--foreground) 60%, transparent)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
          />
          
          {/* Side Panel */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-50 overflow-y-auto"
            style={{
              backgroundColor: 'var(--background)',
              boxShadow: '-20px 0 40px color-mix(in oklch, var(--foreground) 20%, transparent)',
            }}
          >
            {/* Header */}
            <div 
              className="p-6"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))'
                  }}
                >
                  Menu
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'color-mix(in oklch, var(--muted) 20%, transparent)',
                    color: 'var(--foreground)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 30%, transparent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 20%, transparent)';
                  }}
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))'
                  }}
                >
                  {siteConfig.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                    {siteConfig.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {siteConfig.author.role}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="p-6">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = iconMap[item.id as keyof typeof iconMap] || FaHome;
                  
                  return (
                    <li key={item.id}>
                      {item.subItems ? (
                        <div>
                          <button
                            onClick={() => setShowProjectsSubmenu(!showProjectsSubmenu)}
                            className={cn(
                              "w-full flex items-center justify-between p-3 rounded-xl",
                              "transition-all duration-200"
                            )}
                            style={{
                              backgroundColor: activeSection === item.id 
                                ? 'color-mix(in oklch, var(--primary) 10%, transparent)'
                                : 'transparent',
                              color: activeSection === item.id 
                                ? 'var(--primary)'
                                : 'var(--foreground)'
                            }}
                            onMouseEnter={(e) => {
                              if (activeSection !== item.id) {
                                e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 10%, transparent)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeSection !== item.id) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="text-xl" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <FaChevronDown 
                              size={14} 
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
                                className="ml-9 mt-2 space-y-1 overflow-hidden"
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
                                  className="block p-2 pl-4 rounded-lg text-sm cursor-pointer"
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
                                    className="block p-2 pl-4 rounded-lg text-sm cursor-pointer"
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
                            "flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                            "transition-all duration-200"
                          )}
                          style={{
                            backgroundColor: activeSection === item.id 
                              ? 'color-mix(in oklch, var(--primary) 10%, transparent)'
                              : 'transparent',
                            color: activeSection === item.id 
                              ? 'var(--primary)'
                              : 'var(--foreground)'
                          }}
                          onMouseEnter={(e) => {
                            if (activeSection !== item.id) {
                              e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 10%, transparent)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSection !== item.id) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <Icon className="text-xl" />
                          <span className="font-medium">{item.label}</span>
                        </ScrollLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Social Links */}
            <div 
              className="p-6"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <h3 
                className="text-sm font-semibold mb-4"
                style={{ color: 'var(--muted)' }}
              >
                Connect
              </h3>
              <div className="flex gap-3">
                <SocialButton
                  href={siteConfig.links.linkedin}
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                />
                <SocialButton
                  href={siteConfig.links.github}
                  icon={<FaGithub />}
                  label="GitHub"
                />
                <SocialButton
                  href={siteConfig.links.email}
                  icon={<FaEnvelope />}
                  label="Email"
                />
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// Social Button Component - Theme Aligned
interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex-1 relative overflow-hidden rounded-xl p-3",
        "flex flex-col items-center gap-2",
        "group transition-all duration-300"
      )}
      style={{
        backgroundColor: 'color-mix(in oklch, var(--muted) 20%, transparent)',
        color: 'var(--muted)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--primary)';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--muted) 20%, transparent)';
        e.currentTarget.style.color = 'var(--muted)';
      }}
    >
      <span className="relative text-xl">
        {icon}
      </span>
      <span className="relative text-xs font-medium">
        {label}
      </span>
    </motion.a>
  );
}