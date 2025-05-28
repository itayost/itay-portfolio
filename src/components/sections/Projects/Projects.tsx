"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";
import ProjectGrid from "./ProjectGrid";
import ProjectDetailModal from "./ProjectDetailModal";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { fadeInUp } from "@/lib/utils/animations";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-wrapper">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <ProjectsHeader />
        <ProjectsIntro />
        <ProjectGrid 
          projects={projects} 
          onProjectSelect={setSelectedProject} 
        />
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            allProjects={projects}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Projects Header Component
function ProjectsHeader() {
  return (
    <h1 className="flex items-center gap-2 text-4xl font-bold mb-2">
      <FaProjectDiagram className="text-blue-600 dark:text-blue-400" /> 
      Projects
    </h1>
  );
}

// Projects Intro Component
function ProjectsIntro() {
  return (
    <p className="mb-8 text-gray-600 dark:text-gray-400">
      Here are some personal and academic projects I&apos;ve worked on.
    </p>
  );
}