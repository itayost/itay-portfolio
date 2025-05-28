"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoryTabs from "./CategoryTabs";
import SkillBar from "./SkillBar";
import { SKILL_CATEGORIES } from "@/lib/constants/skills";

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState<string>(SKILL_CATEGORIES[0].id);
  
  const currentCategory = SKILL_CATEGORIES.find(cat => cat.id === activeCategory) || SKILL_CATEGORIES[0];
  
  return (
    <div className="my-8">
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      {/* Skills Bars */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentCategory.skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}