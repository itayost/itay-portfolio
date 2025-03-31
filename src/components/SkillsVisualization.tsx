"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Define types for our skill data
type Skill = {
  name: string;
  level: number;
};

type SkillsData = {
  languages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
};

// Define a type for the category ID to ensure it's a valid key of SkillsData
type CategoryId = keyof SkillsData;

// Skill data structure with categories
const skillsData: SkillsData = {
  languages: [
    { name: "Java", level: 85 },
    { name: "Python", level: 80 },
    { name: "C", level: 75 },
    { name: "C#", level: 70 },
    { name: "JavaScript", level: 65 },
  ],
  frameworks: [
    { name: "Android", level: 80 },
    { name: "Unity", level: 75 },
    { name: "React", level: 60 },
    { name: "Next.js", level: 55 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Firebase", level: 75 },
    { name: "SQL", level: 70 },
    { name: "Linux", level: 65 },
  ]
};

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("languages");
  
  const categories = [
    { id: "languages" as CategoryId, label: "Languages" },
    { id: "frameworks" as CategoryId, label: "Frameworks" },
    { id: "tools" as CategoryId, label: "Tools" }
  ];
  
  return (
    <div className="my-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Skills Bars */}
      <div className="space-y-4">
        {skillsData[activeCategory].map((skill) => (
          <div key={skill.name} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="skill-name text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
              <span className="skill-percentage text-gray-600 dark:text-gray-400 text-sm">{skill.level}%</span>
            </div>
            <div className="skill-bar-bg h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="skill-bar-fill h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}