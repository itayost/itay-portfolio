"use client";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/constants/skills";
import { cn } from "@/lib/utils/cn";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {SKILL_CATEGORIES.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            // v4: Using CSS variables for theming
            activeCategory === category.id
              ? [
                  "bg-[var(--primary)] text-white",
                  "shadow-md shadow-[var(--primary)]/20",
                  "inset-shadow-sm" // v4: subtle inset shadow for depth
                ]
              : [
                  "bg-[var(--card-bg)]",
                  "text-[var(--muted)]",
                  "border border-[var(--border)]",
                  "hover:text-[var(--foreground)]",
                  "hover:border-[var(--primary)]",
                  "hover:shadow-sm"
                ]
          )}
          style={{
            // v4: Ensure smooth color transitions
            transition: "background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s"
          }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}