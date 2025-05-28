"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";
import { staggerContainer, staggerItem } from "@/lib/utils/animations";

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export default function ProjectGrid({ projects, onProjectSelect }: ProjectGridProps) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={staggerItem}>
          <ProjectCard 
            project={project} 
            onViewDetails={onProjectSelect} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}