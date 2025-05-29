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
        <span className="skill-name font-medium">
          {skill.name}
        </span>
        <span className="skill-percentage text-sm">
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-bg h-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
          className="skill-bar-fill h-full rounded-full"
        />
      </div>
    </motion.div>
  );
}