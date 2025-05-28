"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/constants/skills";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="skill-name text-gray-800 dark:text-gray-200 font-medium">
          {skill.name}
        </span>
        <span className="skill-percentage text-gray-600 dark:text-gray-400 text-sm">
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-bg h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
          className="skill-bar-fill h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}