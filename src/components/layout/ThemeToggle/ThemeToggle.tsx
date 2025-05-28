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
        "text-gray-700 dark:text-gray-300",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "transition-colors",
        className
      )}
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-blue-700" />
        )}
      </motion.div>
    </motion.button>
  );
}