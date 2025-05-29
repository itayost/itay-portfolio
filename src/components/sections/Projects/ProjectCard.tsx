"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { MotionCard } from "@/components/common/Card";
import Button from "@/components/common/Button";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <MotionCard
      variant="interactive"
      padding="none"
      className="group"
      onClick={() => onViewDetails(project)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <ProjectImage project={project} />
      <ProjectContent project={project} onViewDetails={onViewDetails} />
    </MotionCard>
  );
}

// Project Image Component
function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-[200px] overflow-hidden rounded-t-xl">
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
  );
}

// Project Content Component
function ProjectContent({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {project.shortDescription}
      </p>
      
      <TechnologyTags technologies={project.technologies} />
      
      <ProjectActions project={project} onViewDetails={onViewDetails} />
    </div>
  );
}

// Technology Tags Component
function TechnologyTags({ technologies }: { technologies: string[] }) {
  const displayTechs = technologies.slice(0, 3);
  const remainingCount = technologies.length - 3;
  
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {displayTechs.map((tech) => (
        <span 
          key={tech} 
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
        >
          {tech}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}

// Project Actions Component
function ProjectActions({ project, onViewDetails }: ProjectCardProps) {
  return (
    <div className="mt-4 flex justify-between items-center">
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(project);
        }}
        className="text-sm"
      >
        <span className="font-medium">View Details</span>
        <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
      </Button>
      
      <motion.a
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
        whileHover={{ 
          scale: 1.1,
          color: 'var(--primary)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`GitHub repository for ${project.title}`}
      >
        <FaGithub size={16} />
      </motion.a>
    </div>
  );
}