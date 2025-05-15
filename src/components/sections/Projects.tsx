// src/components/sections/Projects.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaProjectDiagram } from "react-icons/fa";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="flex items-center gap-2">
          <FaProjectDiagram /> Projects
        </h1>
        <p className="mb-8">
          Here are some personal and academic projects I&apos;ve worked on.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="project-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative w-full h-[200px] mb-4 overflow-hidden rounded-xl">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="project-image object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-medium">View Details</p>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{project.shortDescription}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
     <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    backgroundColor: 'var(--card-bg)' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = 'var(--foreground)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span className="font-medium text-sm">View Details</span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                </button>
                
                
                                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    backgroundColor: 'var(--card-bg)' 
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = 'var(--foreground)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <FaGithub size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
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