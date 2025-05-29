"use client";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        "transition-all duration-200",
        className
      )}
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        color: 'var(--foreground)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'dark' 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.05)';
      }}
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FaSun 
            className="text-xl"
            style={{ color: 'var(--accent)' }}
          />
        ) : (
          <FaMoon 
            className="text-xl"
            style={{ color: 'var(--primary)' }}
          />
        )}
      </motion.div>
    </motion.button>
  );
}